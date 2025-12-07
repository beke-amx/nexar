"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const aspect = 1.2;
const cameraZ = 300;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

function genRandomNumbers(min, max, count) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(Math.random() * (max - min) + min);
  }
  return arr;
}

function Globe({ globeConfig, data }) {
  const globeRef = useRef();
  const { camera } = useThree();

  useEffect(() => {
    if (camera) {
      camera.position.z = cameraZ;
    }
  }, [camera]);

  const config = useMemo(() => ({
    pointSize: 1,
    atmosphereColor: "#60a5fa",
    showAtmosphere: true,
    atmosphereAltitude: 0.15,
    polygonColor: "rgba(96, 165, 250, 0.3)",
    globeColor: "#1e40af",
    emissive: "#1e3a8a",
    emissiveIntensity: 0.3,
    shininess: 0.9,
    arcTime: 2000,
    autoRotate: true,
    autoRotateSpeed: 0.5,
    ambientLight: "#60a5fa",
    directionalLeftLight: "#93c5fd",
    directionalTopLight: "#93c5fd",
    pointLight: "#60a5fa",
    ...globeConfig,
  }), [globeConfig]);

  useFrame(() => {
    if (globeRef.current && config.autoRotate) {
      globeRef.current.rotation.y += config.autoRotateSpeed * 0.01;
    }
  });

  const globeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: config.globeColor,
      emissive: config.emissive,
      emissiveIntensity: config.emissiveIntensity,
      roughness: 0.7,
      metalness: 0.3,
      transparent: true,
      opacity: 0.9,
    });
  }, [config]);

  return (
    <>
      <ambientLight color={config.ambientLight} intensity={0.8} />
      <directionalLight
        color={config.directionalLeftLight}
        position={[-400, 100, 400]}
        intensity={1.2}
      />
      <directionalLight
        color={config.directionalTopLight}
        position={[-200, 500, 200]}
        intensity={1.0}
      />
      <pointLight
        color={config.pointLight}
        position={[-200, 500, 200]}
        intensity={0.5}
      />
      
      <group ref={globeRef}>
        <Sphere args={[100, 50, 50]}>
          <primitive object={globeMaterial} attach="material" />
        </Sphere>
        
        {config.showAtmosphere && (
          <Sphere args={[100 + config.atmosphereAltitude, 50, 50]}>
            <meshBasicMaterial
              color={config.atmosphereColor}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </Sphere>
        )}
      </group>

      {data && data.map((arc, index) => (
        <Arc
          key={`arc-${index}`}
          startLat={arc.startLat}
          startLng={arc.startLng}
          endLat={arc.endLat}
          endLng={arc.endLng}
          color={arc.color}
          arcAlt={arc.arcAlt}
          arcTime={config.arcTime}
        />
      ))}
    </>
  );
}

function Arc({ startLat, startLng, endLat, endLng, color, arcAlt, arcTime = 2000 }) {
  const lineRef = useRef();
  const progressRef = useRef(0);

  const points = useMemo(() => {
    const startVec = latLngToVector3(startLat, startLng, 100);
    const endVec = latLngToVector3(endLat, endLng, 100);
    
    const altitude = arcAlt || 0.3;
    const midPoint = startVec.clone().lerp(endVec, 0.5).multiplyScalar(1 + altitude);
    
    const curve = new THREE.QuadraticBezierCurve3(
      startVec,
      midPoint,
      endVec
    );
    
    return curve.getPoints(50);
  }, [startLat, startLng, endLat, endLng, arcAlt]);

  useFrame((state, delta) => {
    if (lineRef.current) {
      progressRef.current += (delta * 1000) / arcTime;
      if (progressRef.current > 1) {
        progressRef.current = 0;
      }
      
      const opacity = Math.sin(progressRef.current * Math.PI);
      if (lineRef.current.material) {
        lineRef.current.material.opacity = Math.max(0.2, opacity);
      }
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        linewidth={2}
      />
    </line>
  );
}

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}

export function World({ globeConfig, data }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          fov: 50,
          aspect: aspect,
          near: 0.1,
          far: 1000,
          position: [0, 0, cameraZ],
        }}
        gl={{ 
          antialias: true,
          alpha: true,
        }}
      >
        <Globe globeConfig={globeConfig} data={data} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}