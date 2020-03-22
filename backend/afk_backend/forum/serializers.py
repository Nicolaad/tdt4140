from rest_framework import serializers
from afk_backend.forum.models import Thread, threadVote
from django.contrib.auth.models import User, Group
from rest_framework_jwt.settings import api_settings

class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(many=False, view_name='user-detail', read_only=True)
    ownername = serializers.ReadOnlyField(source='owner.username')
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    current_user_vote = serializers.SerializerMethodField()

    class Meta:
        model = Thread
        fields = ['url','dateCreated', 'title', 'postContent', 'owner', 'ownername', 'upvotes', 'downvotes','current_user_vote']
        read_only_fields = ['dateCreated', 'ownername']

    def get_upvotes(self, obj):
        return threadVote.objects.filter(thread=obj, upvote=True).count()

    def get_downvotes(self, obj):
        return threadVote.objects.filter(thread=obj, upvote=False).count()

    def get_current_user_vote(self, obj):
        user = None
        request = self.context.get("request")
        
        if request and hasattr(request, "user"):
            user = request.user

        if user.is_anonymous:
            return -1

        vote = threadVote.objects.filter(thread=obj, user=user)
        if not vote:
            return 0
        else:
            for v in vote:
                if v.upvote == True:
                    return 1
                else:
                    return 2


class VoteSerializer(serializers.Serializer):
    upvote = serializers.BooleanField()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

##used for handling signups
class UserSerializerWithToken(serializers.HyperlinkedModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ['url','token', 'username', 'password', 'email']


