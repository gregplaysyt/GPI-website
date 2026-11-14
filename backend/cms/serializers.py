from rest_framework import serializers

from .models import (
    Cause,
    Event,
    NewsletterSubscriber,
    NewsArticle,
    Page,
    Programme,
    SiteSettings,
    ContactMessage,
)


class CauseSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Cause
        fields = [
            "id", "title", "slug", "category", "summary", "meta_line",
            "image", "featured", "order",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = ["id", "title", "slug", "summary", "icon", "accent", "order"]


class EventSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    starts_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S")

    class Meta:
        model = Event
        fields = [
            "id", "title", "slug", "description", "starts_at", "location",
            "tag_primary", "tag_secondary", "image", "featured", "order",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class NewsArticleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    published_on = serializers.DateField(format="%d %b %Y")

    class Meta:
        model = NewsArticle
        fields = [
            "id", "title", "slug", "category", "excerpt", "body",
            "author", "published_on", "image", "featured",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ["slug", "hero_eyebrow", "hero_headline", "hero_body"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["contact_email", "contact_phone", "facebook_url", "instagram_url", "twitter_url"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["email"]
