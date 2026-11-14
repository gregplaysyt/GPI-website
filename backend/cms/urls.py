from django.urls import path

from . import views

urlpatterns = [
    path("causes/", views.CauseListView.as_view(), name="cause-list"),
    path("causes/<slug:slug>/", views.CauseDetailView.as_view(), name="cause-detail"),
    path("programmes/", views.ProgrammeListView.as_view(), name="programme-list"),
    path("events/", views.EventListView.as_view(), name="event-list"),
    path("news/", views.NewsArticleListView.as_view(), name="news-list"),
    path("news/<slug:slug>/", views.NewsArticleDetailView.as_view(), name="news-detail"),
    path("pages/", views.PageListView.as_view(), name="page-list"),
    path("site-settings/", views.SiteSettingsView.as_view(), name="site-settings"),
    path("contact/", views.ContactMessageView.as_view(), name="contact-message"),
    path("newsletter/", views.NewsletterSubscriberView.as_view(), name="newsletter-signup"),
]
