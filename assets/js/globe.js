/**
 * Visitor Globe
 * Canvas 2D dotted globe — slowly rotating, with location markers.
 * No dependencies. Respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("globe-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var rotation = 0;
  var size = 240;
  var radius = 100;
  var dots = [];
  var locations = [];

  // Approximate lat/lon for visitor markers
  var locationData = [
    { lat: 35, lon: 105, label: "China" },
    { lat: 38, lon: -97, label: "United States" },
    { lat: 1.3, lon: 103.8, label: "Singapore" },
    { lat: 54, lon: -2, label: "United Kingdom" },
    { lat: 28, lon: 77, label: "India" },
    { lat: -33, lon: 151, label: "Australia" },
    { lat: 52, lon: 13, label: "Germany" },
    { lat: 35.7, lon: 139.7, label: "Japan" },
  ];

  function resize() {
    var rect = canvas.getBoundingClientRect();
    size = rect.width;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    radius = size * 0.38;
  }

  function generateSphereDots() {
    dots = [];
    var total = 220;
    var golden = Math.PI * (3 - Math.sqrt(5));

    for (var i = 0; i < total; i++) {
      var y = 1 - (i / (total - 1)) * 2;
      var r = Math.sqrt(1 - y * y);
      var theta = golden * i;

      dots.push({
        x: Math.cos(theta) * r,
        y: y,
        z: Math.sin(theta) * r,
      });
    }
  }

  function generateLocations() {
    locations = locationData.map(function (loc) {
      var latRad = (loc.lat * Math.PI) / 180;
      var lonRad = (loc.lon * Math.PI) / 180;
      return {
        x: Math.cos(latRad) * Math.cos(lonRad),
        y: Math.sin(latRad),
        z: Math.cos(latRad) * Math.sin(lonRad),
        label: loc.label,
      };
    });
  }

  function rotateY(point, angle) {
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    return {
      x: point.x * cos + point.z * sin,
      y: point.y,
      z: -point.x * sin + point.z * cos,
    };
  }

  function project(point) {
    var cx = size / 2;
    var cy = size / 2;
    return {
      x: cx + point.x * radius,
      y: cy - point.y * radius,
      visible: point.z > -0.1,
      depth: point.z,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, size, size);

    var i, p, proj, alpha;

    // Draw sphere dots
    for (i = 0; i < dots.length; i++) {
      p = rotateY(dots[i], rotation);
      proj = project(p);
      if (!proj.visible) continue;

      alpha = 0.15 + (p.z + 1) * 0.15;
      if (p.z < 0) alpha *= 0.5;

      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 1, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139, 155, 176, " + alpha + ")";
      ctx.fill();
    }

    // Draw location markers
    for (i = 0; i < locations.length; i++) {
      p = rotateY(locations[i], rotation);
      proj = project(p);
      if (!proj.visible) continue;

      alpha = 0.5 + (p.z + 1) * 0.25;

      // Glow
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(95, 208, 190, " + alpha * 0.2 + ")";
      ctx.fill();

      // Dot
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(95, 208, 190, " + alpha + ")";
      ctx.fill();
    }
  }

  function animate() {
    rotation += 0.0015;
    draw();
    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    generateSphereDots();
    generateLocations();

    if (prefersReducedMotion) {
      draw();
      return;
    }

    animate();
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
    }, 250);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
