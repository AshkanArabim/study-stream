from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import ImageNote, TextNote, Note
from django.contrib.auth.models import User
from datetime import datetime
from django.utils import timezone
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .forms import CustomUserCreationForm
from django.http import JsonResponse
from rest_framework_simplejwt.exceptions import TokenError
from .models import Note, Vote
from django.forms.models import model_to_dict


# TODO: I'm expecting the user to provide their refresh token (instead of access
# token) because I'm lazy. also, the access token isn't refreshed, so all saved
# tokens are essentially garbage after 24 hours (that's how long a refresh token
# lasts). this is dangerous and makes no sense for security. fix this if it has
# to go into production.


def validate_refresh_token(refresh_token):
    try:
        # Decode the refresh token
        token = RefreshToken(refresh_token)

        # Extract the user ID from the token
        user_id = token["user_id"]

        # Retrieve the user from the database
        user = User.objects.get(id=user_id)

        return user
    except TokenError:
        return None
    except User.DoesNotExist:
        return None


def unauthorized_token_message():
    return Response(
        {"error": "Your token is trash lmoa."}, status=status.HTTP_401_UNAUTHORIZED
    )


def convert_iso_to_datetime(iso_date):
    return timezone.make_aware(
        datetime.strptime(iso_date, r"%Y-%m-%dT%H:%M:%S")  # e.g. 2024-10-12T19:18:46
    )


# tells whether user has upvoted, downvoted, or none
def get_vote_status(user, note):
    try:
        vote_status = Vote.objects.get(user=user, note=note)
        return model_to_dict(vote_status)["vote_type"] # up or down
    except Vote.DoesNotExist: # user hasn't voted on this
        return "none"


# all the extra processing required for one note
def process_note(user, note):
    # add the image url if it's an imagenote
    note_dict = model_to_dict(note)
    if "content_image" in note_dict:
        note_dict["content_image"] = note.content_image.url
    
    # add current user's vote as part of the response
    note_dict["vote_status"] = get_vote_status(user, note)
    
    return note_dict


@api_view(["GET"])
def get_notes(request):
    # TODO: add a field showing if user has voted on this post, and how

    # access get request params
    params = request.query_params
    crn = params.get("crn")
    token = params.get("token")
    date = params.get("date")

    # authenticate user
    user = validate_refresh_token(token)

    if not user:
        return unauthorized_token_message()

    textnotes = TextNote.objects.filter(
        crn=crn, class_date_and_time=convert_iso_to_datetime(date)
    ).order_by("tally")

    imagenote = ImageNote.objects.filter(
        crn=crn, class_date_and_time=convert_iso_to_datetime(date)
    ).order_by("tally")

    notes = list(textnotes) + list(imagenote)

    processed_notes = [process_note(user, note) for note in notes]

    return Response({"notes": processed_notes})


# handle picture request
# assumes it's guaranteed that the request is POST
@api_view(["POST"])
def create_img_post(request):
    # Access the JSON data
    data = request.data
    title = data.get("title")
    crn = data.get("crn")
    date = data.get("date")
    token = data.get("token")

    # get the image
    # TODO: gotta rename the image based on the username and datetime to avoid conflicts
    img = request.FILES.get("img")

    if img == None:
        return Response("no image uploaded!!", 400)

    # get the user based on the token
    user = validate_refresh_token(token)

    if not user:
        return unauthorized_token_message()

    # insert into db
    new_image_note = ImageNote(
        user=user,
        title=title,
        class_date_and_time=convert_iso_to_datetime(date),
        crn=crn,
        content_image=img,
    )

    new_image_note.save()

    # Process the data and return a response
    return Response({"message": "Image note created successfully!"}, status=201)


# handles text requests
@api_view(["POST"])
def create_text_post(request):
    # Access JSON data
    data = request.data
    title = data.get("title")
    body = data.get("body")
    crn = data.get("crn")
    date = data.get("date")
    token = data.get("token")

    # get the user based on the token
    user = validate_refresh_token(token)

    if not user:
        return unauthorized_token_message()

    # insert into db
    new_text_note = TextNote(
        user=user,
        title=title,
        class_date_and_time=convert_iso_to_datetime(date),
        crn=crn,
        content_text=body,
    )

    new_text_note.save()

    return Response({"message": "Text note created successfully!"}, status=201)


def get_tokens_for_user(user):
    """Generate JWT tokens for a user."""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email")
    
    # check for duplicate email
    
    # check for duplicate username
    
    user = User.objects.create_user(username=username, password=password, email=email)
    tokens = get_tokens_for_user(user)

    return Response(
        {"message": f"Account created for {user.username}", "tokens": tokens},
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        tokens = get_tokens_for_user(user)
        return Response(
            {"message": "Login successful", "tokens": tokens}, status=status.HTTP_200_OK
        )
    return Response(
        {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
    )


# useless rn
@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)


"""'Vote Handling Logic"""
@api_view(["POST"])
def vote_note(request):
    note_id = request.data.get("note_id")
    token = request.data.get("token")

    # TODO: check if all json fields provided

    user = validate_refresh_token(token)
    if not user:
        return unauthorized_token_message()

    note = Note.objects.get(id=note_id)
    vote_type = request.data.get(
        "vote_type"
    )  # Expecting 'up' or 'down' from the frontend

    # Check if a vote already exists, else except
    try:
        vote = Vote.objects.get(user=user, note=note)

        # deselction logic , # If the same vote is selected, remove it
        if vote.vote_type == vote_type:

            if vote_type == "up":
                note.tally -= 1
            elif vote_type == "down":
                note.tally += 1  # Assuming downvotes reduce the tally

            vote.delete()
            note.save()
            return Response(
                {"message": f"{vote_type.capitalize()} removed."},
                status=status.HTTP_200_OK,
            )

        else:  # switching votes / vote.vote_type != vote_type

            # by 2 because previously added or removed from tally
            if vote.vote_type == "up":
                note.tally -= 2
            elif vote.vote_type == "down":
                note.tally += 2

            vote.vote_type = vote_type
            vote.save()
            note.save()
            return Response(
                {"message": f"Switched to {vote_type}."}, status=status.HTTP_200_OK
            )

    # if vote doesnt exist auto add / decrease by 1
    except Vote.DoesNotExist:
        if vote_type == "up":
            note.tally += 1
        elif vote_type == "down":
            note.tally -= 1  # Assuming downvotes reduce the tally

        vote = Vote.objects.create(user=user, note=note, vote_type=vote_type)
        note.save()
        return JsonResponse({"status": "success", "vote_type": vote_type})
        # return Response({'message': f'{vote_type.capitalize()} added.'}, status=status.HTTP_201_CREATED)


"""'Vote Handling Logic"""
@api_view(["GET"])
def get_single_note(request):    
    # get the 'get' parameters
    params = request.query_params
    note_id = params.get("id")
    token = params.get("token")
    
    # get user
    user = validate_refresh_token(token)
    if not user:
        return unauthorized_token_message()
    
    try:
        note = TextNote.objects.get(id=note_id)
    except TextNote.DoesNotExist:
        try:
            note = ImageNote.objects.get(id=note_id)
        except ImageNote.DoesNotExist:
            return Response({"error": "note with that id doesn't exist"}, 404)
    
    return Response(process_note(user, note), 200)
