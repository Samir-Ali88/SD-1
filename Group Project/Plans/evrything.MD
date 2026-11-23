# Study Tracker: Simple Step-by-Step README
### Semester 3 · Final exam only · My part: Progress, Home, login and deployment

You do NOT need to understand everything at once. This README does one small thing at a time.
Each step has: **what you are doing → the prompt to copy → how to check it works → save.**

---
## After switching acc in new chat
I am continuing the Study Tracker project (context above). 
Steps already finished and working: [for example: Steps 1 to 4].
I am now doing: [for example: Step 5, part C].
Here are my current files that this step depends on. Use them exactly as they are, same names and paths:

FILE: src/data/catalog.js
[paste the file]

FILE: src/features/progress/progressUtils.js
[paste the file]

Do not rename anything or rewrite files I did not ask about.
## PART 0. The big picture in plain words

You already know HTML, CSS and JavaScript. This project uses the same ideas, with helper tools.
Think of building a house:

| Tool | Think of it as | What it does for you |
| --- | --- | --- |
| **Node.js** | The electricity | Lets your computer run modern web tools. You install it once and forget it. |
| **Vite** | The building site | Creates your project and shows it in the browser while you work. |
| **React** | Building with Lego pieces | You make small reusable pieces (a button, a card, a checklist) and join them into pages. |
| **Tailwind CSS** | Paint, written as short words | Instead of writing a CSS file, you write words like `bg-white p-4` inside your HTML. |
| **shadcn/ui** | Ready-made furniture | Pre-made buttons, cards and dialogs you add with one command. |
| **React Router** | The doors between rooms | Makes the address bar change (`/progress`) and shows the right page. |
| **Firebase Authentication** | The security guard | Handles register, login and logout so you don't build it yourself. |
| **Cloud Firestore** | A cupboard on the internet | Stores each student's ticked topics, so they are still there tomorrow. |
| **Chart.js** | A chart drawer | Draws the bar chart for past-paper topics. |
| **Git and GitHub** | Save points and a shared folder | Lets you save versions and share code with your 2 teammates. |

### The only 5 new words you need

- **Component**: a small JavaScript function that returns a piece of HTML. Example: one checklist row.
- **Props**: information a parent hands to a component (like arguments of a function).
- **State**: a variable the page watches. When it changes, the screen updates by itself. (`useState`)
- **Route**: an address (like `/progress`) that shows one page.
- **JSX**: HTML written inside JavaScript. It is almost the same as HTML, except `class` becomes `className`.

If Claude uses a word you don't know, use the **"Explain it simply" prompt** at the end of this README.

---

## PART 1. How to use this README (the loop)

For every step, do exactly this:

1. **Copy** the prompt from the grey box and paste it into Claude.
2. Claude gives you files with a path like `src/pages/ProgressPage.jsx`. In VS Code, create each file at that path and paste the code.
3. In the terminal, run `npm run dev` and open the address it shows.
4. Look at **"You should see"**. If it matches, go on.
5. If it does not match, use the **"Fix an error" prompt** at the end.
6. Save your work: `git add .` then `git commit -m "short message"`.

Golden rules:

- Do **one step at a time**. Never start the next step until the current one works.
- Stay in the **same Claude chat**. If you must start a new chat, paste Prompt 0 again and paste your current files.
- Claude cannot see your computer. When a prompt says "paste your file", really paste it.
- Never put your `.env` file on GitHub. It holds your secret keys.

---

## PART 2. Install these first (one time)

- [ ] **Node.js LTS** from nodejs.org. Check: open a terminal, type `node -v`. You should see a version number.
- [ ] **VS Code** (your code editor).
- [ ] **Git**, and a **GitHub account**. Type `git --version` to check.
- [ ] **A Firebase project** at console.firebase.google.com (free "Spark" plan):
  - [ ] Build → Authentication → Get started → turn on **Email/Password**.
  - [ ] Build → Firestore Database → Create database → start in **test mode** (we fix security in Step 8).
  - [ ] Project settings (gear icon) → "Your apps" → click the **web icon `</>`** → register app → copy the config values. You'll use them in Step 3.
- [ ] **Google Drive**: one folder per Semester 3 course. Right-click → Share → "Anyone with the link" → **Viewer**. Copy each link.
- [ ] **Two test email addresses**, so you can test two different students.

---

## PART 3. What the folders are (simple version)

Everything you write lives inside `src/`. This is the whole map:

```
study-tracker/
├── .env                 your secret Firebase keys (NEVER upload this)
├── package.json         list of tools the project uses (Vite creates it)
└── src/
    ├── main.jsx         the starting point
    ├── App.jsx          the list of routes (which address shows which page)
    ├── index.css        styling basics
    ├── lib/             small helpers (the Firebase connection, date helpers)
    ├── data/            fixed data: your courses and topics (catalog.js)
    ├── context/         "who is logged in" shared by every page
    ├── components/      pieces used in many places (navbar, buttons)
    ├── pages/           one file per page: Login, Home, Progress, Resources, NotFound
    └── features/        the real work, one folder per teammate
        ├── progress/    YOU
        ├── home/        YOU
        ├── notes/       Member 2
        └── questions/   Member 3
```

Simple rule for where a new file goes:

- A whole page → `src/pages/`
- A piece used only by Progress → `src/features/progress/`
- Code that talks to Firestore → `src/features/<module>/<something>Service.js`
- Your fixed course/topic data → `src/data/`

Your app has **exactly 4 routes**: `/login`, `/`, `/progress`, `/resources`.
(Notes and Questions are two tabs inside `/resources`. The course limit is 2 to 4 routes.)

---

## PART 4. The steps and prompts

> Replace anything written in CAPITAL LETTERS and `[square brackets]` with your own information.
> If you don't know something, write "I don't know" in the prompt. Do not let Claude invent it.

---

### PROMPT 0: Project context (paste this FIRST, only once per chat)

```text
CONTEXT FOR THIS WHOLE PROJECT. Please remember it for every message.

I am building "Study Tracker" for my university course CSE-2340 (Software Development 1).
Tools: React + Vite, JavaScript (NOT TypeScript), Tailwind CSS, shadcn/ui, React Router, Firebase Authentication, Cloud Firestore, Chart.js, localStorage, and fetch() for a public API.

SCOPE: Semester 3, FINAL exam only. Keep the data shaped so other semesters and the Midterm can be added later.

THE APP HAS EXACTLY 4 ROUTES: /login, /, /progress, /resources.
(Notes and Questions are two tabs inside /resources: ?tab=notes and ?tab=questions.)
The navbar has 4 links: Home, Progress, Notes, Questions.

FOLDERS (use exactly these):
src/lib, src/data, src/context, src/components/layout, src/components/shared,
src/components/ui, src/pages, src/features/progress, src/features/home,
src/features/notes, src/features/questions, src/features/auth

FIRESTORE NAMES (use exactly these):
- users/{uid}                                  fields: displayName, email, createdAt
- users/{uid}/progress/{courseId}_final        fields: courseId, examType ("final"), completedTopicIds (array), completedOn (object: topicId -> "YYYY-MM-DD"), markedComplete (boolean), updatedAt
- exams/{courseId}_final                       fields: courseId, semester (3), examType ("final"), examDate (timestamp)
- questions/{id}                               fields: semester, courseId, examType, year, text, topicIds (array), solution (optional), isSample (boolean)
- notes/{noteId} and notes/{noteId}/votes/{uid}

ABOUT ME: I only know HTML, CSS and JavaScript. I do NOT know React, Vite, Firebase or how to organize folders.

RULES FOR EVERY ANSWER:
1. Explain every new idea in one or two simple sentences.
2. Give the exact path of every file and say NEW or MODIFIED.
3. Give COMPLETE files, not small pieces.
4. Never invent courses, topics, questions, solutions or statistics. Use clearly marked PLACEHOLDER text and tell me.
5. Change only what I ask. Do not rewrite files that already work.
6. After the code, tell me how to run it and what I should see.
7. Keep the code beginner-friendly. Avoid fancy tricks.

Reply only with: "Understood. Ready for Step 1."
```

---

### STEP 1: Create the project (no prompt needed)

Type these in a terminal, one line at a time:

```bash
npm create vite@latest study-tracker -- --template react
cd study-tracker
npm install
npm run dev
```

If it asks questions, choose **React** and **JavaScript**.

**You should see:** a page with the Vite and React logos at the address shown (usually http://localhost:5173).

**Save and put it on GitHub:**

```bash
git init
git add .
git commit -m "Create Vite React project"
```

Then create an empty repository on GitHub and run the two commands GitHub shows you (`git remote add ...` and `git push ...`).

---

### STEP 2: Foundation (styling, pages, navbar)

**What you are doing:** installing the helper tools and creating empty pages with a navbar. No real features yet.

**Prompt 1:**

```text
Do Step 2: Foundation. I already created the Vite + React (JavaScript) project and it runs.

1. Give me the exact terminal commands to install: Tailwind CSS, shadcn/ui (JavaScript, not TypeScript), react-router-dom, firebase, chart.js and react-chartjs-2. After each command, tell me in one line what it does.
2. Create these files (full code, path, NEW or MODIFIED): src/main.jsx, src/App.jsx, src/index.css, any config file change that shadcn needs, src/components/layout/AppLayout.jsx, src/components/layout/Navbar.jsx, src/pages/HomePage.jsx, src/pages/ProgressPage.jsx, src/pages/ResourcesPage.jsx, src/pages/LoginPage.jsx, src/pages/NotFoundPage.jsx.
3. Routes: /login -> LoginPage, / -> HomePage, /progress -> ProgressPage, /resources -> ResourcesPage, any other address -> NotFoundPage.
4. Navbar: four links: Home (/), Progress (/progress), Notes (/resources?tab=notes), Questions (/resources?tab=questions). Highlight the current link. It must look fine on a phone (no overflow).
5. Use at least one shadcn component (for example Button) in the navbar.
6. Each page shows only its title for now. Do NOT add login protection or any real features yet.
7. Use a clean, professional look: one main color, readable text, good spacing.
Finish by telling me how to run it and what I should see.
```

**You should see:**
- [ ] Clicking each navbar link changes the address **without reloading** the whole page.
- [ ] Typing a wrong address like `/abc` shows the Not Found page.
- [ ] Making the browser window narrow (phone size) still looks OK.
- [ ] No red errors in the browser console (press F12).

Save: `git add .` → `git commit -m "Add layout, router and empty pages"`

---

### STEP 3: Your Semester 3 data (the course list)

**What you are doing:** putting your real courses, final-exam topics and Drive links in one file. **Every part of the app reads this file**, so do it carefully.

Gather first (write "I don't know" if missing):
- Semester 3 course names and codes
- The topics for each course's final exam (from your syllabus)
- The Google Drive link for each course

**Prompt 2:**

```text
Create src/data/catalog.js for my Semester 3 final-exam data.

Use exactly this shape:
export const catalog = [
  { semester: 3, courses: [
      { id: "...", code: "...", name: "...", driveUrl: "...",
        finalTopics: [ { id: "...", title: "..." } ] }
  ] }
];

Rules:
- Make each course id lower-case with dashes, e.g. "sem3-datastructures". Make each topic id start with the course id, e.g. "sem3-datastructures-f01", "-f02" and so on.
- IDs must never change later, so choose them carefully.
- Use ONLY the information below. If something is missing write the text "PLACEHOLDER" and tell me which parts are placeholders.

MY DATA:
Course 1 name: ______   code: ______   Drive link: ______
Final topics: 1) ______  2) ______  3) ______ ...
Course 2 name: ______   code: ______   Drive link: ______
Final topics: 1) ______  2) ______ ...
(add all your courses)
```

**You should see:** Claude gives you one file. Save it as `src/data/catalog.js`.

**Check it:** in `src/App.jsx` temporarily add `import { catalog } from "./data/catalog"; console.log(catalog);` then press F12 in the browser → Console. You should see your courses. **Delete those two lines afterwards.**

Tell your teammates when this file is ready. They need it too.

Save: `git commit -m "Add Semester 3 catalog data"`

---

### STEP 4: Firebase connection and login

**What you are doing:** connecting to Firebase and adding register, login, logout, and "you must log in to see the pages".

**First, make your `.env` file** (in the project's main folder, next to `package.json`):

```text
VITE_FIREBASE_API_KEY=paste_here
VITE_FIREBASE_AUTH_DOMAIN=paste_here
VITE_FIREBASE_PROJECT_ID=paste_here
VITE_FIREBASE_STORAGE_BUCKET=paste_here
VITE_FIREBASE_MESSAGING_SENDER_ID=paste_here
VITE_FIREBASE_APP_ID=paste_here
```

Paste the values from the Firebase web app you registered in Part 2. The names **must** start with `VITE_`. Whenever you change `.env`, stop the server (Ctrl+C) and run `npm run dev` again. Check that `.env` appears in `.gitignore`.

**Prompt 3:**

```text
Do Step 4: Firebase connection and login.

Create or modify (full code, path, NEW or MODIFIED): .env.example (names only, empty values), src/lib/firebase.js, src/context/AuthContext.jsx, src/components/layout/ProtectedRoute.jsx, src/features/auth/LoginForm.jsx, src/features/auth/RegisterForm.jsx, src/pages/LoginPage.jsx, src/components/layout/Navbar.jsx, src/main.jsx, src/App.jsx.

Rules:
- ONE Firebase connection only, in src/lib/firebase.js, reading keys from import.meta.env (the VITE_ names).
- Use real Firebase Email/Password Authentication. No fake login.
- Register form: name, email, password (minimum 6 characters). Save the name on the user (updateProfile) and create a Firestore document users/{uid} with displayName, email, createdAt.
- Login form: email and password. Logout button in the navbar, with the student's name shown next to it.
- AuthContext gives every page: user, loading. While Firebase is still checking if someone is logged in, show a loading message (no flicker, no wrong redirect).
- Logged-out users who open /, /progress or /resources are sent to /login. Logged-in users who open /login are sent to /.
- Show readable error messages (wrong password, email already used, weak password) and a loading state on the buttons.
Finish with: how to test register, login, logout, and refreshing the page.
```

**You should see:**
- [ ] Register a new student → the student appears in the Firebase console under **Authentication → Users**.
- [ ] Refresh the page → you are still logged in.
- [ ] Logout → opening `/progress` sends you to `/login`.
- [ ] Wrong password → a clear error message.
- [ ] Your name shows in the navbar.

> Tell Member 3 this prompt builds the login forms too, so they don't build them twice. They can start on Questions.

Save: `git commit -m "Add Firebase authentication"`

---

### STEP 5: Progress page (YOUR main module). Six small prompts, A to F

Do A, test, save. Then B, test, save. And so on. Never skip ahead.

#### Prompt 4A: Show the courses

```text
Do Step 5, part A: course list.

On /progress, read the Semester 3 courses from src/data/catalog.js and show one card per course with: course name, course code, the text "0 of N topics" (N = number of final topics), and a progress bar at 0%. Clicking a card selects it (highlight the selected card). Show the heading "Semester 3 · Final exam". No semester selector.
Show an empty message if the catalog has no courses.
Create files under src/features/progress/ (for example ProgressView.jsx and CourseCard.jsx) and modify src/pages/ProgressPage.jsx to use them. Use shadcn Card where it fits.
```

**You should see:** a card for each course; clicking one highlights it.

#### Prompt 4B: The topic checklist (no saving yet)

```text
Do Step 5, part B: topic checklist.

When a course is selected, show its finalTopics, each with a checkbox. Keep the ticked topic ids in React state (useState). Ticking or unticking updates the screen immediately: the "X of Y topics" text and the progress bar of that course change at once. Do NOT use Firestore yet. Create src/features/progress/TopicChecklist.jsx and modify the files from part A.
Use real <label> and <input type="checkbox"> so it works with the keyboard.
```

**You should see:** ticking boxes changes the counts and the bar. (Refreshing will lose it. That's fine for now.)

#### Prompt 4C: Save to Firestore (automatic saving)

```text
Do Step 5, part C: save and load from Firestore.

When the student ticks or unticks a topic, save it automatically to users/{uid}/progress/{courseId}_final with these fields: courseId, examType: "final", completedTopicIds (array), completedOn (object mapping topicId to today's local date "YYYY-MM-DD"), markedComplete (boolean, default false), updatedAt (serverTimestamp).
- Use setDoc with merge.
- Wait about 500 ms after the last tick before writing (so we don't write on every single click).
- When the page opens, and after login, load the saved data and show it.
- When a topic is unticked, remove it from completedTopicIds and from completedOn.
Create src/features/progress/progressService.js (functions loadProgress(uid, courseId) and saveProgress(uid, courseId, data)) and src/lib/dates.js (a function todayKey() that returns the LOCAL date as "YYYY-MM-DD"). Modify the progress components.
Show loading and error messages. Each student must only ever see their own progress.
```

**You should see:**
- [ ] Tick 3 topics, refresh the page → they are still ticked.
- [ ] In the Firebase console → Firestore → `users` → your id → `progress` → a document appears.
- [ ] Log in with your **second** test account → its progress is empty (separate students!).

#### Prompt 4D: The 99% rule

```text
Do Step 5, part D: progress bar rule.

percent = completed topics ÷ total topics × 100, rounded.
While markedComplete is false, the bar and the number must never show more than 99%.
Add a button "Mark course complete" that sets markedComplete to true (and saves it). Only then show 100%. Add a way to undo it ("Reopen course").
When ALL topics are ticked but the course is not marked complete, show the message: "All topics done! Press Mark course complete to finish."
Put the calculation in one small function calculatePercent(done, total, markedComplete) inside src/features/progress/progressUtils.js and use it everywhere. Explain how it works line by line.
```

**You should see:** tick every topic → the bar stops at 99% and the message appears; press the button → 100%.

#### Prompt 4E: Daily activity helper (for the Home page later)

```text
Do Step 5, part E: today's activity.

In src/features/progress/progressService.js add a function getTodayCompletedCount(uid) that reads all documents in users/{uid}/progress and counts how many entries in completedOn have today's local date (use todayKey() from src/lib/dates.js). It returns a number. Explain how to test it.
```

**You should see:** a way to test (Claude will explain). Home will use it in Step 7.

#### Prompt 4F: The chart (do this LAST, after Member 3 has some questions saved)

```text
Do Step 5, part F: past-paper chart with Chart.js (react-chartjs-2).

Read the Firestore collection "questions". For the selected course and examType "final", count how many questions mention each topicId in their topicIds array. Show the top 8 topics as a horizontal bar chart. Use the topic titles from src/data/catalog.js as labels.
If there are no questions yet, show the text "No past-paper data yet" and do NOT invent numbers. If the questions are samples (isSample is true) write "Sample data" under the chart.
Create src/features/progress/TopicFrequencyChart.jsx and show it on the Progress page. Make it responsive.
```

**You should see:** a bar chart, or the "No past-paper data yet" message if there is no data.

Save after each part: `git commit -m "Progress: part C autosave"` (change the message each time).

---

### STEP 6: Exam dates (for the Home countdown)

**First, in the Firebase console** (Firestore → Start collection):
1. Collection ID: `exams`
2. Document ID: your course id plus `_final`, for example `sem3-datastructures_final`
3. Fields: `courseId` (string), `semester` (number: 3), `examType` (string: `final`), `examDate` (type: **timestamp**, pick the real date)
4. Make one document per course.

> I don't know your real exam dates. Use the real ones from your university notice. Don't guess.

**Prompt 5:**

```text
Do Step 6: exam dates.

I created a Firestore collection "exams". Each document has: courseId, semester, examType, examDate (a Firestore timestamp).
Create src/features/progress/examService.js with:
1. getNextExam(): reads all exam documents, ignores any exam whose date is already in the past, and returns the nearest future exam as { courseId, courseName (looked up in src/data/catalog.js), semester, examType, examDate (a normal JS Date) }. Return null if there is none.
2. getTimeLeft(date): returns { days, hours, minutes } until that date.
Explain each function line by line, and how I can test it with one past date and one future date.
```

**You should see:** (Claude will explain the test) a past exam is ignored; the nearest future one is returned.

Save: `git commit -m "Add exam dates service"`

---

### STEP 7: Home dashboard

> Do this after Member 2 has the Notes "AddNoteDialog" ready. If it isn't ready yet, make the "Quick add note" button simply link to `/resources?tab=notes`.

**Prompt 6:**

```text
Do Step 7: Home dashboard on the "/" page. Create files under src/features/home/ and modify src/pages/HomePage.jsx. Also create src/data/fallbackQuotes.js.

1. Greeting: "Good morning/afternoon/evening, <name>" using the logged-in student's name (from AuthContext) and the student's local time.
2. Exam countdown: use getNextExam() and getTimeLeft() from src/features/progress/examService.js. Show course name, "Final", and days/hours/minutes left. Update every second using setInterval inside useEffect, and clear the timer when the page closes. Never show an exam that is already over. If there is none, show "No upcoming exam".
3. Completed today: use getTodayCompletedCount(uid) and show "N topics completed today". Do not copy or store progress data again.
4. Quick add note button: link to /resources?tab=notes (I may connect it to a dialog later).
5. Daily quote: fetch from a free public quote API that works from a browser (tell me which one and why), using async/await. Show a loading state, an error state, and a fallback quote from fallbackQuotes.js if the API fails. Save today's quote in localStorage under a key with today's date, so it only loads once per day.
Make the page responsive and use shadcn Card for the boxes.
Finish with how to test: including what happens when I turn off the Wi-Fi.
```

**You should see:**
- [ ] Greeting with your name.
- [ ] A countdown that changes every second.
- [ ] Tick a topic in Progress, come back to Home → the "completed today" number changes.
- [ ] Turn off Wi-Fi, refresh → a fallback quote still shows.

Save: `git commit -m "Add Home dashboard"`

---

### STEP 8: Security rules and full test

**What you are doing:** making sure students can only see and change what they should, then testing everything.

**Prompt 7:**

```text
Do Step 8: Firestore security rules and an integration review.

Write the complete Firestore security rules text (firestore.rules) with these rules:
- users/{uid} and users/{uid}/progress/{doc}: only that signed-in student can read and write.
- exams: any signed-in student can read; nobody can write from the app.
- questions: any signed-in student can read; nobody can write from the app.
- notes: any signed-in student can read; nobody can write from the app, except that the voteCount may change by exactly 1 together with a new vote document.
- notes/{noteId}/votes/{uid}: any signed-in student can read; a student can only CREATE a vote when the document id equals their own uid; no updating or deleting.
Explain each rule in simple words, tell me where to paste it in the Firebase console, and how to try it in the Rules Playground.

Then give me a test checklist I can follow with two accounts: login/logout, protected pages, saved progress per student, 99% bar rule, countdown, notes voting once per student, question filters, quote fallback, phone width, and keyboard-only use.
```

**You should see:** every item of the checklist passes. Fix anything that fails with the "Fix an error" prompt.

---

### STEP 9: Put it online and write the README

**Prompt 8:**

```text
Do Step 9: deployment and documentation. Use Firebase Hosting (free).

1. Give me the exact commands and answers to give to "firebase init hosting" (public directory dist, single-page app: yes). Explain why the single-page answer matters for my routes.
2. Tell me how to build (npm run build) and deploy.
3. Tell me how to make Authentication work on the live address (authorized domains).
4. Explain what is safe and what is NOT safe to publish (.env, Firebase keys).
5. Write a README.md for GitHub with: project title, problem statement, description, main features, technology list, what each of the 3 members built, the 4 routes, install and run instructions, Firebase setup, a "Live URL" placeholder, and a "Screenshots" section placeholder.
6. Give me a final submission checklist (GitHub link, ZIP, live link, README, screenshots, working login, saved data, each member's commits).
Do not say anything is deployed or tested unless I tell you it worked.
```

**Before you say "done":** open the live address, register a new account, tick a topic, refresh, and check it is still there.

---

## PART 5. Rescue prompts

### "Fix an error" prompt (use whenever something breaks)

```text
I got this error while testing:

[PASTE THE FULL ERROR TEXT HERE. From the terminal, or from the browser console (press F12).]

This is the file Claude told me to make (or the one named in the error):

[PASTE THE FULL CODE OF THAT FILE HERE]

Please:
1. Tell me in simple words what the error means.
2. Tell me exactly which file and which line is the problem.
3. Give me the smallest fix. Do not rewrite the whole file or change anything unrelated.
4. Tell me how to check it is fixed.
```

### "Explain it simply" prompt (use when you don't understand a file)

```text
I don't understand this file. Explain it like I only know HTML, CSS and JavaScript.
Go through it line by line. Compare each new idea (component, props, state, useEffect, import/export) to something I already know from plain JavaScript.

[PASTE THE FILE HERE]
```

### Common problems

| What you see | Usual reason | Fix |
| --- | --- | --- |
| Blank white page | A typo in a file name or import | Press F12, read the red message, open the file it names |
| "Failed to resolve import" | Wrong file path or wrong capital letters | Match the file name and capitals exactly |
| `auth/invalid-api-key` | `.env` names don't start with `VITE_`, or you didn't restart | Fix the names, press Ctrl+C, run `npm run dev` again |
| "Missing or insufficient permissions" | A Firestore rule blocks it, or you aren't logged in | Check you are logged in, then check the rule for that path |
| Styles don't appear | Tailwind not set up, or the server needs a restart | Restart `npm run dev`; ask Claude to check `index.css` |
| Checkbox doesn't update | The state was changed directly | Use the Fix prompt and say "the checkbox does not update" |
| The page is 404 after a refresh on the live site | Hosting needs the single-page setting | Redo `firebase init hosting` and answer **Yes** to single-page app |

---

## PART 6. What your teammates do

- **Member 2 (Notes):** uses PDF Prompt 6. Tell them: Semester 3 only, each course opens its Drive link, Submit Notes opens the admin's Gmail or Telegram link (never a bot token in the code), and one vote per student with the vote document id equal to the student's uid.
- **Member 3 (Questions):** uses PDF Prompt 7. Tell them: Semester 3 and Final only, each question has `topicIds` matching your catalog ids, no invented questions (mark samples with `isSample: true`).
- Everyone works on their own branch (`feature/progress`, `feature/notes`, `feature/questions`) and opens a Pull Request on GitHub. Only you edit `App.jsx` and `catalog.js`.

---

## PART 7. Quick progress checklist (tick as you go)

- [ ] Step 1: project runs
- [ ] Step 2: pages and navbar work
- [ ] Step 3: catalog.js has my real courses
- [ ] Step 4: register / login / logout work
- [ ] Step 5A–5F: Progress page complete
- [ ] Step 6: exam dates in Firestore
- [ ] Step 7: Home dashboard
- [ ] Step 8: security rules and full test
- [ ] Step 9: live on the internet and README written

**Missing information (nothing has been invented):** your Semester 3 course list, final-exam topics, exam dates, past-paper questions and solutions, Drive links, and the admin Gmail/Telegram are **"Not found in the provided materials"**. You supply them in Steps 3 and 6.