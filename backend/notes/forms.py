from django import forms
from django.contrib.auth.forms import AuthenticationForm as BaseAuthenticationForm
from django.contrib.auth.forms import UserCreationForm as BaseUserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(BaseUserCreationForm):
    email = forms.EmailField(required=False, help_text="Optional. Enter a valid email address.")

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')  # Include email in fields

class CustomAuthenticationForm(BaseAuthenticationForm):
    username = forms.CharField(
        max_length=254, 
        widget=forms.TextInput(attrs={'placeholder': 'Username'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'})
    )
