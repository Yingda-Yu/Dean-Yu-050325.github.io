/**
 * Main Application Logic — V2 Bilingual
 * Renders content from I18N data, handles language switching,
 * photo slider, navigation, section reveals, and IP visitor tracking.
 */
(function () {
  "use strict";

  var I18N = window.I18N;
  var SHARED = window.SHARED;
  if (!I18N || !SHARED) return;

  var currentLang = window.DEFAULT_LANG || "en";
  var researchExpanded = false;
  var visitorData = null;
  var visitorLocation = null;

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

  function statusClass(status) {
    var s = (status || "").toLowerCase();
    if (s === "accepted" || s === "in press" || s === "\u5df2\u63a5\u6536") return "status-accepted";
    if (s === "published") return "status-published";
    if (s === "preprint" || s === "\u9884\u5370\u672c") return "status-preprint";
    if (s === "under review" || s === "\u5ba1\u7a3f\u4e2d") return "status-under-review";
    return "status-preprint";
  }

  function getLinkIcon(key) {
    return ICONS[key] || "";
  }

  /* --------------------------------------------------------------------
     Render: Hero (with photo slider)
     -------------------------------------------------------------------- */

  function renderHero() {
    var d = D();

    document.getElementById("hero-greeting").textContent = d.profile.greeting;

    var nameEl = document.getElementById("hero-name");
    nameEl.innerHTML = d.profile.name + "<span class='period'>.</span>";

    document.getElementById("hero-tagline").textContent = d.profile.tagline;
    document.getElementById("hero-description").textContent = d.profile.description;

    var cta = document.getElementById("hero-cta");
    clear(cta);
    cta.appendChild(el("a", "btn btn-primary",
      d.heroCTA.primary + " <span class='arrow'>&#8594;</span>"));
    cta.firstChild.href = "#publications";
    cta.appendChild(el("a", "btn btn-secondary", d.heroCTA.secondary));
    cta.lastChild.href = "#about";

    var companyLink = document.getElementById("hero-company-link");
    if (SHARED.company.url) {
      companyLink.innerHTML =
        d.company.heroText + " &#8594; <a href=\"" + escapeAttr(SHARED.company.url) +
        "\" target=\"_blank\" rel=\"noopener\">" + d.company.name + " &#8599;</a>";
    } else {
      companyLink.innerHTML = d.company.heroText + " &#8594; <span>" + d.company.name + "</span>";
    }

    var photoReal = document.getElementById("hero-photo-real");
    var photoStylized = document.getElementById("hero-photo-stylized");
    if (SHARED.company.photo) photoReal.src = SHARED.company.photo;
    if (SHARED.stylizedPhoto) photoStylized.src = SHARED.stylizedPhoto;

    var labelReal = document.getElementById("photo-label-real");
    var labelAI = document.getElementById("photo-label-ai");
    labelReal.textContent = currentLang === "zh" ? "\u771f\u5b9e" : "Real";
    labelAI.textContent = "AI";
  }

  /* --------------------------------------------------------------------
     Render: About
     -------------------------------------------------------------------- */

  function renderAbout() {
    var d = D();

    document.getElementById("label-about").textContent = d.sections.about;
    document.getElementById("heading-about").textContent = d.headings.about;

    var aboutText = document.getElementById("about-text");
    clear(aboutText);
    d.about.forEach(function (para) {
      aboutText.appendChild(el("p", null, para));
    });

    var ww = document.getElementById("working-with");
    clear(ww);
    ww.appendChild(el("div", "label", d.workingWithLabel));
    d.workingWith.forEach(function (skill) {
      ww.appendChild(el("span", "tag", skill));
    });
  }

  /* --------------------------------------------------------------------
     Render: Publications (was Selected Research)
     -------------------------------------------------------------------- */

  function renderResearchItem(pub) {
    var item = el("div", "research-item");

    var html = '<div class="research-year">' + (pub.year || "") + "</div>";
    html += '<div class="research-body">';
    html += "<h3>" + pub.title + "</h3>";

    if (pub.venue) {
      html += '<p class="research-venue">' + pub.venue + "</p>";
    }

    if (pub.tags && pub.tags.length) {
      html += '<div class="research-tags">';
      pub.tags.forEach(function (t) {
        html += '<span class="research-tag">' + t + "</span>";
      });
      html += "</div>";
    }

    if (pub.contribution) {
      html += '<p class="research-contribution">' + pub.contribution + "</p>";
    }

    var links = [];
    if (pub.paper) {
      links.push('<a href="' + escapeAttr(pub.paper) + '" target="_blank" rel="noopener">Paper &#8599;</a>');
    }
    if (pub.doi) {
      links.push('<a href="https://doi.org/' + escapeAttr(pub.doi) + '" target="_blank" rel="noopener">DOI &#8599;</a>');
    }
    if (pub.code) {
      links.push('<a href="' + escapeAttr(pub.code) + '" target="_blank" rel="noopener">Code &#8599;</a>');
    }
    if (pub.project) {
      links.push('<a href="' + escapeAttr(pub.project) + '" target="_blank" rel="noopener">Project &#8599;</a>');
    }
    if (links.length) {
      html += '<div class="research-links">' + links.join("") + "</div>";
    }

    html += "</div>";

    var statusHtml = '<div class="research-status">';
    if (pub.status) {
      statusHtml += '<span class="status-badge ' + statusClass(pub.status) + '">' + pub.status + "</span>";
    }
    if (pub.role) {
      statusHtml += '<span class="role-badge">' + pub.role + "</span>";
    }
    statusHtml += "</div>";

    item.innerHTML = html + statusHtml;
    return item;
  }

  function renderPublications() {
    var d = D();

    document.getElementById("label-publications").textContent = d.sections.publications;
    document.getElementById("heading-publications").textContent = d.headings.publications;

    var list = document.getElementById("research-list");
    clear(list);
    d.publications.selected.forEach(function (pub) {
      list.appendChild(renderResearchItem(pub));
    });

    var additionalList = document.getElementById("research-additional-list");
    clear(additionalList);
    d.publications.additional.forEach(function (pub) {
      additionalList.appendChild(renderResearchItem(pub));
    });

    var btn = document.getElementById("research-expand-btn");
    btn.textContent = researchExpanded
      ? d.researchCollapse + " \u2191"
      : d.researchExpand + " \u2193";
  }

  /* --------------------------------------------------------------------
     Render: My Work (merged Projects + Venture)
     -------------------------------------------------------------------- */

  function renderWork() {
    var d = D();

    document.getElementById("label-work").textContent = d.sections.work;
    document.getElementById("heading-work").textContent = d.headings.work;
    document.getElementById("work-projects-label").textContent = d.workLabels.projects;
    document.getElementById("work-venture-label").textContent = d.workLabels.venture;

    /* Projects */
    var list = document.getElementById("work-list");
    clear(list);

    d.projects.forEach(function (p) {
      var item = el("div", "work-item");

      if (p.url) {
        item.style.cursor = "pointer";
        item.addEventListener("click", function () {
          window.open(p.url, "_blank");
        });
      }

      item.innerHTML =
        "<div class=\"work-number\">" + p.number + "</div>" +
        "<div class=\"work-body\">" +
        "<h3>" + p.name + "</h3>" +
        "<p class=\"work-description\">" + p.description + "</p>" +
        "<p class=\"work-meta\">" + p.category + " &middot; " + p.year + "</p>" +
        "</div>" +
        "<div class=\"work-arrow\">&#8599;</div>";

      list.appendChild(item);
    });

    /* Venture */
    var narrative = document.getElementById("venture-narrative");
    narrative.innerHTML = d.company.description;

    var areas = document.getElementById("venture-areas");
    clear(areas);
    d.company.areas.forEach(function (area) {
      var div = el("div", "venture-area");
      div.innerHTML =
        "<h4>" + area.name + "</h4>" +
        "<p>" + area.desc + "</p>";
      areas.appendChild(div);
    });

    var linkContainer = document.getElementById("venture-link-container");
    if (SHARED.company.url) {
      linkContainer.innerHTML =
        '<a class="venture-link" href="' + escapeAttr(SHARED.company.url) + '" target="_blank" rel="noopener">' +
        d.company.visitLink + " <span class=\"arrow\">&#8594;</span></a>";
    } else {
      linkContainer.innerHTML =
        '<span class="venture-link disabled">' +
        d.company.linkComingSoon + "</span>";
    }
  }

  /* --------------------------------------------------------------------
     Render: Journey Timeline
     -------------------------------------------------------------------- */

  function renderJourney() {
    var d = D();

    document.getElementById("label-journey").textContent = d.sections.journey;
    document.getElementById("heading-journey").textContent = d.headings.journey;

    var timeline = document.getElementById("timeline");
    clear(timeline);
    d.journey.forEach(function (item) {
      var div = el("div", "timeline-item");
      div.innerHTML =
        '<div class="timeline-year">' + item.year + "</div>" +
        '<div class="timeline-title">' + item.title + "</div>" +
        '<div class="timeline-org">' + item.org + "</div>" +
        (item.detail ? '<div class="timeline-detail">' + item.detail + "</div>" : "");
      timeline.appendChild(div);
    });
  }

  /* --------------------------------------------------------------------
     Render: Visitors (with IP tracking)
     -------------------------------------------------------------------- */

  function renderVisitors() {
    var d = D();

    document.getElementById("label-world").textContent = d.sections.world;
    document.getElementById("heading-world").textContent = d.headings.world;

    if (visitorData && !visitorData.mock) {
      renderVisitorStats(visitorData);
    } else if (visitorLocation) {
      renderVisitorLocation();
    } else {
      document.getElementById("visitor-placeholder").textContent = d.visitorPlaceholder;
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
     Visitor Stats (from JSON)
     -------------------------------------------------------------------- */

  function loadVisitorStats() {
    fetch("./assets/data/visitor-stats.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || data.mock) return;
        visitorData = data;
        renderVisitorStats(data);
      })
      .catch(function () { });
  }

  function renderVisitorStats(data) {
    var d = D();
    var statsContainer = document.getElementById("visitor-stats");
    statsContainer.innerHTML = "";

    var numbers = el("div", "visitor-numbers");
    numbers.appendChild(buildStat(data.visitors || 0, d.visitorLabels.visitors));
    numbers.appendChild(buildStat(data.countries || 0, d.visitorLabels.countries));
    statsContainer.appendChild(numbers);

    if (data.topCountries && data.topCountries.length) {
      var countriesDiv = el("div", "visitor-countries");
      countriesDiv.appendChild(el("div", "label", d.visitorLabels.topLocations));
      data.topCountries.forEach(function (c) {
        var row = el("div", "country-row");
        row.innerHTML =
          '<span class="name"><span class="dot"></span>' + c.name + "</span>" +
          '<span class="count">' + (c.count || c.percentage || "") + "</span>";
        countriesDiv.appendChild(row);
      });
      statsContainer.appendChild(countriesDiv);
    }
  }

  function buildStat(value, label) {
    var div = el("div", "visitor-number");
    div.innerHTML =
      '<span class="value">' + formatNumber(value) + "</span>" +
      '<span class="label">' + label + "</span>";
    return div;
  }

  function formatNumber(n) {
    if (typeof n !== "number") return n;
    return n.toLocaleString();
  }

  /* --------------------------------------------------------------------
     Visitor Location (IP-based)
     -------------------------------------------------------------------- */

  function loadVisitorLocation() {
    fetch("https://ipwho.is/")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data && data.success !== false && data.latitude) {
          visitorLocation = {
            city: data.city,
            country: data.country,
            countryCode: data.country_code,
            latitude: data.latitude,
            longitude: data.longitude,
            ip: data.ip,
          };
          if (window.addVisitorPoint && typeof window.addVisitorPoint === "function") {
            window.addVisitorPoint(visitorLocation.latitude, visitorLocation.longitude);
          }
          if (!visitorData || visitorData.mock) {
            renderVisitorLocation();
          }
        }
      })
      .catch(function () { });
  }

  function renderVisitorLocation() {
    var d = D();
    var statsContainer = document.getElementById("visitor-stats");
    statsContainer.innerHTML = "";

    var locDiv = el("div", "visitor-location");
    var youText = currentLang === "zh"
      ? "\u4f60\u6b63\u4ece"
      : "You're visiting from";
    locDiv.innerHTML =
      '<div class="visitor-location-text">' +
      youText + " <strong>" + (visitorLocation.city || "") + ", " + (visitorLocation.country || "") + "</strong>" +
      "</div>";
    statsContainer.appendChild(locDiv);
  }

  /* --------------------------------------------------------------------
     Photo Slider
     -------------------------------------------------------------------- */

  function initPhotoSlider() {
    var slider = document.getElementById("photo-slider");
    if (!slider) return;

    var isDragging = false;

    function getPercent(clientX) {
      var rect = slider.getBoundingClientRect();
      var x = clientX - rect.left;
      var percent = (x / rect.width) * 100;
      return Math.max(0, Math.min(100, percent));
    }

    function updateSlider(percent) {
      var before = document.getElementById("photo-slider-before");
      var handle = document.getElementById("photo-slider-handle");
      before.style.clipPath = "inset(0 0 0 " + percent + "%)";
      handle.style.left = percent + "%";
    }

    function onMove(e) {
      if (!isDragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(getPercent(clientX));
      e.preventDefault();
    }

    function onStart(e) {
      isDragging = true;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(getPercent(clientX));
      e.preventDefault();
    }

    function onEnd() {
      isDragging = false;
    }

    slider.addEventListener("mousedown", onStart);
    slider.addEventListener("touchstart", onStart, { passive: false });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });

    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchend", onEnd);

    updateSlider(50);
  }

  /* --------------------------------------------------------------------
     Language Toggle
     -------------------------------------------------------------------- */

  function updateLangToggle() {
    var btn = document.getElementById("lang-toggle");
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
    renderAbout();
    renderPublications();
    renderWork();
    renderJourney();
    renderVisitors();
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
     Interactions: Research Expand
     -------------------------------------------------------------------- */

  function initResearchExpand() {
    var btn = document.getElementById("research-expand-btn");
    var additional = document.getElementById("research-additional");
    if (!btn || !additional) return;

    btn.addEventListener("click", function () {
      researchExpanded = !researchExpanded;
      additional.classList.toggle("open", researchExpanded);
      var d = D();
      btn.textContent = researchExpanded
        ? d.researchCollapse + " \u2191"
        : d.researchExpand + " \u2193";
    });
  }

  /* --------------------------------------------------------------------
     Init
     -------------------------------------------------------------------- */

  function init() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    renderAll();
    initNav();
    initReveals();
    initResearchExpand();
    initLangToggle();
    initPhotoSlider();
    loadVisitorStats();
    loadVisitorLocation();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
