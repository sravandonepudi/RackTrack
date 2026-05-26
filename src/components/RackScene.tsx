import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const RACK_MODEL_URL = '/data_center_server_rack.glb';

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function liftRackMaterial(material: THREE.Material) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return material;

  const lifted = material.clone();
  lifted.color.lerp(new THREE.Color('#7dd3fc'), 0.12);
  lifted.emissive = new THREE.Color('#061a25');
  lifted.emissiveIntensity = 0.42;
  lifted.metalness = Math.max(lifted.metalness, 0.35);
  lifted.roughness = Math.min(lifted.roughness, 0.68);

  return lifted;
}

function RackModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(RACK_MODEL_URL);

  const rackScene = useMemo(() => scene.clone(true), [scene]);

  const transform = useMemo(() => {
    rackScene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material = Array.isArray(object.material)
          ? object.material.map(liftRackMaterial)
          : liftRackMaterial(object.material);

        const edgeLines = new THREE.LineSegments(
          new THREE.EdgesGeometry(object.geometry, 38),
          new THREE.LineBasicMaterial({
            color: '#22d3ee',
            transparent: true,
            opacity: 0.11,
            blending: THREE.AdditiveBlending,
          })
        );
        edgeLines.renderOrder = 2;
        object.add(edgeLines);
      }
    });

    rackScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(rackScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = 2.85 / Math.max(size.y, 1);
    const position = new THREE.Vector3(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    return {
      position: position.toArray() as [number, number, number],
      scale,
    };
  }, [rackScene]);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = -0.24 + Math.sin(state.clock.elapsedTime * 0.35) * 0.07;
  });

  return (
    <group ref={groupRef}>
      <primitive object={rackScene} position={transform.position} scale={transform.scale} dispose={null} />
    </group>
  );
}

function ScanParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      seed[i3] = (seededUnit(i + 1) - 0.5) * 1.7;
      seed[i3 + 1] = (seededUnit(i + 101) - 0.5) * 3.2;
      seed[i3 + 2] = (seededUnit(i + 201) - 0.5) * 1.7;
      pos[i3] = seed[i3];
      pos[i3 + 1] = seed[i3 + 1];
      pos[i3 + 2] = seed[i3 + 2];
    }

    return { positions: pos, seeds: seed };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const positionAttribute = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const positionArray = positionAttribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const risingY = ((seeds[i3 + 1] + time * 0.18 + 1.6) % 3.2) - 1.6;
      positionArray[i3] = seeds[i3] + Math.sin(time * 0.8 + i * 1.7) * 0.025;
      positionArray[i3 + 1] = risingY;
      positionArray[i3 + 2] = seeds[i3 + 2] + Math.cos(time * 0.6 + i) * 0.018;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#06b6d4"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ScanLine() {
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.45) * 1.32;
  });

  return (
    <mesh ref={lineRef} position={[0, 0, 0.36]}>
      <planeGeometry args={[1.05, 0.012]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.38}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.32} color="#cbd5e1" />
      <directionalLight position={[4, 5, 4]} intensity={1.7} color="#f8fafc" castShadow />
      <directionalLight position={[-3, 2.4, 1.8]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[0, 1.6, 1.8]} intensity={0.9} color="#22d3ee" distance={5} />
      <pointLight position={[0.65, -1.15, 1.2]} intensity={0.55} color="#f59e0b" distance={3} />

      <Float speed={1} rotationIntensity={0.035} floatIntensity={0.08}>
        <RackModel />
        <ScanParticles />
        <ScanLine />
      </Float>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0]} receiveShadow>
        <circleGeometry args={[3, 64]} />
        <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.12} transparent opacity={0.54} />
      </mesh>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={1.55}
        maxDistance={4.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.82}
        target={[0, 0, 0]}
        makeDefault
      />
    </>
  );
}

export default function RackScene() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'block' }}>
      <Canvas
        camera={{ position: [0, 0.02, 2.2], fov: 68 }}
        dpr={[1, 1.75]}
        shadows
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor('#000000', 1)}
        style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(RACK_MODEL_URL);
