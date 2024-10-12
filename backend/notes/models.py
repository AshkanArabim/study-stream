from django.db import models
from django.contrib.auth.models import User 
# Create your models here.

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course_number = models.CharField(max_length=255)
    tally = models.IntegerField(default=0)
    date_and_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Note by {self.user.username} on {self.date_and_time}"

class TextNote(Note):
    content_text = models.TextField()

class ImageNote(Note):
    '''
    PLEASE CHANGE THIS SO IT DOESNT CREATE FOLDER / EVENTURALLY PUSH WHEN CREATING 
    '''
    content_image = models.ImageField(upload_to='notes/images/') 
