"use client";

import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene, animations } = useGLTF("/model.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    // Scale and center
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.0 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    // Play the built-in animation
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const clip = animations[0];
      const action = mixer.current.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }

    return () => {
      mixer.current?.stopAllAction();
      mixer.current = null;
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    // Portrait framing — waist up, slightly above center
    camera.position.set(0, 1.3, 2.6);
    camera.lookAt(0, 1.15, 0);
  }, [camera]);
  return null;
}

export function HeroModel() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative mx-auto"
      style={{ width: "100%", maxWidth: 450, height: 520 }}
    >
      {/* Ambient glow underneath */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: 0,
          width: "80%",
          height: 100,
          background:
            "radial-gradient(ellipse at 50% 90%, rgba(255,77,0,0.08), rgba(255,77,0,0.02) 50%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
        onCreated={() => setLoaded(true)}
      >
        <CameraSetup />

        {/* Key light — warm, upper right */}
        <directionalLight
          position={[4, 5, 3]}
          intensity={2.0}
          color="#fff0e0"
          castShadow
        />

        {/* Fill light — cool, from left */}
        <directionalLight position={[-3, 3, 2]} intensity={0.5} color="#e0e8ff" />

        {/* Rim lights — orange accent from behind */}
        <pointLight position={[-1.5, 2, -2.5]} intensity={1.2} color="#ff4d00" distance={8} decay={2} />
        <pointLight position={[1.5, 2, -2.5]} intensity={0.8} color="#ff6a20" distance={8} decay={2} />

        {/* Top light */}
        <spotLight position={[0, 5, 1]} angle={0.6} penumbra={1} intensity={0.8} color="#ffffff" />

        {/* Low ambient for drama */}
        <ambientLight intensity={0.15} />

        <Suspense fallback={null}>
          <Model />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.35}
            scale={5}
            blur={2.5}
            far={4}
            color="#000000"
          />
          <Environment preset="city" environmentIntensity={0.2} />
        </Suspense>
      </Canvas>

      {/* Loading spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#FF4D00] border-t-transparent" />
        </div>
      )}
    </div>
  );
}
