from rest_framework import serializers
from afk_backend.forum.models import Thread

class ThreadSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'