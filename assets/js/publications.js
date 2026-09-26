/**
 * Publications page logic — full list with status filters.
 * Reuses I18N for UI labels, PUBS for data.
 */
(function () {
  "use strict";

  var I18N = window.I18N;
  var PUBS = window.PUBS;
  if (!I18N || !PUBS) return;

  var currentLang = window.DEFAULT_LANG || "en";
  var activeFilter = "all";

  function D() { return I18N[currentLang]; }

  function escapeAttr(s) {
    if (!s) return "";
    return s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* --------------------------------------------------------------------
     Author highlighting
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

  /* --------------------------------------------------------------------
     Render: single publication row
     -------------------------------------------------------------------- */

  function renderPubRow(pub) {
    var d = D();
    var row = document.createElement("article");
    row.className = "pub-row";
    row.dataset.status = pub.status;

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
    if (pub.year && pub.status !== "under-review") venueText += (venueText ? " \u00b7 " : "") + pub.year;
    if (pub.venue && pub.venue.location) venueText += " \u00b7 " + pub.venue.location;
    if (venueText) {
      html += '<p class="pub-venue">' + venueText + "</p>";
    }

    var badges = "";
    badges += '<span class="status-badge status-' + pub.status + '">' + statusLabel + "</span>";
    if (presLabel) {
      badges += '<span class="pres-badge">' + presLabel + "</span>";
    }
    html += '<div class="pub-badges">' + badges + "</div>";

    if (pub.note && pub.note[currentLang]) {
      html += '<p class="pub-note">' + pub.note[currentLang] + "</p>";
    }

    var links = [];
    if (pub.links && pub.links.paper) {
      links.push('<a href="' + escapeAttr(pub.links.paper) + '" target="_blank" rel="noopener">Paper &#8599;</a>');
    }
    if (pub.links && pub.links.arxiv) {
      links.push('<a href="https://arxiv.org/abs/' + escapeAttr(pub.links.arxiv) + '" target="_blank" rel="noopener">arXiv &#8599;</a>');
    }
    if (pub.links && pub.links.doi) {
      links.push('<a href="https://doi.org/' + escapeAttr(pub.links.doi) + '" target="_blank" rel="noopener">DOI &#8599;</a>');
    }
    if (pub.links && pub.links.code) {
      links.push('<a href="' + escapeAttr(pub.links.code) + '" target="_blank" rel="noopener">Code &#8599;</a>');
    }
    if (pub.links && pub.links.project) {
      links.push('<a href="' + escapeAttr(pub.links.project) + '" target="_blank" rel="noopener">Project &#8599;</a>');
    }
    if (links.length) {
      html += '<div class="pub-links">' + links.join("") + "</div>";
    }

    html += "</div>";
    row.innerHTML = html;
    return row;
  }

  /* --------------------------------------------------------------------
     Render: all publication groups
     -------------------------------------------------------------------- */

  function renderPubGroups() {
    var d = D();
    var statusOrder = ["published", "accepted", "preprint", "under-review"];

    statusOrder.forEach(function (status) {
      var list = document.getElementById("pub-list-" + status);
      if (!list) return;
      list.innerHTML = "";

      var pubs = PUBS.data.filter(function (p) { return p.status === status; });

      /* Sort: newest first */
      pubs.sort(function (a, b) {
        if (a.year !== b.year) return (b.year || 0) - (a.year || 0);
        return a.title.localeCompare(b.title);
      });

      pubs.forEach(function (pub) {
        list.appendChild(renderPubRow(pub));
      });

      /* Group heading */
      var headingEl = document.getElementById("group-" + status);
      if (headingEl && d.pubPage && d.pubPage.groups) {
        headingEl.textContent = d.pubPage.groups[status] || status;
      }
    });

    applyFilter(activeFilter);
  }

  /* --------------------------------------------------------------------
     Filter logic
     -------------------------------------------------------------------- */

  function applyFilter(filter) {
    activeFilter = filter;
    var groups = document.querySelectorAll(".pub-group");

    groups.forEach(function (group) {
      var status = group.dataset.status;
      if (filter === "all" || filter === status) {
        group.style.display = "";
      } else {
        group.style.display = "none";
      }
    });

    /* Update filter button states */
    document.querySelectorAll(".pub-filter").forEach(function (btn) {
      if (btn.dataset.filter === filter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    /* Update count */
    updateCount();
  }

  function updateCount() {
    var d = D();
    var count = PUBS.data.filter(function (p) {
      return activeFilter === "all" || p.status === activeFilter;
    }).length;
    var countEl = document.getElementById("pub-count");
    if (countEl && d.pubPage) {
      countEl.textContent = count + " " + d.pubPage.countLabel;
    }
  }

  function initFilters() {
    var filters = document.querySelectorAll(".pub-filter");
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.dataset.filter);
      });
    });
  }

  /* --------------------------------------------------------------------
     Render: filter labels (translated)
     -------------------------------------------------------------------- */

  function renderFilterLabels() {
    var d = D();
    if (!d.pubPage || !d.pubPage.filters) return;

    document.querySelectorAll(".pub-filter").forEach(function (btn) {
      var key = btn.dataset.filter;
      if (d.pubPage.filters[key]) {
        btn.textContent = d.pubPage.filters[key];
      }
    });
  }

  /* --------------------------------------------------------------------
     Render: page header
     -------------------------------------------------------------------- */

  function renderPageHeader() {
    var d = D();
    if (!d.pubPage) return;

    var backLink = document.getElementById("pub-back-link");
    if (backLink) backLink.textContent = d.pubPage.backToHome;

    var title = document.getElementById("pub-page-title");
    if (title) title.textContent = d.pubPage.title;

    var subtitle = document.getElementById("pub-page-subtitle");
    if (subtitle) subtitle.textContent = d.pubPage.subtitle;
  }

  /* --------------------------------------------------------------------
     Render: navigation
     -------------------------------------------------------------------- */

  function renderNav() {
    var d = D();
    var navLinks = document.getElementById("nav-links");
    var mobileMenu = document.getElementById("mobile-menu");
    if (!navLinks || !mobileMenu) return;

    navLinks.innerHTML = "";
    mobileMenu.innerHTML = "";

    /* Publications page nav links back to home sections */
    var navItems = [
      { label: d.nav[0].label, href: "./index.html#updates" },
      { label: d.nav[1].label, href: "./publications.html" },
      { label: d.nav[2].label, href: "./index.html#research" },
      { label: d.nav[3].label, href: "./index.html#builds" },
      { label: d.nav[4].label, href: "./index.html#about" },
      { label: d.nav[5].label, href: "./index.html#contact" },
    ];

    navItems.forEach(function (item) {
      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if (item.href.indexOf("publications.html") !== -1) {
        a.classList.add("active");
      }
      navLinks.appendChild(a);

      var ma = document.createElement("a");
      ma.href = item.href;
      ma.textContent = item.label;
      mobileMenu.appendChild(ma);
    });
  }

  /* --------------------------------------------------------------------
     Render: footer
     -------------------------------------------------------------------- */

  function renderFooter() {
    var el = document.getElementById("footer-text");
    if (el) el.textContent = D().footer;
  }

  /* --------------------------------------------------------------------
     Language toggle
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
     Mobile menu
     -------------------------------------------------------------------- */

  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var mobileMenu = document.getElementById("mobile-menu");
    if (!toggle || !mobileMenu) return;

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
  }

  function initNavScroll() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    });
  }

  /* --------------------------------------------------------------------
     Render all
     -------------------------------------------------------------------- */

  function renderAll() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    renderPageHeader();
    renderNav();
    renderFilterLabels();
    renderPubGroups();
    renderFooter();
    updateLangToggle();
  }

  /* --------------------------------------------------------------------
     Init
     -------------------------------------------------------------------- */

  function init() {
    /* Load language preference */
    try {
      var saved = localStorage.getItem("site-lang");
      if (saved === "zh" || saved === "en") currentLang = saved;
    } catch (e) { }

    renderAll();
    initFilters();
    initLangToggle();
    initMobileMenu();
    initNavScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
