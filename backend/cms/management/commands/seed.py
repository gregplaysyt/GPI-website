from django.core.management.base import BaseCommand
from django.utils import timezone

from cms.models import (
    Cause,
    Event,
    NewsArticle,
    Page,
    Programme,
    SiteSettings,
)


class Command(BaseCommand):
    help = "Seed the database with the designed GPI content."

    def handle(self, *args, **options):
        self.seed_programmes()
        self.seed_causes()
        self.seed_events()
        self.seed_news()
        self.seed_pages()
        SiteSettings.load()
        self.stdout.write(self.style.SUCCESS("Seed complete."))

    def seed_programmes(self):
        programmes = [
            ("Protection of the girl child",
             "Challenging the socialisation that weakens girls' protection and decision making in public and private life.",
             "shield", "#B4285A", 0),
            ("Adolescent sexuality and SRHR",
             "Accurate sexuality education that lowers vulnerability and protects girls' reproductive health.",
             "heart-pulse", "#1F6F5C", 1),
            ("Leadership and civic voice",
             "Girls' clubs that turn confidence into leadership, peer support and a public voice.",
             "megaphone", "#A65C12", 2),
            ("Economic empowerment",
             "Skills, small grants and enterprise support so young women can earn on their own terms.",
             "coins", "#4B4184", 3),
        ]
        for title, summary, icon, accent, order in programmes:
            Programme.objects.update_or_create(
                title=title,
                defaults={"summary": summary, "icon": icon, "accent": accent, "order": order},
            )

    def seed_causes(self):
        causes = [
            ("Keep girls in school this term", "education",
             "Fees, books and uniforms for girls in Cross River and Benue.",
             "2 states, 45 partner schools", False, 0),
            ("A safe space for girls in Port Harcourt", "safe-spaces",
             "Furnishing and running a drop-in centre open six days a week.",
             "Open six days a week", False, 1),
            ("Sexuality education in 50 schools", "health",
             "Age-appropriate curriculum and trained teachers for a full school year.",
             "Trained teachers in every centre", False, 2),
            ("Leadership clubs in three states", "livelihood",
             "Seed funding for girls' clubs in Jos, Lagos and Benin City.",
             "12 new clubs this year", True, 3),
            ("End child marriage campaign", "protection",
             "Community dialogues and legal support to keep girls safe.",
             "6 communities reached", False, 4),
            ("Menstrual health kits", "health",
             "Reusable kits and education for girls who miss school every month.",
             "5,000 kits delivered", False, 5),
        ]
        for title, category, summary, meta, featured, order in causes:
            Cause.objects.update_or_create(
                title=title,
                defaults={"category": category, "summary": summary,
                          "meta_line": meta, "featured": featured, "order": order},
            )

    def seed_events(self):
        events = [
            ("Men's Health Awareness Month: bringing boys into the conversation",
             "A day of workshops with boys and young men on consent, care and shared responsibility.",
             "Thursday 18 June, 10:00 AM", "GPI Centre, Calabar", "Featured", "Community", True, 0),
            ("Girls' club open day", "Open day for families and community leaders.",
             "24 May", "GPI Centre, Jos", "", "", False, 1),
            ("Dialogue with traditional rulers",
             "A conversation on ending child marriage and keeping girls in school.",
             "12 July", "Benin City", "", "", False, 2),
            ("Feminist summer school", "A week of learning, debate and organising.",
             "30 August", "Lagos", "", "", False, 3),
        ]
        for title, desc, date, location, tag1, tag2, featured, order in events:
            Event.objects.update_or_create(
                title=title,
                defaults={"description": desc, "location": location,
                          "tag_primary": tag1, "tag_secondary": tag2,
                          "featured": featured, "order": order},
            )

    def seed_news(self):
        news = [
            ("Why sexuality education belongs in every Nigerian school", "analysis",
             "Girls tell us the same thing in every state: what they learn in class rarely covers the questions they actually carry.",
             "Anthonia Odey", "2026-05-12", False, 0),
            ("Inside our girls' clubs: what 30 years of listening taught us", "field-notes",
             "The club is not a classroom. It is the one place a girl can ask a question without being told she is rude.",
             "GPI Jos Centre", "2026-04-28", False, 1),
            ("A N50 million endowment fund for girls' education", "news",
             "The fund in memory of our founder, Professor Bene Madunagu, keeps her work going for the next generation.",
             "GPI Secretariat", "2026-04-09", True, 2),
            ("Traditional rulers sign a pledge against child marriage", "report",
             "Twelve communities in Edo State committed to reporting rather than settling cases quietly.",
             "GPI Edo State", "2026-03-22", False, 3),
            ("Inside a youth-friendly clinic in Jos", "field-notes",
             "A nurse, a curtain and a promise of privacy: how one room changed attendance by 40 percent.",
             "GPI Jos Centre", "2026-03-04", False, 4),
        ]
        for title, category, excerpt, author, date, featured, order in news:
            NewsArticle.objects.update_or_create(
                title=title,
                defaults={"category": category, "excerpt": excerpt,
                          "author": author, "published_on": timezone.datetime.fromisoformat(date).date(),
                          "featured": featured, "order": order},
            )

    def seed_pages(self):
        # Copy taken verbatim from the Open Pencil design heroes, so the CMS
        # matches the visual design out of the box.
        pages = {
            "home": ("A feminist institution since 1994",
                     "Empowering girls to become catalysts for change.",
                     "Girls' Power Initiative works with children and young females across Nigeria, building the knowledge, confidence and solidarity they need to claim their rights and shape their own futures."),
            "about": ("About us",
                      "Thirty-two years of building girls' power.",
                      "Girls' Power Initiative (GPI) is a feminist non-governmental organisation working in Nigeria since 1994, so that every girl can decide her own life and defend the rights she was born with."),
            "what-we-do": ("What we do",
                           "All we want is the consciousness, the will and the act to uphold girls' and women's rights.",
                           "Four programme areas, one theory of change: give a girl accurate information, a safe room of peers, and an adult who keeps her word."),
            "causes": ("Our causes",
                       "Six causes. One girl at a time.",
                       "Every cause below is a live programme in our centres. Read what each one does, then give if you can."),
            "news": ("News and resources",
                     "Field notes, research and press.",
                     "What our centres are learning, written by the people doing the work, plus every report we publish."),
            "contact": ("Get involved",
                        "Give, volunteer, or partner with us.",
                        "Whatever you can offer, a centre in Calabar, Benin City, Jos, Lagos or Port Harcourt can use it this term."),
        }
        for slug, (eyebrow, headline, body) in pages.items():
            Page.objects.update_or_create(
                slug=slug,
                defaults={"hero_eyebrow": eyebrow, "hero_headline": headline, "hero_body": body},
            )
