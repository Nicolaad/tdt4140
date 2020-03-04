from rest_framework import serializers
from afk_backend.forum.models import Thread, Comment
from django.contrib.auth.models import User, Group
from rest_framework_jwt.settings import api_settings

class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(many=False, view_name='user-detail', read_only=True)
    ownername = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Thread
        fields = '__all__'

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

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.HyperlinkedRelatedField(many=False, view_name='user-detail', read_only=True)
    ownername = serializers.ReadOnlyField(source='owner.username')
    thread = serializers.HyperlinkedRelatedField(many=False, view_name='thread-detail', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'