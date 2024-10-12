from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import ImageNote
from django.contrib.auth.models import User 
from datetime import datetime
from django.utils import timezone
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .forms import CustomUserCreationForm

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

def get_tokens_for_user(user):
    """Generate JWT tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    form = CustomUserCreationForm(request.data)
    if form.is_valid():
        user = form.save()
        tokens = get_tokens_for_user(user)
        return Response({
            'message': f'Account created for {user.username}',
            'tokens': tokens
        }, status=status.HTTP_201_CREATED)
    return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        tokens = get_tokens_for_user(user)
        return Response({
            'message': 'Login successful',
            'tokens': tokens
        }, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
