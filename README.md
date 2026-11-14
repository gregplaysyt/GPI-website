# Girls' Power Initiative — website

A two-part website for Girls' Power Initiative (GPI), a Nigerian feminist NGO:

- **`frontend/`** — a React static site (built with Vite) with six pages: Home, About, What we do, Causes, News and Contact.
- **`backend/`** — a Django CMS. News, causes, programmes, events and the page hero copy are editable in the Django admin, and served to React through a small REST API.

The visual design was taken from the Open Pencil (Figma-format) files at `GPI.fig`; the extracted source snippets live under `.kai/design/`.

## Requirements

- Node.js 20+ (Node 24 was used)
- Python 3.12+

## 1. Run the backend (Django)

```bash
cd backend

# create and activate a virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# install dependencies
pip install django djangorestframework django-cors-headers pillow

# create the database and load the designed content
python manage.py migrate
python manage.py seed

# create an admin login
python manage.py createsuperuser

# start the API server (http://127.0.0.1:8000)
python manage.py runserver
```

The admin panel is at **http://127.0.0.1:8000/admin/**. From there you can edit:

- **Causes** — the fundraising causes on the Home and Causes pages.
- **News articles** — the stories on the Home and News pages.
- **Programmes** — the four programme areas shown on the Home page.
- **Events** — the events on the Home page.
- **Pages** — the hero headline, eyebrow and lead text for each of the six pages.
- **Site settings** — the contact email, phone and social links.
- **Contact messages** and **Newsletter subscribers** — submissions from the forms.

## 2. Run the frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173/**. The site reads from the backend at `http://127.0.0.1:8000` (CORS is open in development).

### Production build

```bash
cd frontend
npm run build        # outputs to frontend/dist
npm run preview      # serves the built site locally
```

## API endpoints

All under `/api/`:

| Endpoint | Purpose |
| --- | --- |
| `/api/causes/` | List causes |
| `/api/programmes/` | List programmes |
| `/api/events/` | List events |
| `/api/news/` | List news articles |
| `/api/pages/` | Editable page hero copy |
| `/api/site-settings/` | Contact details and socials |
| `/api/contact/` | POST a contact message |
| `/api/newsletter/` | POST a newsletter signup |

## Notes

- The site falls back to built-in designed content if the backend is offline, so the pages always render.
- Images are placeholders (the source design has no image files). Drop real photos into `backend/media/` and reference them through the admin `image` fields, or add images directly to the React components.
- Social links in the footer point to `#`; set them in **Site settings** in the admin.
