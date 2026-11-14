from django.db import models
from django.utils.text import slugify


class TimestampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Cause(TimestampedModel):
    """A fundraising cause shown on the home and causes pages."""

    class Category(models.TextChoices):
        EDUCATION = "education", "Education"
        SAFE_SPACES = "safe-spaces", "Safe spaces"
        HEALTH = "health", "Health"
        LIVELIHOOD = "livelihood", "Livelihood"
        PROTECTION = "protection", "Protection"
        OTHER = "other", "Other"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(max_length=30, choices=Category.choices, default=Category.OTHER)
    summary = models.TextField(blank=True)
    meta_line = models.CharField(max_length=200, blank=True, help_text="Short line under the summary, e.g. '2 states, 45 partner schools'.")
    image = models.ImageField(upload_to="causes/", blank=True, null=True)
    featured = models.BooleanField(default=False, help_text="Show on the home page.")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name_plural = "causes"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Programme(TimestampedModel):
    """One of the four core programmes."""

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    summary = models.TextField(blank=True)
    icon = models.CharField(max_length=40, blank=True, help_text="Icon key, e.g. shield, heart-pulse, megaphone, coins.")
    accent = models.CharField(max_length=7, default="#B4285A", help_text="Accent hex colour used for the icon tint.")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Event(TimestampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True)
    starts_at = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    tag_primary = models.CharField(max_length=40, blank=True, default="Featured")
    tag_secondary = models.CharField(max_length=40, blank=True)
    image = models.ImageField(upload_to="events/", blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "starts_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class NewsArticle(TimestampedModel):
    class Category(models.TextChoices):
        ANALYSIS = "analysis", "Analysis"
        FIELD_NOTES = "field-notes", "Field notes"
        NEWS = "news", "News"
        REPORT = "report", "Report"

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=270, unique=True, blank=True)
    category = models.CharField(max_length=30, choices=Category.choices, default=Category.NEWS)
    excerpt = models.TextField(blank=True)
    body = models.TextField(blank=True, help_text="Full article body (plain text or simple HTML).")
    author = models.CharField(max_length=120, blank=True)
    published_on = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to="news/", blank=True, null=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["-published_on", "-created_at"]
        verbose_name_plural = "news articles"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Page(TimestampedModel):
    """Editable copy for a page's hero and section headings.

    Each page's React component has built-in defaults from the design.
    Any key present here overrides the default. Values are stored as JSON,
    so non-technical editors still edit through a simple text field per key.
    """

    SLUGS = [
        ("home", "Home"),
        ("about", "About"),
        ("what-we-do", "What we do"),
        ("causes", "Causes"),
        ("news", "News"),
        ("contact", "Contact"),
    ]

    slug = models.SlugField(choices=SLUGS, unique=True)
    hero_eyebrow = models.CharField(max_length=120, blank=True)
    hero_headline = models.CharField(max_length=300, blank=True)
    hero_body = models.TextField(blank=True)

    def __str__(self):
        return self.get_slug_display()


class SiteSettings(TimestampedModel):
    """Singleton contact details and social links used across the site."""

    contact_email = models.EmailField(default="gpibenin@gpinigeria.org")
    contact_phone = models.CharField(max_length=40, default="+234 807 304 2499")
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)

    class Meta:
        verbose_name_plural = "site settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return "Site settings"


class ContactMessage(TimestampedModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.subject or self.email}"


class NewsletterSubscriber(TimestampedModel):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
