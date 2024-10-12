from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ImageNote
from django.contrib.auth.models import User 
from datetime import datetime
from django.utils import timezone

# handle picture request
# assumes it's guaranteed that the request is POST
@api_view(['POST'])
def receive_img_post(request):
  # Access the JSON data
  data = request.data
  title = data.get('title')
  crn = data.get('crn')
  date = data.get('date')
  
  # get the image
  img = request.FILES.get('img')
  
  # TODO: (waiting for login system to be done)
  fakeuser = User.objects.create_user(
    username="user",
    password="weak"
  )
  
  # insert into db
  new_image_note = ImageNote(
    user=fakeuser,
    title=title,
    class_date_and_time=timezone.make_aware(
      datetime.strptime(date, r'%Y-%m-%dT%H:%M:%S') # e.g. 2024-10-12T19:18:46
    ),
    crn=crn,
    content_image=img
  )
  
  new_image_note.save()
  
  # Process the data and return a response
  return Response({"message": "Image note created successfully!"}, status=201)
