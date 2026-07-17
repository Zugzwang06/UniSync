# UniSync

> Transform university course schedules into beautiful, recurring calendar events with one upload.

UniSync is a full-stack web application that allows students to upload their university schedule, automatically parse classes, visualize their semester, compare schedule revisions, and synchronize recurring events with Google Calendar.

---

## Features

### Schedule Upload
- Upload university schedule PDFs
- Automatic class extraction
- Supports recurring weekly schedules
- Stores multiple schedule versions

### Calendar Sync
- Google Calendar integration
- One-click recurring event creation
- Intelligent updates (no duplicate events)
- Remove synced events anytime
- Apple Calendar (.ics) export

### Schedule Management
- Interactive weekly calendar
- Upload history
- Semester version comparison
- Detect added, removed, and modified classes

### Dashboard
- Meeting statistics
- Course statistics
- Earliest and latest classes
- Busiest day of the week
- Schedule overview

---

## Screenshots

### Dashboard

<img width="977" height="1029" alt="Screenshot 2026-07-17 at 6 38 10 PM" src="https://github.com/user-attachments/assets/ec6334a4-b5a5-4eb3-85c6-45bfd7653b2c" />


### Weekly Calendar

<img width="1150" height="584" alt="Screenshot 2026-07-17 at 6 38 25 PM" src="https://github.com/user-attachments/assets/21e8d7db-ea8f-4646-aa2b-b5fc655cb02b" />


### Schedule Comparison

![Uploading Screenshot 2026-07-17 at 6.38.44 PM.png…]()


---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Axios

### Backend

- FastAPI
- SQLAlchemy
- PostgreSQL
- Google Calendar API

### Other

- Google OAuth 2.0
- iCalendar (.ics)
- PDF Schedule Parsing

---

## Architecture

```text
University PDF
        │
        ▼
 PDF Parser
        │
        ▼
 Structured Schedule
        │
        ├────────► PostgreSQL
        │
        ├────────► Weekly Calendar
        │
        ├────────► Schedule Comparison
        │
        ▼
 Google Calendar Sync
```

---

## Current Functionality

- PDF upload
- Persistent schedules
- Multiple semester versions
- Version comparison
- Google Calendar synchronization
- Google Calendar event removal
- Apple Calendar export
- Weekly calendar visualization

---

## Planned Features

- Calendar selection before syncing
- Last sync timestamp
- Rich schedule comparison UI
- Dark/Light themes
- Mobile responsiveness
- Multi-calendar support
- Semester sharing
- Automatic schedule conflict detection
- Exam schedule support

---

## Installation

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

```text
DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
```

---

## License

MIT
