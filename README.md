# JobCrawler: Job Search Dashboard

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Prototype-orange?style=for-the-badge)

A front-end prototype for a dashboard that gathers postings from several recruiting pages into one formatted view, with filters and a chat assistant that refines the search.

The current build runs on sample data. No crawler or backend exists yet.

---

## Architecture Overview

```text
        +-------------------------------------------+
        |  Browser: single-page dashboard            |
        |  filters, job cards, skills match, chat    |
        +---------------------+---------------------+
                              |
                              v
        +-------------------------------------------+
        |  frontend/app.js: sample jobs and chat     |
        |  (stand-in for a future crawler API)       |
        +-------------------------------------------+
```

---

## What It Shows

* **Unified job cards:** title, company, location, work type, salary range, posting age and source site in one layout.
* **Skills match:** each posting lists required skills with a match percentage.
* **Filters:** narrow results by work type and other fields.
* **Chat assistant:** a conversation panel that restates what you asked for and updates the search.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **UI** | HTML5, CSS3 | Layout and styling |
| **Logic** | Vanilla JavaScript | Rendering, filtering and chat |
| **Data** | Hard-coded sample objects | Placeholder for crawled postings |

---

## Quickstart

No build step or dependencies.

```bash
git clone https://github.com/ChamarWilliams/jobcrawler.git
cd jobcrawler/frontend
npx serve .
```

Open the port `serve` reports, or open `frontend/index.html` directly in a browser.

---

## Project Structure

```text
frontend/index.html   Page markup and styles
frontend/app.js       Sample data, rendering, filters, chat
```

---

## Roadmap

1. Backend service that fetches postings from recruiting pages.
2. Normalization into one job schema.
3. Real skills matching against a saved profile.
4. A model-backed assistant in place of the scripted chat.
