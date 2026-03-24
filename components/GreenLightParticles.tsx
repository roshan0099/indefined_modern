import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SmokeParticle = {
  sprite: THREE.Sprite;
  velocity: THREE.Vector2;
  life: number;
  maxLife: number;
  growth: number;
  spin: number;
  baseOpacity: number;
};

const MAX_PARTICLES = 180;

const createSmokeTexture = () => {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, size * 0.08, center, center, size * 0.5);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.42)');
  gradient.addColorStop(0.45, 'rgba(6, 95, 70, 0.18)');
  gradient.addColorStop(1, 'rgba(6, 95, 70, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 20; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 6 + Math.random() * 18;
    ctx.fillStyle = `rgba(16, 185, 129, ${0.015 + Math.random() * 0.03})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
};

const GreenLightParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let renderer: THREE.WebGLRenderer | null = null;
    let frameId = 0;
    let isAnimating = false;
    let lastFrame = performance.now();
    let lastMoveAt = 0;
    let hasPointer = false;
    let pointerX = 0;
    let pointerY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000);
    camera.position.z = 10;
    const smokeTexture = createSmokeTexture();
    const particles: SmokeParticle[] = [];

    const toWorld = (clientX: number, clientY: number) => ({
      x: clientX - width / 2,
      y: height / 2 - clientY,
    });

    const disposeParticle = (particle: SmokeParticle) => {
      scene.remove(particle.sprite);
      particle.sprite.material.dispose();
    };

    const spawnSmoke = (x: number, y: number, intensity: number) => {
      const count = 2 + Math.floor(intensity * 2);

      for (let i = 0; i < count; i += 1) {
        const jitter = 14 + intensity * 16;
        const px = x + (Math.random() - 0.5) * jitter;
        const py = y + (Math.random() - 0.5) * jitter;

        const material = new THREE.SpriteMaterial({
          map: smokeTexture,
          color: 0x10b981,
          transparent: true,
          opacity: 0.08 + Math.random() * 0.05,
          depthWrite: false,
          depthTest: false,
          blending: THREE.NormalBlending,
        });

        const sprite = new THREE.Sprite(material);
        const baseScale = 45 + Math.random() * 60 + intensity * 25;
        sprite.position.set(px, py, 0);
        sprite.scale.set(baseScale, baseScale, 1);
        scene.add(sprite);

        const angle = Math.random() * Math.PI * 2;
        const speed = 16 + Math.random() * 24 + intensity * 10;
        particles.push({
          sprite,
          velocity: new THREE.Vector2(Math.cos(angle) * speed, Math.sin(angle) * speed),
          life: 0.5 + Math.random() * 0.7,
          maxLife: 0.5 + Math.random() * 0.7,
          growth: 26 + Math.random() * 34,
          spin: (Math.random() - 0.5) * 0.4,
          baseOpacity: 0.08 + Math.random() * 0.05,
        });
      }

      while (particles.length > MAX_PARTICLES) {
        const oldest = particles.shift();
        if (oldest) disposeParticle(oldest);
      }
    };

    const render = (time: number) => {
      if (!renderer) return;

      const dt = Math.min(0.05, (time - lastFrame) / 1000);
      lastFrame = time;

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= dt;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          disposeParticle(particle);
          continue;
        }

        const progress = particle.life / particle.maxLife;
        particle.velocity.multiplyScalar(1 - dt * 1.9);
        particle.sprite.position.x += particle.velocity.x * dt;
        particle.sprite.position.y += particle.velocity.y * dt;
        particle.sprite.scale.x += particle.growth * dt;
        particle.sprite.scale.y += particle.growth * dt;

        const material = particle.sprite.material as THREE.SpriteMaterial;
        material.opacity = particle.baseOpacity * Math.pow(progress, 1.45);
        material.rotation += particle.spin * dt;
      }

      renderer.clear();

      if (particles.length === 0 && time - lastMoveAt > 50) {
        isAnimating = false;
        return;
      }

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      lastFrame = performance.now();
      frameId = window.requestAnimationFrame(render);
    };

    const emitFromPointer = (clientX: number, clientY: number) => {
      const world = toWorld(clientX, clientY);
      const now = performance.now();

      if (!hasPointer) {
        hasPointer = true;
        pointerX = world.x;
        pointerY = world.y;
      }

      const dx = world.x - pointerX;
      const dy = world.y - pointerY;
      const distance = Math.hypot(dx, dy);
      const intensity = Math.min(1.8, 0.5 + distance / 36);

      if (distance < 1.5) return;

      const segments = Math.max(1, Math.floor(distance / 28));
      for (let i = 1; i <= segments; i += 1) {
        const t = i / segments;
        const px = pointerX + dx * t;
        const py = pointerY + dy * t;
        spawnSmoke(px, py, intensity);
      }

      pointerX = world.x;
      pointerY = world.y;
      lastMoveAt = now;
      startAnimation();
    };

    const onMouseMove = (event: MouseEvent) => emitFromPointer(event.clientX, event.clientY);

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const touch = event.touches[0];
      emitFromPointer(touch.clientX, touch.clientY);
    };

    const onPointerEnd = () => {
      hasPointer = false;
    };

    const onResize = () => {
      if (!renderer) return;
      width = window.innerWidth;
      height = window.innerHeight;

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.setSize(width, height, false);
      renderer.clear();
    };

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onPointerEnd);
    window.addEventListener('blur', onPointerEnd);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onPointerEnd);
      window.removeEventListener('blur', onPointerEnd);

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        disposeParticle(particles[i]);
      }
      particles.length = 0;
      smokeTexture.dispose();

      if (renderer) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20" aria-hidden="true" />;
};

export default GreenLightParticles;
