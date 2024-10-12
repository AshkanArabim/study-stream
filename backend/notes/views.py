from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from models import ImageNote
from django.contrib.auth.models import User 

# handle picture request
# assumes it's guaranteed that the request is POST
@api_view(['POST'])
def receive_img_post(request):
  # Access the JSON data
  data = request.data
  title = data.get('title')
  body = data.get('body')
  crn = data.get('CRN')
  
  # get the image
  img = request.FILES.get('attachment')
  
  # TODO: (waiting for login system to be done)
  fakeuser = User.objects.create_user(
    username="user",
    password="weak"
  )
  
  # insert into db
  new_image_note = ImageNote(
    user=fakeuser,
    crn=crn,
    content_image=img
  )
  new_image_note.save()
  
  # Process the data and return a response
  return Response({"message": "Image note created successfully!"}, status=201)
