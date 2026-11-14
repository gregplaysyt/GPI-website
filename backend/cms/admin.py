from django.contrib import admin

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


@admin.register(Cause)
class CauseAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "featured", "order", "is_active")
    list_editable = ("featured", "order", "is_active")
    list_filter = ("category", "featured", "is_active")
    search_fields = ("title", "summary")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ("title", "accent", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "starts_at", "location", "featured", "order")
    list_editable = ("featured", "order")
    list_filter = ("featured",)
    prepopulated_fields = {"slug": ("title",)}


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "published_on", "featured")
    list_editable = ("featured",)
    list_filter = ("category", "featured")
    search_fields = ("title", "excerpt", "author")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "hero_headline")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    readonly_fields = ("name", "email", "subject", "message", "created_at")
    search_fields = ("name", "email", "message")


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)
