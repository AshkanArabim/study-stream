"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import (
    create_img_post,
    signup_view,
    login_view,
    logout_view,
    create_text_post,
)
from .views import vote_note
from django.conf import settings
from django.conf.urls.static import static

from .views import (
    create_img_post,
    signup_view,
    login_view,
    logout_view,
    create_text_post,
    get_notes,
)

urlpatterns = [
    path("notes/image", create_img_post, name="create_img_post"),
    path("signup/", signup_view, name="signup"),
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("notes/text", create_text_post, name="create_text_post"),
    path("notes/", get_notes, name="get_notes"),
    path("notes/vote/", vote_note, name="vote_note"),
    path("notes/", get_notes, name="get_notes"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
