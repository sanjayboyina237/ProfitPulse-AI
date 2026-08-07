import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Globe as GlobeIcon, Sparkles, MapPin } from 'lucide-react';
import { MOCK_COUNTRIES } from '../../data/mockCountries';
import type { CountryData } from '../../types';
import { useApp } from '../../context/AppContext';

export const Interactive3DGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setSelectedCountry } = useApp();
  const [hoveredCountry, setHoveredCountry] = useState<CountryData | null>(null);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = containerRef.current.clientHeight || 550;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    try {
      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 220;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, failIfMajorPerformanceCaveat: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Clear existing canvas
      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(renderer.domElement);

      // Group for Globe & Pins
      const globeGroup = new THREE.Group();
      scene.add(globeGroup);

      // Core Wireframe / Glass Sphere
      const sphereGeo = new THREE.SphereGeometry(60, 48, 48);
      const sphereMat = new THREE.MeshPhongMaterial({
        color: 0x091428,
        emissive: 0x050c1a,
        specular: 0x00f0ff,
        shininess: 25,
        wireframe: false,
        transparent: true,
        opacity: 0.85,
      });
      const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      globeGroup.add(globeMesh);

      // Glowing Atmosphere Grid Mesh
      const gridGeo = new THREE.SphereGeometry(60.5, 36, 36);
      const gridMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const gridMesh = new THREE.Mesh(gridGeo, gridMat);
      globeGroup.add(gridMesh);

      // Outer Glow Ring
      const atmosphereGeo = new THREE.SphereGeometry(65, 32, 32);
      const atmosphereMat = new THREE.MeshBasicMaterial({
        color: 0x7000ff,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.18,
      });
      const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
      globeGroup.add(atmosphereMesh);

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.5);
      dirLight1.position.set(100, 100, 100);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x7000ff, 1.8);
      dirLight2.position.set(-100, -100, -100);
      scene.add(dirLight2);

      // Convert Lat/Lng to Vector3
      const latLngToVector3 = (lat: number, lng: number, radius: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        const x = -(radius * Math.sin(phi) * Math.cos(theta));
        const z = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        return new THREE.Vector3(x, y, z);
      };

      // Color map helper
      const getHexColor = (status: string) => {
        switch (status) {
          case 'Dark Green': return 0x00ff9d;
          case 'Light Green': return 0x10b981;
          case 'Yellow': return 0xfacc15;
          case 'Orange': return 0xf97316;
          case 'Red': return 0xff2a6d;
          default: return 0x00f0ff;
        }
      };

      // Country Pins & Pulsing Rings
      const pinsMap: { mesh: THREE.Mesh; country: CountryData }[] = [];

      MOCK_COUNTRIES.forEach((country) => {
        const pos = latLngToVector3(country.lat, country.lng, 60.8);
        
        const pinGeo = new THREE.SphereGeometry(2.2, 16, 16);
        const pinMat = new THREE.MeshBasicMaterial({
          color: getHexColor(country.statusColor),
        });
        const pinMesh = new THREE.Mesh(pinGeo, pinMat);
        pinMesh.position.copy(pos);
        
        // Store reference
        pinMesh.userData = { country };
        globeGroup.add(pinMesh);
        pinsMap.push({ mesh: pinMesh, country });

        // Pulsing outer halo ring
        const ringGeo = new THREE.RingGeometry(2.8, 4.2, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: getHexColor(country.statusColor),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(pos);
        ringMesh.lookAt(0, 0, 0);
        globeGroup.add(ringMesh);
      });

      // Animation Loop
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const animate = () => {
        if (!isDragging) {
          globeGroup.rotation.y += 0.0025;
        }
        if (renderer) {
          renderer.render(scene, camera);
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Mouse Interaction Handling
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!renderer) return;
        if (isDragging) {
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;

          globeGroup.rotation.y += deltaX * 0.005;
          globeGroup.rotation.x += deltaY * 0.005;

          previousMousePosition = { x: e.clientX, y: e.clientY };
        }

        // Hover Raycasting
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pinsMap.map(p => p.mesh));

        if (intersects.length > 0) {
          const matched = intersects[0].object.userData.country as CountryData;
          setHoveredCountry(matched);
        } else {
          setHoveredCountry(null);
        }
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      const onClick = (e: MouseEvent) => {
        if (!renderer) return;
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(pinsMap.map(p => p.mesh));

        if (intersects.length > 0) {
          const clicked = intersects[0].object.userData.country as CountryData;
          setSelectedCountry(clicked);
        }
      };

      const domElem = renderer.domElement;
      domElem.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      domElem.addEventListener('click', onClick);

      // Resize Handler
      const handleResize = () => {
        if (!containerRef.current || !renderer) return;
        const w = containerRef.current.clientWidth || 800;
        const h = containerRef.current.clientHeight || 550;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        domElem.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        domElem.removeEventListener('click', onClick);
        window.removeEventListener('resize', handleResize);
        if (renderer) {
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn("WebGL renderer init exception, falling back to 2D Spatial view:", err);
      setWebGLError(true);
    }
  }, []);

  return (
    <div className="relative w-full h-[600px] glass-panel rounded-3xl border border-slate-700/80 p-6 overflow-hidden flex flex-col justify-between">
      
      {/* Top Bar Overlay */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neon-cyan uppercase tracking-wider">
            <GlobeIcon className="w-4 h-4 text-neon-cyan" />
            3D Spatial Business Heatmap
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
            Interactive Global Sovereign Intelligence
          </h3>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-3 glass-panel px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-[11px] font-mono pointer-events-auto">
          <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-400" /> High Growth</span>
          <span className="flex items-center gap-1 text-yellow-400"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Stable</span>
          <span className="flex items-center gap-1 text-orange-400"><span className="w-2 h-2 rounded-full bg-orange-400" /> Slowdown</span>
          <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 rounded-full bg-rose-400" /> Declining</span>
        </div>
      </div>

      {/* WebGL Canvas Mount OR Fallback Grid */}
      {webGLError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-space-900/90 z-10">
          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-neon-cyan mb-4 animate-pulse">
            <GlobeIcon className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-white mb-2">2D Sovereign Heatmap Mode</h4>
          <p className="text-xs text-slate-300 max-w-md mb-6">
            WebGL acceleration is restricted on this browser profile. Click any sovereign nation below to inspect corporate health & daily P&L.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            {MOCK_COUNTRIES.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCountry(c)}
                className="p-3 rounded-xl glass-panel hover:border-cyan-500/40 text-left text-xs font-mono transition-all"
              >
                <div className="font-bold text-white flex items-center justify-between">
                  <span>{c.name}</span>
                  <span className="text-neon-cyan">{c.code}</span>
                </div>
                <span className="text-[10px] text-neon-emerald block mt-1">GDP +{c.gdpGrowth}%</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />
      )}

      {/* Hover Tooltip Overlay */}
      {hoveredCountry && !webGLError && (
        <div className="absolute top-24 left-8 z-20 glass-panel p-4 rounded-2xl border border-cyan-500/40 shadow-2xl max-w-xs animate-in fade-in zoom-in-95 pointer-events-none">
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neon-cyan" />
              {hoveredCountry.name}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-neon-cyan font-bold">
              {hoveredCountry.code}
            </span>
          </div>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p>GDP Growth: <span className="text-neon-emerald font-bold">+{hoveredCountry.gdpGrowth}%</span></p>
            <p>Health Score: <span className="text-neon-cyan font-bold">{hoveredCountry.businessHealthScore}/100</span></p>
            <p>Top Growth: <span className="text-slate-100">{hoveredCountry.highestGrowthIndustry}</span></p>
          </div>
          <p className="text-[10px] text-cyan-300/80 mt-2 italic border-t border-slate-800 pt-1">
            Click country node for deep-dive metrics & AI predictions
          </p>
        </div>
      )}

      {/* Bottom Instructions */}
      <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 pointer-events-none">
        <span className="flex items-center gap-2 font-mono">
          <Sparkles className="w-4 h-4 text-purple-400" /> Click any country node to inspect corporate health & daily P&L
        </span>
        <span className="hidden sm:inline font-mono">Drag to Rotate | Scroll to Zoom</span>
      </div>

    </div>
  );
};
