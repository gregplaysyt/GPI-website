from rest_framework import generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Cause,
    ContactMessage,
    Event,
    NewsletterSubscriber,
    NewsArticle,
    Page,
    Programme,
    SiteSettings,
)
from .serializers import (
    CauseSerializer,
    ContactMessageSerializer,
    EventSerializer,
    NewsletterSubscriberSerializer,
    NewsArticleSerializer,
    PageSerializer,
    ProgrammeSerializer,
    SiteSettingsSerializer,
)


class CauseListView(generics.ListAPIView):
    queryset = Cause.objects.filter(is_active=True)
    serializer_class = CauseSerializer


class CauseDetailView(generics.RetrieveAPIView):
    queryset = Cause.objects.filter(is_active=True)
    serializer_class = CauseSerializer
    lookup_field = "slug"


class ProgrammeListView(generics.ListAPIView):
    queryset = Programme.objects.all()
    serializer_class = ProgrammeSerializer


class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class NewsArticleListView(generics.ListAPIView):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer


class NewsArticleDetailView(generics.RetrieveAPIView):
    queryset = NewsArticle.objects.all()
    serializer_class = NewsArticleSerializer
    lookup_field = "slug"


class PageListView(generics.ListAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer


class SiteSettingsView(APIView):
    def get(self, request):
        return Response(SiteSettingsSerializer(SiteSettings.load()).data)


class ContactMessageView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer


class NewsletterSubscriberView(generics.CreateAPIView):
    serializer_class = NewsletterSubscriberSerializer
