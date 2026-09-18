import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // ─── Particles ───────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 160;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const particleData: { velocity: THREE.Vector3; originalPos: THREE.Vector3 }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 160;
      const y = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 60;
      positions[i * 3]     = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      particleData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.015
        ),
        originalPos: new THREE.Vector3(x, y, z),
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.7,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // ─── Connection Lines ─────────────────────────────────────────────────────
    const MAX_CONNECTIONS = 300;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors    = new Float32Array(MAX_CONNECTIONS * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25 })
    );
    scene.add(lineMat);

    // ─── Floating Orbs (large blurred spheres) ────────────────────────────────
    const orbData: { mesh: THREE.Mesh; speed: number; phase: number }[] = [];

    const orbConfigs = [
      { color: 0x6366f1, x: 30, y: 20, z: -20, r: 12 },
      { color: 0xec4899, x: -35, y: -10, z: -15, r: 10 },
      { color: 0x14b8a6, x: 5, y: -30, z: -10, r: 8 },
    ];

    orbConfigs.forEach(({ color, x, y, z, r }) => {
      const geo = new THREE.SphereGeometry(r, 32, 32);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.04,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      orbData.push({ mesh, speed: 0.0004 + Math.random() * 0.0003, phase: Math.random() * Math.PI * 2 });
    });

    // ─── Mouse interaction ────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ─── Resize handler ───────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // ─── Animation loop ───────────────────────────────────────────────────────
    let animId: number;
    const colorA = new THREE.Color(0x6366f1);
    const colorB = new THREE.Color(0x14b8a6);

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const t = time * 0.001;

      // Smooth mouse follow
      targetRotation.x += (mouse.y * 0.012 - targetRotation.x) * 0.05;
      targetRotation.y += (mouse.x * 0.012 - targetRotation.y) * 0.05;
      particleMesh.rotation.x = targetRotation.x;
      particleMesh.rotation.y = targetRotation.y + t * 0.015;

      // Update particle positions
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const pd = particleData[i];
        pos.array[i * 3]     += pd.velocity.x;
        pos.array[i * 3 + 1] += pd.velocity.y;
        pos.array[i * 3 + 2] += pd.velocity.z;

        // Bounce boundaries
        if (Math.abs(pos.array[i * 3])     > 80) pd.velocity.x *= -1;
        if (Math.abs(pos.array[i * 3 + 1]) > 45) pd.velocity.y *= -1;
        if (Math.abs(pos.array[i * 3 + 2]) > 30) pd.velocity.z *= -1;
      }
      pos.needsUpdate = true;

      // Draw connections
      let connCount = 0;
      const lpos = lineGeo.attributes.position as THREE.BufferAttribute;
      const lcol = lineGeo.attributes.color   as THREE.BufferAttribute;
      const THRESHOLD = 28;

      for (let i = 0; i < PARTICLE_COUNT && connCount < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && connCount < MAX_CONNECTIONS; j++) {
          const dx = pos.array[i * 3]     - pos.array[j * 3];
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1];
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < THRESHOLD) {
            const alpha = 1 - dist / THRESHOLD;
            const blendColor = colorA.clone().lerp(colorB, dist / THRESHOLD);

            const base = connCount * 6;
            lpos.array[base]     = pos.array[i * 3];
            lpos.array[base + 1] = pos.array[i * 3 + 1];
            lpos.array[base + 2] = pos.array[i * 3 + 2];
            lpos.array[base + 3] = pos.array[j * 3];
            lpos.array[base + 4] = pos.array[j * 3 + 1];
            lpos.array[base + 5] = pos.array[j * 3 + 2];

            lcol.array[base]     = blendColor.r * alpha;
            lcol.array[base + 1] = blendColor.g * alpha;
            lcol.array[base + 2] = blendColor.b * alpha;
            lcol.array[base + 3] = blendColor.r * alpha;
            lcol.array[base + 4] = blendColor.g * alpha;
            lcol.array[base + 5] = blendColor.b * alpha;

            connCount++;
          }
        }
      }
      lineGeo.setDrawRange(0, connCount * 2);
      lpos.needsUpdate = true;
      lcol.needsUpdate = true;

      // Animate orbs
      orbData.forEach(({ mesh, speed, phase }) => {
        mesh.position.y += Math.sin(t * speed * 1000 + phase) * 0.015;
        mesh.rotation.y += speed * 0.3;
      });

      renderer.render(scene, camera);
    };

    animate(0);

    // ─── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
