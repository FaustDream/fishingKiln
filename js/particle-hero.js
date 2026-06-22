/**
 * 青花瓷 · 墨韵粒子画布
 * Ink-flow particle system inspired by blue-white porcelain aesthetic.
 * Layered noise fields create organic swirling like ink spreading in water.
 */

// 粒子半径参与 canvas 渐变计算，必须兜底为正数，避免噪声异常把画布动画拖进连续报错。
function clampPositiveNumber(value, fallback) {
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export class PorcelainParticleHero {
  constructor(container, options = {}) {
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.mouse = { x: -9999, y: -9999, active: false, vx: 0, vy: 0, px: -9999, py: -9999 };
    this.blooms = [];
    this.particles = [];
    this.time = 0;

    // Configuration — tuned for meditative ink flow
    this.count = options.count ?? 200;
    this.attractionRadius = options.attractionRadius ?? 140;
    this.attractionStrength = options.attractionStrength ?? 0.008;
    this.noiseSpeed = options.noiseSpeed ?? 0.00025;
    this.waveFrequency = options.waveFrequency ?? 0.01;

    // Deep cobalt palette — blue-white porcelain tones
    this.colors = [
      { r: 26,  g: 58,  b: 92,  alpha: 0.78 }, // deep cobalt
      { r: 35,  g: 75,  b: 110, alpha: 0.65 }, // ink blue
      { r: 49,  g: 95,  b: 135, alpha: 0.55 }, // accent
      { r: 74,  g: 124, b: 163, alpha: 0.42 }, // mid blue
      { r: 122, g: 166, b: 194, alpha: 0.32 }, // light cobalt
      { r: 189, g: 211, b: 232, alpha: 0.22 }, // pale blue-white
      { r: 220, g: 230, b: 242, alpha: 0.15 }, // near white
    ];

    this.build();
  }

  build() {
    this.container.classList.add("particle-hero");
    this.container.appendChild(this.canvas);
    this.canvas.classList.add("particle-hero__canvas");

    this.resize = this.resize.bind(this);
    this.animate = this.animate.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);

    this.resize();
    window.addEventListener("resize", this.resize);

    this.canvas.addEventListener("mousemove", this.onMouseMove, { passive: true });
    this.canvas.addEventListener("mouseleave", this.onMouseLeave);
    this.canvas.addEventListener("click", this.onClick);
    this.canvas.addEventListener("touchmove", this.onTouchMove, { passive: true });
    this.canvas.addEventListener("touchstart", this.onTouchStart, { passive: false });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.reducedMotion = mq.matches;
    mq.addEventListener("change", (e) => { this.reducedMotion = e.matches; });

    this.createParticles();
    this.animate();
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + "px";
    this.canvas.style.height = rect.height + "px";
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.count; i++) {
      const tier = Math.random();
      const p = this.makeParticle();
      if (tier < 0.4) {
        // Mist layer — large, slow, blurred, deep background
        p.size = 8 + Math.random() * 16;
        p.speed = 0.1 + Math.random() * 0.25;
        p.depth = 0.15 + Math.random() * 0.2;
        p.color = this.colors[0]; // deep cobalt
        p.trailAlpha = 0;
      } else if (tier < 0.8) {
        // Flow layer — medium, fluid, the main ink body
        p.size = 3 + Math.random() * 8;
        p.speed = 0.3 + Math.random() * 0.5;
        p.depth = 0.35 + Math.random() * 0.4;
        p.color = this.colors[1 + Math.floor(Math.random() * 3)];
        p.trailAlpha = 0.03 + Math.random() * 0.04;
      } else {
        // Spark layer — small, bright, porcelain highlights
        p.size = 1 + Math.random() * 3;
        p.speed = 0.4 + Math.random() * 0.7;
        p.depth = 0.7 + Math.random() * 0.3;
        p.color = this.colors[5 + Math.floor(Math.random() * 2)];
        p.trailAlpha = 0.06 + Math.random() * 0.08;
      }
      p.aspectRatio = 0.55 + Math.random() * 0.9; // organic non-circular shape
      p.rotation = Math.random() * Math.PI;
      this.particles.push(p);
    }
  }

  makeParticle(x, y) {
    const angle = Math.random() * Math.PI * 2;
    return {
      x: x ?? Math.random() * this.width,
      y: y ?? Math.random() * this.height,
      baseX: x ?? Math.random() * this.width,
      baseY: y ?? Math.random() * this.height,
      vx: Math.cos(angle) * 0.2,
      vy: Math.sin(angle) * 0.2,
      size: 3,
      color: this.colors[0],
      depth: 0.5,
      speed: 0.4,
      noiseSeed: Math.random() * 2000,
      phase: Math.random() * Math.PI * 2,
      aspectRatio: 0.7,
      rotation: 0,
      trailAlpha: 0.04,
      trail: [],
      trailMax: 4 + Math.floor(Math.random() * 6),
    };
  }

  /* Multi-octave noise for organic flow */
  noise3(x, y, seed, octaves = 3) {
    let val = 0;
    let amp = 1;
    let freq = 1;
    let max = 0;
    for (let o = 0; o < octaves; o++) {
      const nx = x * freq + seed * 0.7;
      const ny = y * freq + seed * 1.3;
      val += Math.sin(nx * 1.2 + Math.cos(ny * 0.9)) * amp;
      max += amp;
      amp *= 0.5;
      freq *= 2.1;
    }
    return val / max;
  }

  /* Curl-like noise for rotational flow */
  curlNoise(x, y, seed, t) {
    const eps = 0.01;
    // 时间只作为噪声种子推进流动，octaves 固定为 3，避免非整数时间值破坏噪声归一化。
    const timeSeed = seed + t;
    const n1 = this.noise3(x + eps, y, timeSeed, 3);
    const n2 = this.noise3(x - eps, y, timeSeed, 3);
    const n3 = this.noise3(x, y + eps, timeSeed, 3);
    const n4 = this.noise3(x, y - eps, timeSeed, 3);
    return {
      cx: (n4 - n3) / (2 * eps),
      cy: (n2 - n1) / (2 * eps),
    };
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.px = this.mouse.x;
    this.mouse.py = this.mouse.y;
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.vx = this.mouse.x - this.mouse.px;
    this.mouse.vy = this.mouse.y - this.mouse.py;
    this.mouse.active = true;
  }

  onMouseLeave() {
    this.mouse.active = false;
  }

  onClick(e) {
    if (this.reducedMotion) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Ink bloom — particles spread slowly like ink dropped in water
    this.blooms.push({
      x, y,
      radius: 0,
      maxRadius: 200 + Math.random() * 120,
      life: 1,
      opacity: 0.4,
    });

    // Spawn bloom particles
    const count = 14 + Math.floor(Math.random() * 10);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 8 + Math.random() * 30;
      const p = this.makeParticle(
        x + Math.cos(angle) * dist,
        y + Math.sin(angle) * dist
      );
      p.size = 2 + Math.random() * 6;
      p.speed = 0.6 + Math.random() * 1.2;
      p.depth = 0.4 + Math.random() * 0.5;
      p.color = this.colors[2 + Math.floor(Math.random() * 3)];
      p.vx = Math.cos(angle) * (1 + Math.random() * 2.5);
      p.vy = Math.sin(angle) * (1 + Math.random() * 2.5);
      p.trailAlpha = 0.04 + Math.random() * 0.06;
      p.trailMax = 3 + Math.floor(Math.random() * 4);
      this.particles.push(p);
    }

    if (this.particles.length > this.count + 80) {
      this.particles.splice(0, count);
    }
  }

  onTouchMove(e) {
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.px = this.mouse.x;
      this.mouse.py = this.mouse.y;
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
      this.mouse.vx = this.mouse.x - this.mouse.px;
      this.mouse.vy = this.mouse.y - this.mouse.py;
      this.mouse.active = true;
    }
  }

  onTouchStart(e) {
    if (e.touches.length > 0) {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      this.mouse.x = x;
      this.mouse.y = y;
      this.mouse.active = true;
      if (!this.reducedMotion) {
        this.blooms.push({ x, y, radius: 0, maxRadius: 160, life: 1, opacity: 0.3 });
      }
    }
  }

  destroy() {
    window.removeEventListener("resize", this.resize);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseleave", this.onMouseLeave);
    this.canvas.removeEventListener("click", this.onClick);
    this.canvas.removeEventListener("touchmove", this.onTouchMove);
    this.canvas.removeEventListener("touchstart", this.onTouchStart);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    this.canvas.remove();
  }

  /* ─── Render ─── */

  animate(timestamp) {
    this.animFrame = requestAnimationFrame(this.animate);
    if (!timestamp) return;

    if (this.reducedMotion) {
      this.renderStatic();
      return;
    }

    const dt = Math.min((timestamp - (this.lastTime || timestamp)) * 0.05, 3);
    this.lastTime = timestamp;
    this.time += dt;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Ambient wash — subtle overall gradient
    const wash = this.ctx.createRadialGradient(
      this.centerX, this.centerY * 0.4, 0,
      this.centerX, this.centerY, Math.max(this.width, this.height) * 0.7
    );
    wash.addColorStop(0, "rgba(26, 58, 92, 0.04)");
    wash.addColorStop(0.5, "rgba(26, 58, 92, 0.015)");
    wash.addColorStop(1, "rgba(26, 58, 92, 0)");
    this.ctx.fillStyle = wash;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // Mouse proximity glow
    if (this.mouse.active && this.mouse.x > 0) {
      const glow = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, this.attractionRadius
      );
      glow.addColorStop(0, "rgba(74, 124, 163, 0.04)");
      glow.addColorStop(0.5, "rgba(49, 95, 135, 0.015)");
      glow.addColorStop(1, "rgba(49, 95, 135, 0)");
      this.ctx.fillStyle = glow;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Draw ink blooms
    this.drawBlooms(dt);

    // Draw mist layer first (deep background)
    this.drawParticleLayer("mist", dt);

    // Connection lines — brush-stroke feel
    this.drawConnections(dt);

    // Draw flow + spark layers
    this.drawParticleLayer("flow", dt);
    this.drawParticleLayer("spark", dt);
  }

  /* Bloom rings — expanding ink circles */
  drawBlooms(dt) {
    for (let i = this.blooms.length - 1; i >= 0; i--) {
      const b = this.blooms[i];
      b.radius += 1.2 * dt;
      b.life -= 0.006 * dt;
      b.opacity *= 0.992;

      if (b.life <= 0 || b.radius >= b.maxRadius) {
        this.blooms.splice(i, 1);
        continue;
      }

      const alpha = b.opacity * b.life;
      const progress = b.radius / b.maxRadius;
      const lineWidth = 1.5 * (1 - progress);

      this.ctx.beginPath();
      this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(49, 95, 135, ${alpha})`;
      this.ctx.lineWidth = lineWidth;
      this.ctx.stroke();

      // Inner echo
      if (b.radius > 40) {
        this.ctx.beginPath();
        this.ctx.arc(b.x, b.y, b.radius * 0.55, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(74, 124, 163, ${alpha * 0.55})`;
        this.ctx.lineWidth = lineWidth * 0.6;
        this.ctx.stroke();
      }
    }
  }

  /* Draw particles of a given layer */
  drawParticleLayer(layer, dt) {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const isMist = p.depth < 0.35;
      const isFlow = p.depth >= 0.35 && p.depth < 0.7;
      const isSpark = p.depth >= 0.7;

      if (layer === "mist" && !isMist) continue;
      if (layer === "flow" && !isFlow) continue;
      if (layer === "spark" && !isSpark) continue;

      this.updateParticle(p, dt);

      if (layer === "mist") {
        this.drawMistParticle(p);
      } else if (layer === "flow") {
        this.drawFlowParticle(p);
      } else {
        this.drawSparkParticle(p);
      }
    }
  }

  updateParticle(p, dt) {
    // Multi-octave noise drift
    const nx = this.noise3(
      p.baseX * this.waveFrequency + this.time * this.noiseSpeed,
      p.y * this.waveFrequency * 0.6,
      p.noiseSeed
    );
    const ny = this.noise3(
      p.baseX * this.waveFrequency * 0.55,
      p.y * this.waveFrequency + this.time * this.noiseSpeed * 0.8,
      p.noiseSeed + 500
    );

    // Curl for rotational motion
    const curl = this.curlNoise(
      p.x * this.waveFrequency * 0.8,
      p.y * this.waveFrequency * 0.8,
      p.noiseSeed + 200,
      this.time * 0.8
    );

    // Gentle mouse displacement (push, not strong pull)
    let mx = 0, my = 0;
    if (this.mouse.active && this.mouse.x > 0 && this.mouse.y > 0) {
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.1;

      if (dist < this.attractionRadius) {
        const force = (1 - dist / this.attractionRadius) * this.attractionStrength;
        // Gentle push away from mouse, creating flowing displacement
        mx -= (dx / dist) * force * 0.5;
        my -= (dy / dist) * force * 0.5;
        // Slight perpendicular drift from mouse velocity
        mx += this.mouse.vx * force * 0.03;
        my += this.mouse.vy * force * 0.03;
      }
    }

    p.vx += nx * 0.015 + curl.cx * 0.03 + mx;
    p.vy += ny * 0.015 + curl.cy * 0.03 + my;
    p.vx *= 0.995;
    p.vy *= 0.995;
    p.x += p.vx * p.speed * dt;
    p.y += p.vy * p.speed * dt;

    // Slow homeward drift
    p.vx += (p.baseX - p.x) * 0.00015;
    p.vy += (p.baseY - p.y) * 0.00015;

    // Wrap
    if (p.x < -30) p.x = this.width + 30;
    if (p.x > this.width + 30) p.x = -30;
    if (p.y < -30) p.y = this.height + 30;
    if (p.y > this.height + 30) p.y = -30;

    // Rotation drift for organic shape
    p.rotation += p.vx * p.vy * 0.02;

    // Trail
    if (p.trailAlpha > 0) {
      p.trail.push({ x: p.x, y: p.y, life: 1 });
      if (p.trail.length > p.trailMax) p.trail.shift();
      for (const t of p.trail) t.life -= 0.06;
    }
  }

  /* Mist particle — large, soft, blurred wash */
  drawMistParticle(p) {
    const alpha = p.color.alpha * p.depth * 0.4;
    const r = clampPositiveNumber(p.size * p.depth * 1.2, 1);

    const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
    grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
    grad.addColorStop(0.6, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.3})`);
    grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /* Flow particle — ink drop with organic shape */
  drawFlowParticle(p) {
    const alpha = p.color.alpha * p.depth;
    const rx = clampPositiveNumber(p.size * p.depth, 1);
    const ry = rx * p.aspectRatio;

    // Trail
    if (p.trailAlpha > 0 && p.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
      for (let i = 1; i < p.trail.length; i++) {
        const t = p.trail[i];
        this.ctx.lineTo(t.x, t.y);
      }
      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.trailAlpha * p.depth})`;
      this.ctx.lineWidth = rx * 0.6;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }

    // Organic ellipse (not perfect circle)
    this.ctx.save();
    this.ctx.translate(p.x, p.y);
    this.ctx.rotate(p.rotation);
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);

    // Soft radial fill
    const grad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
    grad.addColorStop(0.7, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.6})`);
    grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.restore();
  }

  /* Spark particle — bright porcelain highlight */
  drawSparkParticle(p) {
    const alpha = p.color.alpha * p.depth;
    const r = clampPositiveNumber(p.size * p.depth, 1);

    // Trail
    if (p.trailAlpha > 0 && p.trail.length > 1) {
      this.ctx.beginPath();
      this.ctx.moveTo(p.trail[0].x, p.trail[0].y);
      for (let i = 1; i < p.trail.length; i++) {
        this.ctx.lineTo(p.trail[i].x, p.trail[i].y);
      }
      this.ctx.lineTo(p.x, p.y);
      this.ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.trailAlpha * p.depth * 1.4})`;
      this.ctx.lineWidth = r * 0.7;
      this.ctx.lineCap = "round";
      this.ctx.stroke();
    }

    // Core with glow
    const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.5);
    glow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.9})`);
    glow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.3})`);
    glow.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
    this.ctx.fillStyle = glow;
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // Crisp core
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r * 0.5, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 1.2})`;
    this.ctx.fill();
  }

  /* Connection lines — sparse, brush-stroke quality */
  drawConnections(dt) {
    const maxConnections = 300;
    let drawn = 0;

    for (let i = 0; i < this.particles.length && drawn < maxConnections; i++) {
      const p = this.particles[i];
      if (p.depth < 0.35) continue; // skip mist layer for connections

      for (let j = i + 1; j < this.particles.length && drawn < maxConnections; j++) {
        const q = this.particles[j];
        if (q.depth < 0.35) continue;

        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = p.depth > 0.7 ? 35 : (p.depth > 0.35 ? 55 : 0);
        if (dist < maxDist && dist > 0) {
          const alpha = (1 - dist / maxDist) * 0.07 * p.depth * q.depth;
          drawn++;

          // Draw as small segment with slight curve for brush-stroke feel
          const mx = (p.x + q.x) / 2 + (Math.random() - 0.5) * 3;
          const my = (p.y + q.y) / 2 + (Math.random() - 0.5) * 3;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.quadraticCurveTo(mx, my, q.x, q.y);
          this.ctx.strokeStyle = `rgba(74, 124, 163, ${alpha})`;
          this.ctx.lineWidth = 0.4 + Math.random() * 0.3;
          this.ctx.lineCap = "round";
          this.ctx.stroke();
        }
      }
    }
  }

  renderStatic() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.baseX, p.baseY, p.size * p.depth * 0.6, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.color.alpha * p.depth * 0.4})`;
      this.ctx.fill();
    }
  }
}
