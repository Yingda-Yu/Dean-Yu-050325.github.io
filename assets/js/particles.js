/**
 * Hero Particle System
 * Canvas 2D — subtle drifting particles with gentle mouse displacement.
 * No dependencies. Respects prefers-reduced-motion.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;

  var ctx = canvas.getContext("2d");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var particles = [];
  var mouse = { x: -1000, y: -1000 };
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  var config = {
    count: 0,
    maxSpeed: 0.15,
    maxSize: 2,
    mouseRadius: 120,
    mouseForce: 0.3,
    accentRatio: 0.12,
  };

  function resize() {
    var rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getW() { return canvas.width / dpr; }
  function getH() { return canvas.height / dpr; }

  function createParticles() {
    var w = getW();
    var h = getH();
    var area = w * h;
    var baseCount = Math.floor(area / 12000);

    if (window.innerWidth < 768) {
      baseCount = Math.floor(baseCount * 0.4);
    }

    config.count = Math.max(20, Math.min(120, baseCount));
    particles = [];

    for (var i = 0; i < config.count; i++) {
      var isAccent = Math.random() < config.accentRatio;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * config.maxSpeed,
        vy: (Math.random() - 0.5) * config.maxSpeed,
        size: Math.random() * config.maxSize + 0.5,
        baseAlpha: isAccent ? 0.35 + Math.random() * 0.25 : 0.08 + Math.random() * 0.12,
        alpha: 0,
        isAccent: isAccent,
        ox: 0,
        oy: 0,
      });
      particles[i].alpha = particles[i].baseAlpha;
    }
  }

  function update() {
    var w = getW();
    var h = getH();
    var mr = config.mouseRadius;
    var mf = config.mouseForce;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mr && dist > 0) {
        var force = (1 - dist / mr) * mf;
        p.ox = (dx / dist) * force * 20;
        p.oy = (dy / dist) * force * 20;
      } else {
        p.ox *= 0.92;
        p.oy *= 0.92;
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, getW(), getH());

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var px = p.x + p.ox;
      var py = p.y + p.oy;

      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.isAccent
        ? "rgba(181, 122, 78, " + p.alpha + ")"
        : "rgba(181, 145, 110, " + p.alpha + ")";
      ctx.fill();
    }
  }

  function animate() {
    update();
    draw();
    requestAnimationFrame(animate);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, getW(), getH());
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.isAccent
        ? "rgba(181, 122, 78, " + p.baseAlpha + ")"
        : "rgba(181, 145, 110, " + p.baseAlpha + ")";
      ctx.fill();
    }
  }

  function init() {
    resize();
    createParticles();

    if (prefersReducedMotion) {
      drawStatic();
      return;
    }

    animate();
  }

  canvas.addEventListener("mousemove", function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", function () {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      createParticles();
    }, 250);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
