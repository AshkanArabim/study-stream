import json
import os
from django.urls import reverse
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import (
    AccessToken,
    RefreshToken,
)  # Import both tokens
from .models import Note
from rest_framework_simplejwt.exceptions import TokenError


def validate_refresh_token(refresh_token):
    try:
        token = RefreshToken(refresh_token)
        user_id = token["user_id"]
        user = User.objects.get(id=user_id)
        return user
    except TokenError:
        return None
    except User.DoesNotExist:
        return None


class VoteViewTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.note = Note.objects.create(
            title="Test Note",
            user=self.user,
            crn=123,
            class_date_and_time="2024-10-12T12:00:00Z",
        )
        self.refresh_token = str(
            RefreshToken.for_user(self.user)
        )  # Generate refresh token
        self.access_token = str(
            AccessToken.for_user(self.user)
        )  # Generate access token

    def load_json_data(self, filename):
        file_path = os.path.join(os.path.dirname(__file__), "test_data", filename)
        with open(file_path, "r") as file:
            return json.load(file)

    def test_upvote_note(self):
        vote_data = self.load_json_data("vote_note_upvote.json")
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(vote_data),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_downvote_note(self):
        vote_data = self.load_json_data("vote_note_downvote.json")
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(vote_data),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_toggle_upvote(self):
        # First upvote
        self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(self.load_json_data("vote_note_upvote.json")),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        # Now toggle (remove) the upvote
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(self.load_json_data("vote_note_upvote.json")),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_switch_vote(self):
        # First upvote
        self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(self.load_json_data("vote_note_upvote.json")),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        # Now switch to downvote
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(self.load_json_data("vote_note_downvote.json")),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_upvote_note(self):
        vote_data = {"vote_type": "up"}  # Directly use the dictionary here
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(vote_data),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_downvote_note(self):
        vote_data = {"vote_type": "down"}  # Directly use the dictionary here
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps(vote_data),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_toggle_upvote(self):
        # Upvote
        self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps({"vote_type": "up"}),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        # Toggle (remove) the upvote
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps({"vote_type": "up"}),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)

    def test_switch_vote(self):
        # First upvote
        self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps({"vote_type": "up"}),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        # Switch to downvote
        response = self.client.post(
            reverse("vote_note", args=[self.note.id]),
            json.dumps({"vote_type": "down"}),
            content_type="application/json",
            **{"HTTP_AUTHORIZATION": f"Bearer {self.access_token}"},
        )
        self.assertEqual(response.status_code, 200)
