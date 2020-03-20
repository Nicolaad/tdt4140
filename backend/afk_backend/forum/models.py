from django.db import models
from django.utils import timezone

class Thread(models.Model):
    dateCreated =  models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100)
    postContent = models.TextField()
    owner = models.ForeignKey('auth.User',on_delete=models.CASCADE)        

class threadVote(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    upvote = models.BooleanField()
