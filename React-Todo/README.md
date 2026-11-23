# SOLO - React TO-DO List

**Live Demo:** https://samir-ali88.github.io/SD-1/Todo-Live/

A simple task manager I built using React, Vite, Tailwind CSS, and shadcn/ui. It tracks daily tasks, shows completion progress, and saves data both in the browser and via local JSON backup files.

## What It Does

- **Task Management:** Add tasks with categories (`Frontend`, `React Hooks`, `Git & Deploy`, `Presentation`), mark them complete, or delete them.
- **Progress Tracking:** Displays total tasks, pending count, and a completion percentage bar at the top.
- **Filter & Search:** Filter by `All`, `Pending`, or `Completed`, or search by keyword.
- **Task Details Page:** Clicking **Inspect** opens a separate route for that specific task using React Router.
- **Save & Backup Options:**
  - Auto-saves everything to `localStorage` so tasks stay after refreshing or closing the browser.
  - **Backup / Restore buttons:** Export tasks to a `.json` file on your PC and import them back anytime if browser data gets cleared.

## Tech & Hooks Used

- React + Vite + Tailwind CSS + shadcn/ui
- React Router (`BrowserRouter`)
- `useState`, `useEffect`, `useNavigate`, and `useRef`

## Folder Layout

- `React-Todo/` — React source code
- `Todo-Live/` — Built static files deployed to GitHub Pages

## Run Locally

```bash
cd React-Todo
npm install
npm run dev
