/**
 * Interactive Background Matrix — Chisom Cyprian Portfolio
 * Renders a subtle, non-intrusive interactive web that avoids harsh white glare.
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Create and inject canvas safely into the background
  const canvas = document.createElement("canvas");
  canvas.id = "bg-interactive-canvas";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let points = [];
  const maxDist = 120; // How close dots need to be to draw a line
  const mouse = { x: null, y: null, radius: 160 };

  // 2. Handle scaling for high-resolution retina screens
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initPoints();
  }

  // 3. Initialize points based on screen area
  function initPoints() {
    points = [];
    const density = Math.floor((canvas.width * canvas.height) / 9000);
    const restrictedDensity = Math.min(density, 120); // Cap points to protect CPU performance

    for (let i = 0; i < restrictedDensity; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Slow movement speed
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1,
      });
    }
  }

  // 4. Tracking user mouse positioning
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener("resize", resizeCanvas);

  // 5. Animation Engine
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Process and draw node networks
    for (let i = 0; i < points.length; i++) {
      let p = points[i];

      // Move points slowly
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off screen walls
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw standard single point node
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(11, 15, 25, 0.08)"; // Very subtle dots
      ctx.fill();

      // Look for connecting points nearby
      for (let j = i + 1; j < points.length; j++) {
        let p2 = points[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          let alpha = (1 - dist / maxDist) * 0.08;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(11, 15, 25, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Interact with human cursor proximity
      if (mouse.x !== null && mouse.y !== null) {
        let mdx = p.x - mouse.x;
        let mdy = p.y - mouse.y;
        let mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          let mAlpha = (1 - mDist / mouse.radius) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 118, 54, ${mAlpha})`; // Fades in orange lines on mouse hover
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  // Run interaction cycle
  resizeCanvas();
  animate();
});
