/* =========================================================
   Batch Hub - App logic (hash routing, works on file:// and
   on GitHub Pages without any server setup)
   ========================================================= */
(function () {
  "use strict";

  var app = document.getElementById("app");
  var nav = document.getElementById("mainNav");
  var toggle = document.getElementById("menuToggle");

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function find(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function filesFor(sem, course, exam, section) {
    return FILES[[sem, course, exam, section].join("/")] || [];
  }
  function countFiles(prefix) {
    var total = 0;
    Object.keys(FILES).forEach(function (k) {
      if (k === prefix || k.indexOf(prefix + "/") === 0) total += FILES[k].length;
    });
    return total;
  }
  function countLabel(n) {
    return '<span class="count">' + n + (n === 1 ? " file" : " files") + "</span>";
  }
  function crumbs(items) {
    var html = items.map(function (it, i) {
      var last = i === items.length - 1;
      return !last && it.href
        ? '<a href="' + it.href + '">' + esc(it.label) + "</a>"
        : "<span>" + esc(it.label) + "</span>";
    }).join("<i>›</i>");
    return '<nav class="crumbs" aria-label="Breadcrumb">' + html + "</nav>";
  }
  function card(href, icon, title, desc, count) {
    return '<a class="card" href="' + href + '">' +
      '<div class="ico">' + icon + "</div>" +
      "<h3>" + esc(title) + "</h3>" +
      (desc ? "<p>" + esc(desc) + "</p>" : "") +
      (count === undefined ? "" : countLabel(count)) +
      "</a>";
  }
  function notFound() {
    return {
      title: "Page not found",
      html: '<div class="page"><div class="empty"><div class="ico">🧭</div><h3>Page not found</h3>' +
            '<p>This page does not exist. <a href="#/" style="color:var(--teal-dark);font-weight:600">Go home</a></p></div></div>'
    };
  }

  /* ---------- pages ---------- */
  function pageHome() {
    return {
      title: SITE.name,
      html:
        '<div class="page">' +
        '<section class="hero">' +
          "<h1>" + esc(SITE.name) + "</h1>" +
          '<p class="tagline">' + esc(SITE.tagline) + "</p>" +
          "<p>" + esc(SITE.description) + "</p>" +
          '<a class="btn" href="#/university">University</a>' +
        "</section>" +
        '<section class="features">' +
          '<div class="feature"><div class="ico">✅</div><h3>Previous Solve</h3><p>Solved papers to check your answers.</p></div>' +
          '<div class="feature"><div class="ico">📝</div><h3>Previous Question</h3><p>Past question papers by exam.</p></div>' +
          '<div class="feature"><div class="ico">📒</div><h3>Notes</h3><p>Class notes for every course.</p></div>' +
          '<div class="feature"><div class="ico">💡</div><h3>Suggestion</h3><p>Important topics before exams.</p></div>' +
        "</section></div>"
    };
  }

  function pageAbout() {
    var paras = SITE.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    return {
      title: "About",
      html: '<div class="page">' + crumbs([{ label: "Home", href: "#/" }, { label: "About" }]) +
            '<h1 class="page-title">About us</h1><p class="page-sub">Know more about our batch</p>' +
            '<div class="panel">' + paras + "</div></div>"
    };
  }

  function pageContact() {
    var rows = SITE.contacts.map(function (c) {
      return '<div class="contact-row"><span class="label">' + esc(c.label) + "</span>" +
             '<a href="' + esc(c.href) + '" target="_blank" rel="noopener">' + esc(c.text) + "</a></div>";
    }).join("");
    return {
      title: "Contact",
      html: '<div class="page">' + crumbs([{ label: "Home", href: "#/" }, { label: "Contact" }]) +
            '<h1 class="page-title">Contact</h1><p class="page-sub">Reach out to us</p>' +
            '<div class="panel">' + rows + "</div></div>"
    };
  }

  function pageUniversity() {
    var cards = SEMESTERS.map(function (s) {
      return card("#/university/" + s.id, "🎓", s.name, s.courses.length + " courses", countFiles(s.id));
    }).join("");
    return {
      title: "University",
      html: '<div class="page">' + crumbs([{ label: "Home", href: "#/" }, { label: "University" }]) +
            '<h1 class="page-title">University</h1><p class="page-sub">Choose your semester</p>' +
            '<div class="grid">' + cards + "</div></div>"
    };
  }

  function pageSemester(semId) {
    var sem = find(SEMESTERS, semId);
    if (!sem) return notFound();
    var cards = sem.courses.map(function (c) {
      return card("#/university/" + sem.id + "/" + c.id, "📚", c.name, c.full, countFiles(sem.id + "/" + c.id));
    }).join("");
    return {
      title: sem.name,
      html: '<div class="page">' +
            crumbs([{ label: "Home", href: "#/" }, { label: "University", href: "#/university" }, { label: sem.name }]) +
            '<h1 class="page-title">' + esc(sem.name) + '</h1><p class="page-sub">Choose a course</p>' +
            '<div class="grid">' + cards + "</div></div>"
    };
  }

  function pageCourse(semId, courseId) {
    var sem = find(SEMESTERS, semId);
    var course = sem && find(sem.courses, courseId);
    if (!course) return notFound();
    var base = "#/university/" + sem.id + "/" + course.id;
    var cards = EXAMS.map(function (e) {
      return card(base + "/" + e.id, e.icon, e.name, e.desc, countFiles(sem.id + "/" + course.id + "/" + e.id));
    }).join("");
    return {
      title: course.name,
      html: '<div class="page">' +
            crumbs([{ label: "Home", href: "#/" }, { label: "University", href: "#/university" },
                    { label: sem.name, href: "#/university/" + sem.id }, { label: course.name }]) +
            '<h1 class="page-title">' + esc(course.name) + '</h1><p class="page-sub">' + esc(course.full) + " — choose Mid or Final</p>" +
            '<div class="grid">' + cards + "</div></div>"
    };
  }

  function pageExam(semId, courseId, examId) {
    var sem = find(SEMESTERS, semId);
    var course = sem && find(sem.courses, courseId);
    var exam = find(EXAMS, examId);
    if (!course || !exam) return notFound();
    var base = "#/university/" + sem.id + "/" + course.id + "/" + exam.id;
    var cards = SECTIONS.map(function (s) {
      return card(base + "/" + s.id, s.icon, s.name, s.desc, filesFor(sem.id, course.id, exam.id, s.id).length);
    }).join("");
    return {
      title: course.name + " " + exam.name,
      html: '<div class="page">' +
            crumbs([{ label: "Home", href: "#/" }, { label: "University", href: "#/university" },
                    { label: sem.name, href: "#/university/" + sem.id },
                    { label: course.name, href: "#/university/" + sem.id + "/" + course.id }, { label: exam.name }]) +
            '<h1 class="page-title">' + esc(course.name) + " — " + esc(exam.name) + '</h1><p class="page-sub">Choose a section</p>' +
            '<div class="grid">' + cards + "</div></div>"
    };
  }

  function pageSection(semId, courseId, examId, secId) {
    var sem = find(SEMESTERS, semId);
    var course = sem && find(sem.courses, courseId);
    var exam = find(EXAMS, examId);
    var sec = find(SECTIONS, secId);
    if (!course || !exam || !sec) return notFound();

    var files = filesFor(sem.id, course.id, exam.id, sec.id);
    var body;
    if (files.length === 0) {
      body = '<div class="empty"><div class="ico">📭</div><h3>Coming soon</h3>' +
             "<p>No files uploaded here yet. Check back later.</p></div>";
    } else {
      body = '<div class="file-list">' + files.map(function (f) {
        var url = encodeURI(f.file);
        return '<div class="file-item"><div class="ico">📄</div>' +
          '<div class="info"><div class="name">' + esc(f.title) + "</div>" +
          (f.note ? '<div class="meta">' + esc(f.note) + "</div>" : "") + "</div>" +
          '<div class="file-actions">' +
            '<a class="small-btn fill" href="' + url + '" target="_blank" rel="noopener">Open</a>' +
            '<a class="small-btn" href="' + url + '" download>Download</a>' +
          "</div></div>";
      }).join("") + "</div>";
    }

    var courseHref = "#/university/" + sem.id + "/" + course.id;
    return {
      title: course.name + " " + exam.name + " - " + sec.name,
      html: '<div class="page">' +
            crumbs([{ label: "Home", href: "#/" }, { label: "University", href: "#/university" },
                    { label: sem.name, href: "#/university/" + sem.id },
                    { label: course.name, href: courseHref },
                    { label: exam.name, href: courseHref + "/" + exam.id }, { label: sec.name }]) +
            '<h1 class="page-title">' + esc(sec.icon + " " + sec.name) + '</h1>' +
            '<p class="page-sub">' + esc(sem.name + " · " + course.name + " · " + exam.name) + "</p>" +
            body + "</div>"
    };
  }

  /* ---------- router ---------- */
  function route() {
    var hash = location.hash.replace(/^#\/?/, "").replace(/\/+$/, "");
    var p = hash === "" ? [] : hash.split("/").map(decodeURIComponent);
    var page, active = "";

    if (p.length === 0)                     { page = pageHome();    active = "home"; }
    else if (p[0] === "about")              { page = pageAbout();   active = "about"; }
    else if (p[0] === "contact")            { page = pageContact(); active = "contact"; }
    else if (p[0] === "university") {
      if (p.length === 1)       page = pageUniversity();
      else if (p.length === 2)  page = pageSemester(p[1]);
      else if (p.length === 3)  page = pageCourse(p[1], p[2]);
      else if (p.length === 4)  page = pageExam(p[1], p[2], p[3]);
      else if (p.length === 5)  page = pageSection(p[1], p[2], p[3], p[4]);
      else                      page = notFound();
    } else page = notFound();

    app.innerHTML = page.html;
    document.title = page.title === SITE.name ? SITE.name : page.title + " | " + SITE.name;

    Array.prototype.forEach.call(nav.querySelectorAll("a"), function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === active);
    });

    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
  }

  /* ---------- init ---------- */
  document.getElementById("siteTitle").textContent = SITE.name;
  document.getElementById("footerText").textContent = SITE.footer;

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  window.addEventListener("hashchange", route);
  route();
})();
