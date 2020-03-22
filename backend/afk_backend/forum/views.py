from django.shortcuts import render
from django.contrib.auth.models import User, Group
from afk_backend.forum.serializers import UserSerializer, GroupSerializer, ThreadSerializer, UserSerializerWithToken, VoteSerializer, CommentSerializer
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from afk_backend.forum.models import Thread, Comment
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
        serializer = ThreadSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # For up/Downvotes
    @action(detail=True, methods=['put','delete'], permission_classes=[permissions.IsAuthenticated])
    def vote(self, request, pk=None):
        thread = self.get_object()
        user = request.user

        if(request.method=='PUT'):
            if (user not in User.objects.filter(threadvote__thread=thread.id)): #checking if user has already voted
                serializer = VoteSerializer(data=request.data)
                if serializer.is_valid():
                    tvote = threadVote(thread=thread, user=user, upvote=serializer.data['upvote'])
                    tvote.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_403_FORBIDDEN)
        elif request.method == 'DELETE':
            tvote = threadVote.objects.filter(user=user, thread=thread)
            if (tvote):
                tvote.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer 
    authentication_classes=(JSONWebTokenAuthentication,)

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [permissions.AllowAny]
        elif self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAdminUser]
        return [permission() for permission in permission_classes]

    def list(self, request):
        serializer_context = {
            'request': request,
        }

        queryset = Comment.objects.all()
        thread = self.request.query_params.get('thread', None)
        if thread is not None:
            queryset = queryset.filter(thread__pk = thread)
            if len(queryset) < 1:
                return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = CommentSerializer(queryset, many=True, context = serializer_context)
        try:
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def create(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = CommentSerializer(data=request.data,context=serializer_context)
        if serializer.is_valid():
            try:
                thread = Thread.objects.get(pk=request.data["thread"])
            except:
                return Response(serializer.data,status=status.HTTP_404_NOT_FOUND)
            serializer.save(owner=self.request.user, thread=thread)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

