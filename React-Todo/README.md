# DevBoard — Study & Project Hub (React + Vite + shadcn/ui)

A modern, visually polished web app built for tomorrow's class challenge using **Vite**, **React**, **Tailwind CSS**, and **shadcn/ui**.

## How to Run Locally

```bash
npm install
npm run dev
```

## Presentation Cheat Sheet (How Each Requirement Is Used)

### 1. `useState`
- **Dashboard (`src/pages/Dashboard.jsx`)**:
  - `projects`: Holds the list of study projects/tasks.
  - `search`: Controls the live search filter input.
  - `filter`: Tracks the active category tab (`"All"`, `"Pending"`, `"Completed"`).
  - `title` & `category`: Control the new task creation form inputs.
- **Quotes/Tip Banner (`src/pages/Dashboard.jsx`)**:
  - `tip` & `loadingTip`: Store the developer tip fetched when the component loads or refreshes.

### 2. `useEffect`
- **Auto-Save to `localStorage`**: Runs whenever `projects` changes (`[projects]`) so your items persist even after refreshing the page.
- **Fetch Data on Mount**: Runs once on page load (`[]`) to simulate fetching a live "Daily Coding Tip" banner (great example of `useEffect` for side effects / API calls).

### 3. `useNavigate`
- **Dashboard → Project Details**: Clicking **"Inspect"** calls `navigate(\`/project/${item.id}\`)` to jump to the dynamic details page without reloading.
- **Project Details → Dashboard**: Clicking **"Back to Dashboard"** calls `navigate("/")`.

### 4. `shadcn/ui` Components Included
- `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- `Button` (multiple variants: `default`, `secondary`, `outline`, `ghost`, `destructive`)
- `Input`
- `Badge`
- `Progress` (visual completion bar)
- `Tabs` (`TabsList`, `TabsTrigger`)

## Push to GitHub

```bash
git init
git add .
git commit -m "Build DevBoard React + Vite + shadcn/ui app"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
