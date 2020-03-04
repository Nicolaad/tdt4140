from django.shortcuts import render
from django.contrib.auth.models import User, Group
from afk_backend.forum.serializers import UserSerializer, GroupSerializer, ThreadSerializer, UserSerializerWithToken
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from afk_backend.forum.models import Thread
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer_context = {
            'request': request,
        }
        serializer = UserSerializerWithToken(data=request.data,context=serializer_context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = (permissions.IsAuthenticated,)
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all().order_by('-dateCreated')
    serializer_class = ThreadSerializer
    authentication_classes=(JSONWebTokenAuthentication,)

    def create(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = ThreadSerializer(data=request.data,context=serializer_context)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

