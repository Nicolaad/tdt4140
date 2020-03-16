from django.db import models
from django.utils import timezone

class Thread(models.Model):
    dateCreated =  models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=100)
    postContent = models.TextField()
    owner = models.ForeignKey('auth.User',on_delete=models.CASCADE)
    upvotes = models.IntegerField(default=0)
    downvotes = models.IntegerField(default=0)
    usersVoted = models.ManyToManyField("auth.User", related_name="votes")

    def vote(self, user, upvote):
        if(upvote):
            self.upvotes = self.upvotes + 1
        else:
            self.downvotes = self.downvotes + 1
        self.usersVoted.add(user)
        self.save()
