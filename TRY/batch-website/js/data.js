/* =========================================================
   Batch Hub - DATA FILE  (this is the only file you edit
   when you want to add semesters, courses or PDFs)
   ========================================================= */

/* ---------- 1. Site information ---------- */
const SITE = {
  name: "Piaju Study",
  tagline: "Everything our batch needs, in one place",
  description:
    "Welcome! This is the study hub of our batch. Here you will find previous solves, previous questions, notes and suggestions for every semester, course, mid and final exam. Open the University section to get started.",
  about: [
    "Made by Imam Samir Ali ",
  
  ],
  contacts: [
    { label: "Email",    text: "Send Mail", href: "mailto:samirali.tech88@gmail.com" },
    { label: "GitHub",   text: "Follow me",    href: "https://github.com/Samir-Ali88" }
  ],
  footer: "© 2026 Piaju Study· Made by Samir Ali"
};

/* ---------- 2. Exams (every course has these two) ---------- */
const EXAMS = [
  { id: "mid",   name: "Mid",   icon: "📘", desc: "Mid-term exam resources" },
  { id: "final", name: "Final", icon: "📕", desc: "Final exam resources" }
];

/* ---------- 3. Sections inside Mid / Final ----------
   Your sketch says 5 sections but lists 4 names.
   To add a 5th, copy one line and change id / name / icon.      */
const SECTIONS = [
  { id: "prev-solve",    name: "Previous Solve",    icon: "✅", desc: "Solved previous papers" },
  { id: "prev-question", name: "Previous Question", icon: "📝", desc: "Question papers of past years" },
  { id: "note",          name: "Note",              icon: "📒", desc: "Class notes and materials" },
  { id: "suggestion",    name: "Suggestion",        icon: "💡", desc: "Important topics and suggestions" }
];

/* ---------- 4. Semesters and courses ----------
   id must be lowercase with no spaces (used in the URL and file path).
   Change the course names/ids to your real courses.            */
const SEMESTERS = [
  {
    id: "sem1", name: "1st Semester",
    courses: [
      { id: "cse",  name: "CSE",  full: "Computer Science & Engineering" },
      { id: "math", name: "Math", full: "Mathematics" },
      { id: "eee",  name: "EEE",  full: "Electrical & Electronic Engineering" }
    ]
  },
  {
    id: "sem2", name: "2nd Semester",
    courses: [
      { id: "cse",  name: "CSE",  full: "Computer Science & Engineering" },
      { id: "math", name: "Math", full: "Mathematics" },
      { id: "eee",  name: "EEE",  full: "Electrical & Electronic Engineering" }
    ]
  },
  {
    id: "sem3", name: "3rd Semester",
    courses: [
      { id: "cse",  name: "DS",  full: "Data Structure" },
      { id: "math", name: "Math-3", full: "Mathematics-3" },
      { id: "eee",  name: "DLD",  full: "Digital Logic Design" }
    ]
  },
  {
    id: "sem4", name: "4th Semester",
    courses: [
      { id: "cse",  name: "CSE",  full: "Computer Science & Engineering" },
      { id: "math", name: "Math", full: "Mathematics" },
      { id: "eee",  name: "EEE",  full: "Electrical & Electronic Engineering" }
    ]
  }
];

/* ---------- 5. FILES (your PDFs) ----------
   Key  = "semester/course/exam/section"
   Value = list of files. "file" is the path relative to index.html.

   Steps to add a PDF:
     1. Copy the PDF into the matching folder, for example
        files/sem1/cse/mid/prev-solve/
     2. Add a line below for that key:
        { title: "Mid 2024 Solve", file: "files/sem1/cse/mid/prev-solve/mid-2024.pdf" }

   Tips: use lowercase file names with no spaces (mid-2024.pdf).
   GitHub Pages is case-sensitive: "Mid.pdf" and "mid.pdf" are different.
*/
const FILES = {
  // Example (remove the // to see how it looks):
  // "sem1/cse/mid/prev-solve": [
  //   { title: "Mid 2024 Solve", file: "files/sem1/cse/mid/prev-solve/mid-2024.pdf", note: "Handwritten solve" }
  // ],
};
