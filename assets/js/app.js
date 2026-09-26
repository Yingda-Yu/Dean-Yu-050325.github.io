/**
 * Main Application Logic — V3 Editorial
 * Renders content from I18N data, handles language switching,
 * navigation, section reveals, and publication rendering.
 */
(function () {
  "use strict";

  var I18N = window.I18N;
  var SHARED = window.SHARED;
  var PUBS = window.PUBS || { data: [], featuredIds: [] };
  if (!I18N || !SHARED) return;

  var currentLang = window.DEFAULT_LANG || "en";

  /* --------------------------------------------------------------------
     SVG Icons
     -------------------------------------------------------------------- */

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg>',
    orcid: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM7.5 5.25a.75.75 0 110 1.5.75.75 0 010-1.5zM6.75 7.5h1.5v9h-1.5v-9zm3 0h4.5a4.5 4.5 0 010 9h-4.5v-9zm1.5 1.5v6h3a3 3 0 000-6h-3z"/></svg>',
    dblp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;vertical-align:-2px"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
  };

  /* --------------------------------------------------------------------
     Helpers
     -------------------------------------------------------------------- */

  function D() { return I18N[currentLang]; }

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function escapeAttr(s) {
    if (!s) return "";
    return s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function getLinkIcon(key) {
    return ICONS[key] || "";
  }

  /* --------------------------------------------------------------------
     Render: Hero (editorial — photo left, copy right)
     -------------------------------------------------------------------- */

  function renderHero() {
    var d = D();

    document.getElementById("hero-eyebrow").textContent = d.profile.eyebrow;

    var nameEl = document.getElementById("hero-name");
    nameEl.innerHTML = d.profile.name;

    document.getElementById("hero-statement").textContent = d.profile.statement;
    document.getElementById("hero-description").textContent = d.profile.description;

    var cta = document.getElementById("hero-cta");
    clear(cta);
    var primary = el("a", "btn btn-primary",
      d.heroCTA.primary + " " + ICONS.arrow);
    primary.href = "#publications";
    cta.appendChild(primary);

    var secondary = el("a", "btn btn-secondary", d.heroCTA.secondary);
    secondary.href = "#about";
    cta.appendChild(secondary);

    var companyLink = document.getElementById("hero-company-link");
    if (SHARED.company.url) {
      companyLink.innerHTML =
        d.company.heroText + ' &mdash; <a href="' + escapeAttr(SHARED.company.url) +
        '" target="_blank" rel="noopener">' + d.company.name + ' &#8599;</a>';
    } else {
      companyLink.innerHTML = d.company.heroText + ' &mdash; <span>' + d.company.name + "</span>";
    }

    var photo = document.getElementById("hero-photo");
    if (SHARED.company.photo && photo) photo.src = SHARED.company.photo;
  }

  /* --------------------------------------------------------------------
     Render: Latest Updates
     -------------------------------------------------------------------- */

  function renderUpdates() {
    var d = D();
    document.getElementById("label-updates").textContent = d.sections.updates;
    document.getElementById("heading-updates").textContent = d.headings.updates;

    var list = document.getElementById("updates-list");
    if (!list || !d.latestUpdates) return;
    clear(list);

    d.latestUpdates.forEach(function (item) {
      var row = el("div", "update-item");
      row.innerHTML =
        '<div class="update-date">' + item.date + "</div>" +
        '<div class="update-text">' + item.text + "</div>";
      list.appendChild(row);
    });
  }

  /* --------------------------------------------------------------------
     Render: Publications (homepage selected)
     -------------------------------------------------------------------- */

  function highlightAuthor(authorStr) {
    var selfNames = ["Yingda Yu", "Yu, Yingda"];
    var result = authorStr;
    selfNames.forEach(function (name) {
      var re = new RegExp("(" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "g");
      result = result.replace(re, '<span class="author-self">$1</span>');
    });
    return result;
  }

  function statusBadgeClass(status) {
    return "status-badge status-" + (status || "preprint");
  }

  function renderPubRow(pub) {
    var d = D();
    var row = el("article", "pub-row");

    var labels = d.statusLabels || {};
    var presLabels = d.presentationLabels || {};
    var statusLabel = labels[pub.status] || pub.status;
    var presLabel = pub.presentation ? (presLabels[pub.presentation] || pub.presentation) : null;

    var html = '<div class="pub-year">' + (pub.year || "") + "</div>";
    html += '<div class="pub-body">';
    html += '<h3 class="pub-title">' + pub.title + "</h3>";

    if (pub.authors) {
      html += '<p class="pub-authors">' + highlightAuthor(pub.authors) + "</p>";
    }

    var venueText = "";
    if (pub.venue && pub.venue.short) venueText += pub.venue.short;
    if (pub.year) venueText += (venueText ? " \u00b7 " : "") + pub.year;
    if (pub.venue && pub.venue.location) venueText += " \u00b7 " + pub.venue.location;
    if (venueText) {
      html += '<p class="pub-venue">' + venueText + "</p>";
    }

    var badges = "";
    badges += '<span class="' + statusBadgeClass(pub.status) + '">' + statusLabel + "</span>";
    if (presLabel) {
      badges += '<span class="pres-badge">' + presLabel + "</span>";
    }
    html += '<div class="pub-badges">' + badges + "</div>";

    var links = [];
    if (pub.links && pub.links.paper) {
      links.push('<a href="' + escapeAttr(pub.links.paper) + '" target="_blank" rel="noopener">Paper &#8599;</a>');
    }
    if (pub.links && pub.links.arxiv) {
      links.push('<a href="' + escapeAttr(pub.links.arxiv) + '" target="_blank" rel="noopener">arXiv &#8599;</a>');
    }
    if (pub.links && pub.links.doi) {
      links.push('<a href="https://doi.org/' + escapeAttr(pub.links.doi) + '" target="_blank" rel="noopener">DOI &#8599;</a>');
    }
    if (pub.links && pub.links.code) {
      links.push('<a href="' + escapeAttr(pub.links.code) + '" target="_blank" rel="noopener">Code &#8599;</a>');
    }
    if (links.length) {
      html += '<div class="pub-links">' + links.join("") + "</div>";
    }

    html += "</div>";
    row.innerHTML = html;
    return row;
  }

  function renderPublicationsHome() {
    var d = D();
    var list = document.getElementById("pub-list");
    if (!list) return;

    document.getElementById("label-publications").textContent = d.sections.publications;
    document.getElementById("heading-publications").textContent = d.headings.publications;

    clear(list);

    var pubs = [];
    if (PUBS && PUBS.featuredIds && PUBS.data) {
      PUBS.featuredIds.forEach(function (id) {
        var p = PUBS.data.find(function (x) { return x.id === id; });
        if (p) pubs.push(p);
      });
    }

    if (pubs.length === 0) {
      list.innerHTML = '<p style="color:var(--text-tertiary);font-style:italic;">Loading publications\u2026</p>';
    } else {
      pubs.forEach(function (pub) {
        list.appendChild(renderPubRow(pub));
      });
    }

    var viewAll = document.getElementById("pub-view-all");
    if (viewAll) {
      viewAll.textContent = d.viewAllPublications + " \u2192";
    }
  }

  /* --------------------------------------------------------------------
     Render: Research Interests
     -------------------------------------------------------------------- */

  function renderResearchInterests() {
    var d = D();
    document.getElementById("label-research").textContent = d.sections.research;
    document.getElementById("heading-research").textContent = d.headings.research;

    var grid = document.getElementById("research-interests");
    if (!grid || !d.researchInterests) return;
    clear(grid);

    d.researchInterests.forEach(function (item, i) {
      var num = String(i + 1).padStart(2, "0");
      var div = el("div", "interest-item");
      div.innerHTML =
        '<div class="interest-number">' + num + "</div>" +
        '<h3 class="interest-title">' + item.title + "</h3>" +
        '<p class="interest-detail">' + item.detail + "</p>";
      grid.appendChild(div);
    });
  }

  /* --------------------------------------------------------------------
     Render: Selected Builds
     -------------------------------------------------------------------- */

  function renderBuilds() {
    var d = D();

    document.getElementById("label-builds").textContent = d.sections.builds;
    document.getElementById("heading-builds").textContent = d.headings.builds;
    document.getElementById("builds-projects-label").textContent = d.workLabels.projects;
    document.getElementById("builds-venture-label").textContent = d.workLabels.venture;

    /* Projects */
    var list = document.getElementById("builds-list");
    if (list) {
      clear(list);
      d.builds.forEach(function (p, i) {
        var num = String(i + 1).padStart(2, "0");
        var item = el("div", "build-item");

        if (p.url) {
          item.style.cursor = "pointer";
          item.addEventListener("click", function () {
            window.open(p.url, "_blank");
          });
        }

        var meta = [p.category, p.role, p.year].filter(Boolean).join(" \u00b7 ");

        item.innerHTML =
          '<div class="build-number">' + num + "</div>" +
          '<div class="build-body">' +
          '<h3 class="build-title">' + p.name + "</h3>" +
          '<p class="build-problem"><strong>Problem.</strong> ' + p.problem + "</p>" +
          '<p class="build-built"><strong>Built.</strong> ' + p.built + "</p>" +
          '<p class="build-meta">' + meta + "</p>" +
          "</div>";

        list.appendChild(item);
      });
    }

    /* Venture */
    var narrative = document.getElementById("venture-narrative");
    if (narrative) narrative.innerHTML = d.company.description;

    var areas = document.getElementById("venture-areas");
    if (areas) {
      clear(areas);
      d.company.areas.forEach(function (area) {
        var div = el("div", "venture-area");
        div.innerHTML =
          "<h4>" + area.name + "</h4>" +
          "<p>" + area.desc + "</p>";
        areas.appendChild(div);
      });
    }

    var linkContainer = document.getElementById("venture-link-container");
    if (linkContainer) {
      if (SHARED.company.url) {
        linkContainer.innerHTML =
          '<a class="venture-link" href="' + escapeAttr(SHARED.company.url) + '" target="_blank" rel="noopener">' +
          d.company.visitLink + ' <span class="arrow">&#8594;</span></a>';
      } else {
        linkContainer.innerHTML =
          '<span class="venture-link disabled">' +
          d.company.linkComingSoon + "</span>";
      }
    }
  }

  /* --------------------------------------------------------------------
     Render: About & Journey (combined)
     -------------------------------------------------------------------- */

  function renderAbout() {
    var d = D();

    document.getElementById("label-about").textContent = d.sections.about;
    document.getElementById("heading-about").textContent = d.headings.about;

    var aboutText = document.getElementById("about-text");
    if (aboutText) {
      clear(aboutText);
      d.about.forEach(function (para) {
        aboutText.appendChild(el("p", null, para));
      });
    }

    /* Journey timeline */
    var timeline = document.getElementById("timeline");
    if (timeline) {
      clear(timeline);
      d.journey.forEach(function (item) {
        var div = el("div", "timeline-item");
        div.innerHTML =
          '<div class="timeline-year">' + item.year + "</div>" +
          '<div class="timeline-content">' +
          '<div class="timeline-title">' + item.title + "</div>" +
          '<div class="timeline-org">' + item.org + "</div>" +
          (item.detail ? '<div class="timeline-detail">' + item.detail + "</div>" : "") +
          "</div>";
        timeline.appendChild(div);
      });
    }
  }

  /* --------------------------------------------------------------------
     Render: Navigation
     -------------------------------------------------------------------- */

  function renderNav() {
    var d = D();
    var navLinks = document.getElementById("nav-links");
    var mobileMenu = document.getElementById("mobile-menu");

    clear(navLinks);
    clear(mobileMenu);

    d.nav.forEach(function (item) {
      var a = el("a", null, item.label);
      a.href = item.href;
      navLinks.appendChild(a);

      var ma = el("a", null, item.label);
      ma.href = item.href;
      mobileMenu.appendChild(ma);
    });
  }

  /* --------------------------------------------------------------------
     Render: Side Social (desktop)
     -------------------------------------------------------------------- */

  function renderSideSocial() {
    var d = D();
    var sideSocial = document.getElementById("side-social");
    var sideEmail = document.getElementById("side-email");

    clear(sideSocial);
    clear(sideEmail);

    SHARED.sideSocialOrder.forEach(function (key) {
      var link = d.links[key];
      if (!link || !link.url) return;
      var a = el("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", link.label);
      a.innerHTML = getLinkIcon(key);
      sideSocial.appendChild(a);
    });

    if (d.profile.email) {
      var ea = el("a");
      ea.href = "mailto:" + d.profile.email;
      ea.textContent = d.profile.email;
      sideEmail.appendChild(ea);
    }
  }

  /* --------------------------------------------------------------------
     Render: Contact
     -------------------------------------------------------------------- */

  function renderContact() {
    var d = D();

    document.getElementById("contact-heading").textContent = d.headings.contact;
    document.getElementById("contact-sub").textContent = d.headings.contactSub;

    var emailBtn = document.getElementById("contact-email");
    emailBtn.href = "mailto:" + d.profile.email;
    emailBtn.innerHTML = ICONS.email + " " + d.headings.contactBtn;

    var socials = document.getElementById("contact-socials");
    clear(socials);

    SHARED.socialOrder.forEach(function (key) {
      var link = d.links[key];
      if (!link || !link.url) return;
      var a = el("a");
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = getLinkIcon(key) + " " + link.label + " &#8599;";
      socials.appendChild(a);
    });
  }

  /* --------------------------------------------------------------------
     Render: Footer
     -------------------------------------------------------------------- */

  function renderFooter() {
    document.getElementById("footer-text").textContent = D().footer;
  }

  /* --------------------------------------------------------------------
     Language Toggle
     -------------------------------------------------------------------- */

  function updateLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    var enSpan = btn.querySelector(".lang-en");
    var zhSpan = btn.querySelector(".lang-zh");
    if (currentLang === "en") {
      enSpan.classList.add("lang-active");
      zhSpan.classList.remove("lang-active");
    } else {
      enSpan.classList.remove("lang-active");
      zhSpan.classList.add("lang-active");
    }
  }

  function switchLang(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    try { localStorage.setItem("site-lang", lang); } catch (e) { }
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    renderAll();
  }

  function initLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      switchLang(currentLang === "en" ? "zh" : "en");
    });
  }

  /* --------------------------------------------------------------------
     Render All
     -------------------------------------------------------------------- */

  function renderAll() {
    renderHero();
    renderNav();
    renderUpdates();
    renderPublicationsHome();
    renderResearchInterests();
    renderBuilds();
    renderAbout();
    renderSideSocial();
    renderContact();
    renderFooter();
    updateLangToggle();
  }

  /* --------------------------------------------------------------------
     Interactions: Navigation
     -------------------------------------------------------------------- */

  function initNav() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("nav-toggle");
    var mobileMenu = document.getElementById("mobile-menu");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });

    toggle.addEventListener("click", function () {
      toggle.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    function closeMobile() {
      toggle.classList.remove("open");
      mobileMenu.classList.remove("open");
    }

    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMobile();
    });

    var sections = document.querySelectorAll("section[id]");
    var navItems = document.querySelectorAll(".nav-links a, .mobile-menu a");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navItems.forEach(function (item) {
              if (item.getAttribute("href") === "#" + id) {
                item.classList.add("active");
              } else {
                item.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* --------------------------------------------------------------------
     Interactions: Section Reveals
     -------------------------------------------------------------------- */

  function initReveals() {
    var reveals = document.querySelectorAll(".reveal, .reveal-stagger");

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    reveals.forEach(function (r) { observer.observe(r); });
  }

  /* --------------------------------------------------------------------
     Init
     -------------------------------------------------------------------- */

  function init() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    renderAll();
    initNav();
    initReveals();
    initLangToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
