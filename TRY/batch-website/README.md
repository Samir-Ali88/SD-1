# Batch Hub

A simple static website for our batch: University → Semester → Course → Mid/Final → Previous Solve / Previous Question / Note / Suggestion.

Built with only **HTML, CSS and JavaScript**. No installation, no server.

## Run on your PC

Double-click `index.html`. That's it.

## Folder structure

```
batch-website/
├── index.html
├── README.md
├── css/style.css          ← colours and design
├── js/
│   ├── data.js            ← EDIT THIS: site text, semesters, courses, PDF list
│   └── app.js             ← page logic (no need to edit)
├── images/
│   └── logo.png           ← put your logo here (optional)
└── files/                 ← put your PDFs here
    └── sem1/cse/mid/prev-solve/   (and so on)
```

## Add a PDF

1. Copy the PDF into the matching folder, e.g. `files/sem1/cse/mid/prev-solve/mid-2024.pdf`
2. Open `js/data.js`, find `const FILES`, and add:

```js
"sem1/cse/mid/prev-solve": [
  { title: "Mid 2024 Solve", file: "files/sem1/cse/mid/prev-solve/mid-2024.pdf" }
],
```

The key format is `semester/course/exam/section`.
Section ids: `prev-solve`, `prev-question`, `note`, `suggestion`.

Use lowercase file names without spaces. GitHub Pages is case-sensitive.

## Change courses, text, contacts

Everything is in `js/data.js`. Edit `SITE`, `SEMESTERS`, and `SECTIONS`.

## Change colours

Edit the variables at the top of `css/style.css` (`:root { ... }`).

## Put it live on GitHub Pages

1. Create a new repository on GitHub (e.g. `batch-hub`).
2. Upload all files (keep the folder structure), or use git:
   ```
   git init
   git add .
   git commit -m "First version"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/batch-hub.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/batch-hub/`.

Note: GitHub limits single files to 100 MB, and the repository should stay under about 1 GB.
