'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CinematicLayerProps {
  className?: string;
}

export default function CinematicLayer({ className }: CinematicLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Add very soft ambient fog to create depth
    scene.fog = new THREE.FogExp2(0x050505, 0.001);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize
    containerRef.current.appendChild(renderer.domElement);

    // Create Particles
    const particlesCount = 800; // Cinematic density
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    const color1 = new THREE.Color(0xffaa55); // Warm orange
    const color2 = new THREE.Color(0xffffff); // White
    const color3 = new THREE.Color(0x3366ff); // Monitor blue glow

    for (let i = 0; i < particlesCount; i++) {
      // Spread across a wide volume
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

      // Mix colors for cinematic feel
      const mixRatio = Math.random();
      const mixedColor = mixRatio > 0.8 ? color3 : (mixRatio > 0.4 ? color1 : color2);
      
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      // Soft varying sizes
      sizes[i] = Math.random() * 4 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for soft glowing bokeh-like particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        void main() {
          vColor = color;
          // Add sine wave oscillation to individual particles
          vec3 pos = position;
          pos.y += sin(time * 0.5 + pos.x * 0.01) * 20.0;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z); // Depth scaling
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          // Soft circular shape with blur
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if(ll > 0.5) discard;
          
          // Soft glow edge
          float alpha = (0.5 - ll) * 2.0;
          // Dreamy atmosphere: lower opacity
          gl_FragColor = vec4(vColor, alpha * 0.4);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      material.uniforms.time.value = time;

      // Slow overall rotation for the dreamy feel
      particles.rotation.y = time * 0.05;
      particles.rotation.x = time * 0.02;

      // Parallax easing
      targetX = mouseX * 0.05;
      targetY = mouseY * 0.05;
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (-targetY - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      // Dispose Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
