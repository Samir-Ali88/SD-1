# SOLO — Personal Portfolio Website (Tailwind CSS)

A responsive personal portfolio website built with HTML5 and **Tailwind CSS**, showcasing the academic background, technical skills, and projects of Samir Ali (SOLO).

## Live Demo

**https://samir-ali88.github.io/SD-1/Mini-Project-2/**

## Overview

This is a single-page portfolio for **Samir Ali (SOLO)**, a Computer Science & Engineering student at the International Islamic University Chittagong (IIUC). It presents an introduction, a list of technical skills, featured projects with links to their GitHub repositories, and a contact section with a form.

This version (Mini-Project 2) is a rebuild of the earlier plain-CSS portfolio, now styled entirely with Tailwind CSS utility classes.

## Assignment Requirements Checklist

| Requirement | How it is met |
|---|---|
| Navigation bar and at least two content sections | Sticky navigation bar with links to About, Skills, Projects, and Contact sections |
| Styling with Tailwind CSS | All styling uses Tailwind utility classes (colors, spacing, typography, borders, transitions) with a custom color palette set in the Tailwind config |
| Responsive layout | Mobile-first classes (`md:` breakpoints): stacked layout and collapsible menu on phones, side-by-side layout and full menu on desktop; projects grid is 1 column on mobile and 2 on desktop |
| At least one interactive element | Mobile menu toggle button, smooth scrolling between sections, hover effects on links, skill tags, project cards and profile photo, and a contact form that shows a confirmation message on submit |

## Features

- **Sticky Navigation Bar** — Always visible while scrolling, collapses into a Menu button on small screens.
- **About Section** — Short introduction with a profile image.
- **Skills Section** — Tag-style display of core skills (C++, OOP, Python, Linux, SQL, Networking, Competitive Programming, Git & GitHub).
- **Projects Section** — Card layout for two projects, each with a tech stack, description, and GitHub link:
  - GTK Chat System Using C/C++
  - Multi-Threaded Port Scanner (Python)
- **Contact Section** — Direct email link and a form (name, email, message).
- **Dark Theme** — Dark background with amber and sage accents and monospace details.

## Technologies Used

| Category | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (via CDN) |
| Interactivity | Vanilla JavaScript (menu toggle, form feedback) |
| Fonts | Arial, Courier New |
| Hosting | GitHub Pages |

## Project Structure

```
Mini-Project-2/
│
├── index.html        # Page markup, Tailwind classes, and small inline script
├── README.md         # Project documentation
└── images/
    └── ok me.jpg     # Profile image used in the About section
```

## How to Run Locally

1. Clone or download the project files.
2. Make sure `index.html` and the `images` folder are in the same directory.
3. Open `index.html` in any modern web browser.

No build step or installation is needed. Tailwind is loaded from its CDN, so an internet connection is required for the styles to appear.

## Notes

- The contact form is a front-end demo only. It shows a confirmation message but does not send data anywhere yet.

## Future Improvements

- Connect the contact form to a backend or form service.
- Add more projects as they are completed.
- Add a downloadable resume/CV link.
- Switch from the Tailwind CDN to a build setup for production use.

## Author

**Samir Ali (SOLO)**
BSc in Computer Science & Engineering
International Islamic University Chittagong (IIUC)

## License

© 2026 Samir Ali. All rights reserved.