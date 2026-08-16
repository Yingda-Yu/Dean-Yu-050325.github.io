/**
 * Main Application Logic
 * Renders content, handles navigation, section reveals, and interactions.
 */
(function () {
  "use strict";

  var D = window.SITE_DATA;
  if (!D) return;

  /* --------------------------------------------------------------------
     SVG Icons
     -------------------------------------------------------------------- */

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    scholar: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  };

  /* --------------------------------------------------------------------
     Helpers
     -------------------------------------------------------------------- */

  function el(tag, className, html) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function escapeAttr(s) {
    if (!s) return "";
    return s.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function statusClass(status) {
    var s = (status || "").toLowerCase();
    if (s === "accepted" || s === "in press") return "status-accepted";
    if (s === "published") return "status-published";
    if (s === "preprint") return "status-preprint";
    if (s === "under review") return "status-under-review";
    return "status-preprint";
  }

  /* --------------------------------------------------------------------
     Render: Hero
     -------------------------------------------------------------------- */

  function renderHero() {
    var nameEl = document.getElementById("hero-name");
    var name = D.profile.name;
    nameEl.innerHTML = name + "<span class='period'>.</span>";

    document.getElementById("hero-tagline").textContent = D.profile.tagline;
    document.getElementById("hero-description").textContent = D.profile.description;

    var companyLink = document.getElementById("hero-company-link");
    if (D.company.url) {
      companyLink.innerHTML =
        "Founder @ <a href=\"" + escapeAttr(D.company.url) + "\" target=\"_blank\" rel=\"noopener\">" +
        D.company.name + " &#8599;</a>";
    } else {
      companyLink.innerHTML =
        "Founder @ <span>" + D.company.name + "</span>";
    }
  }

  /* --------------------------------------------------------------------
     Render: About
     -------------------------------------------------------------------- */

  function renderAbout() {
    var aboutText = document.getElementById("about-text");
    D.about.forEach(function (para) {
      aboutText.appendChild(el("p", null, para));
    });

    var ww = document.getElementById("working-with");
    ww.appendChild(el("div", "label", "Working With"));
    D.workingWith.forEach(function (skill) {
      ww.appendChild(el("span", "tag", skill));
    });
  }

  /* --------------------------------------------------------------------
     Render: Selected Work
     -------------------------------------------------------------------- */

  function renderWork() {
    var list = document.getElementById("work-list");
    D.projects.forEach(function (p) {
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
  }

  /* --------------------------------------------------------------------
     Render: Selected Research
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

  function renderResearch() {
    var list = document.getElementById("research-list");
    D.publications.selected.forEach(function (pub) {
      list.appendChild(renderResearchItem(pub));
    });

    var additionalList = document.getElementById("research-additional-list");
    D.publications.additional.forEach(function (pub) {
      additionalList.appendChild(renderResearchItem(pub));
    });
  }

  /* --------------------------------------------------------------------
     Render: Venture
     -------------------------------------------------------------------- */

  function renderVenture() {
    var narrative = document.getElementById("venture-narrative");
    narrative.innerHTML =
      "Founder of <span class=\"company-name\">" + D.company.name + "</span>, " +
      D.company.description;

    var areas = document.getElementById("venture-areas");
    var areaDescriptions = {
      "Visual Intelligence": "Computer vision, image processing, and visual data systems.",
      "Generative Systems": "AI image and video generation, digital humans, and content pipelines.",
      "Applied AI": "Enterprise AI solutions bridging research and real-world deployment.",
    };

    D.company.areas.forEach(function (area) {
      var div = el("div", "venture-area");
      div.innerHTML =
        "<h4>" + area + "</h4>" +
        "<p>" + (areaDescriptions[area] || "") + "</p>";
      areas.appendChild(div);
    });

    var linkContainer = document.getElementById("venture-link-container");
    if (D.company.url) {
      linkContainer.innerHTML =
        '<a class="venture-link" href="' + escapeAttr(D.company.url) + '" target="_blank" rel="noopener">' +
        "Visit " + D.company.name + " <span class=\"arrow\">&#8594;</span></a>";
    } else {
      linkContainer.innerHTML =
        '<span class="venture-link disabled">' +
        D.company.name + " link coming soon</span>";
    }
  }

  /* --------------------------------------------------------------------
     Render: Journey Timeline
     -------------------------------------------------------------------- */

  function renderJourney() {
    var timeline = document.getElementById("timeline");
    D.journey.forEach(function (item) {
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
     Render: Navigation
     -------------------------------------------------------------------- */

  function renderNav() {
    var navLinks = document.getElementById("nav-links");
    var mobileMenu = document.getElementById("mobile-menu");

    D.nav.forEach(function (item) {
      var a = el("a", null, item.label);
      a.href = item.href;
      navLinks.appendChild(a);

      var ma = el("a", null, item.label);
      ma.href = item.href;
      mobileMenu.appendChild(ma);
    });
  }

  /* --------------------------------------------------------------------
     Render: Side Social
     -------------------------------------------------------------------- */

  function renderSideSocial() {
    var sideSocial = document.getElementById("side-social");
    var sideEmail = document.getElementById("side-email");

    if (D.social.github.url) {
      var gh = el("a");
      gh.href = D.social.github.url;
      gh.target = "_blank";
      gh.rel = "noopener";
      gh.setAttribute("aria-label", "GitHub");
      gh.innerHTML = ICONS.github;
      sideSocial.appendChild(gh);
    }

    if (D.social.linkedin.url) {
      var li = el("a");
      li.href = D.social.linkedin.url;
      li.target = "_blank";
      li.rel = "noopener";
      li.setAttribute("aria-label", "LinkedIn");
      li.innerHTML = ICONS.linkedin;
      sideSocial.appendChild(li);
    }

    if (D.social.scholar.url) {
      var sc = el("a");
      sc.href = D.social.scholar.url;
      sc.target = "_blank";
      sc.rel = "noopener";
      sc.setAttribute("aria-label", "Google Scholar");
      sc.innerHTML = ICONS.scholar;
      sideSocial.appendChild(sc);
    }

    if (D.profile.email) {
      var ea = el("a");
      ea.href = "mailto:" + D.profile.email;
      ea.textContent = D.profile.email;
      sideEmail.appendChild(ea);
    }
  }

  /* --------------------------------------------------------------------
     Render: Contact
     -------------------------------------------------------------------- */

  function renderContact() {
    var emailBtn = document.getElementById("contact-email");
    emailBtn.href = "mailto:" + D.profile.email;

    var socials = document.getElementById("contact-socials");

    if (D.social.github.url) {
      socials.appendChild(buildSocialLink("GitHub", D.social.github.url, ICONS.github));
    }
    if (D.social.linkedin.url) {
      socials.appendChild(buildSocialLink("LinkedIn", D.social.linkedin.url, ICONS.linkedin));
    }
    if (D.social.scholar.url) {
      socials.appendChild(buildSocialLink("Scholar", D.social.scholar.url, ICONS.scholar));
    }
    if (D.company.url) {
      socials.appendChild(buildSocialLink(D.company.name, D.company.url, null));
    }
  }

  function buildSocialLink(label, url, icon) {
    var a = el("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = (icon || "") + " " + label + " &#8599;";
    return a;
  }

  /* --------------------------------------------------------------------
     Visitor Stats
     -------------------------------------------------------------------- */

  function loadVisitorStats() {
    var statsContainer = document.getElementById("visitor-stats");

    fetch("./assets/data/visitor-stats.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || data.mock) {
          return;
        }
        renderVisitorStats(data);
      })
      .catch(function () {
        // Keep the placeholder text
      });
  }

  function renderVisitorStats(data) {
    var statsContainer = document.getElementById("visitor-stats");
    statsContainer.innerHTML = "";

    var numbers = el("div", "visitor-numbers");
    numbers.appendChild(buildStat(data.visitors || 0, "Visitors"));
    numbers.appendChild(buildStat(data.countries || 0, "Countries"));
    statsContainer.appendChild(numbers);

    if (data.topCountries && data.topCountries.length) {
      var countriesDiv = el("div", "visitor-countries");
      countriesDiv.appendChild(el("div", "label", "Top Locations"));
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

    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });

    // Active section highlighting
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

    var isOpen = false;
    btn.addEventListener("click", function () {
      isOpen = !isOpen;
      additional.classList.toggle("open", isOpen);
      btn.textContent = isOpen ? "Show less \u2191" : "View all research \u2193";
    });
  }

  /* --------------------------------------------------------------------
     Init
     -------------------------------------------------------------------- */

  function init() {
    renderHero();
    renderAbout();
    renderWork();
    renderResearch();
    renderVenture();
    renderJourney();
    renderNav();
    renderSideSocial();
    renderContact();
    loadVisitorStats();
    initNav();
    initReveals();
    initResearchExpand();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
