from django.db import models
from django.contrib.auth.models import User

# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    crn = models.IntegerField()
    tally = models.IntegerField(default=0)
    class_date_and_time = models.DateTimeField()


class TextNote(Note):
    content_text = models.TextField()

    def __str__(self):
        return f"Text note by {self.user.username} on {self.class_date_and_time} with text '{self.content_text}'"


class ImageNote(Note):
    content_image = models.ImageField(upload_to="notes/images/")

    def __str__(self):
        return f"Image note by {self.user.username} on {self.class_date_and_time} with image {self.content_image}"


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    note = models.ForeignKey(Note, on_delete=models.CASCADE)
    vote_type = models.CharField(
        max_length=10, choices=[("up", "Upvote"), ("down", "Downvote")]
    )

    class Meta:
        unique_together = ("user", "note")
