import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function LED({ position, color = '#06b6d4', size = 0.02 }: { position: [number, number, number]; color?: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0] * 10 + position[1] * 5) * 0.5 + 0.5;
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + pulse * 0.5;
    }
    if (lightRef.current) {
      lightRef.current.intensity = pulse * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[size, size, size * 0.5]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <pointLight ref={lightRef} color={color} intensity={0.2} distance={0.15} decay={2} />
    </group>
  );
}

function LEDRow({ position, count = 6, color = '#10b981', spacing = 0.035 }: { position: [number, number, number]; count?: number; color?: string; spacing?: number }) {
  const leds = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      pos: [position[0] + i * spacing - (count * spacing) / 2, position[1], position[2]] as [number, number, number],
      c: i % 5 === 0 ? '#f59e0b' : color,
    }));
  }, [position, count, color, spacing]);

  return (
    <group>
      {leds.map((led) => (
        <LED key={led.key} position={led.pos} color={led.c} />
      ))}
    </group>
  );
}

function RJ45Port({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.018, 0.012, 0.008]} />
      <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.7} />
    </mesh>
  );
}

function PortRow({ position, count = 12, y = 0, color = '#10b981' }: { position: [number, number, number]; count?: number; y?: number; color?: string }) {
  const startX = -0.32;
  const spacing = 0.055;

  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => (
        <group key={i}>
          <RJ45Port position={[startX + i * spacing, y, 0.105]} />
          <LED position={[startX + i * spacing, y + 0.012, 0.105]} color={i % 3 === 0 ? '#f59e0b' : color} size={0.012} />
        </group>
      ))}
    </group>
  );
}

function Switch({ position, portCount = 24 }: { position: [number, number, number]; portCount?: number }) {
  const height = 0.088;
  const width = 0.78;
  const depth = 0.55;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[width - 0.01, height - 0.005, 0.002]} />
        <meshStandardMaterial color="#111827" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-0.28, 0.02, depth / 2 + 0.003]}>
        <boxGeometry args={[0.1, 0.015, 0.001]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.8} roughness={0.2} emissive="#06b6d4" emissiveIntensity={0.3} />
      </mesh>
      {portCount >= 24 && (
        <>
          <PortRow position={[0, 0.015, 0]} count={12} y={0.01} color="#10b981" />
          <PortRow position={[0, -0.015, 0]} count={12} y={0.01} color="#10b981" />
        </>
      )}
      <mesh position={[0.32, 0.02, depth / 2 + 0.003]}>
        <boxGeometry args={[0.03, 0.02, 0.005]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.5} />
      </mesh>
      <LED position={[0.35, -0.025, depth / 2 + 0.003]} color="#10b981" size={0.015} />
      <LED position={[0.33, -0.025, depth / 2 + 0.003]} color="#f59e0b" size={0.015} />
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`vent-l-${i}`} position={[-width / 2 - 0.001, -0.02 + i * 0.007, 0]}>
          <boxGeometry args={[0.002, 0.003, depth * 0.6]} />
          <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Server({ position }: { position: [number, number, number] }) {
  const height = 0.088;
  const width = 0.78;
  const depth = 0.6;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#1e1e2e" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[width - 0.01, height - 0.005, 0.002]} />
        <meshStandardMaterial color="#151525" metalness={0.7} roughness={0.3} />
      </mesh>
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`drive-l-${i}`} position={[-0.28 + i * 0.04, 0, depth / 2 + 0.003]}>
          <boxGeometry args={[0.032, 0.06, 0.005]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`drive-r-${i}`} position={[-0.08 + i * 0.04, 0, depth / 2 + 0.003]}>
          <boxGeometry args={[0.032, 0.06, 0.005]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0.2, 0.02, depth / 2 + 0.004]}>
        <cylinderGeometry args={[0.008, 0.008, 0.003, 16]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      <LEDRow position={[0.25, 0.02, depth / 2 + 0.003]} count={4} color="#10b981" spacing={0.02} />
      <LED position={[0.34, 0.0, depth / 2 + 0.003]} color="#06b6d4" size={0.012} />
      <LED position={[0.34, -0.015, depth / 2 + 0.003]} color="#10b981" size={0.012} />
      <mesh position={[0.12, 0.01, depth / 2 + 0.004]}>
        <boxGeometry args={[0.06, 0.03, 0.002]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.2} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

function PatchPanel({ position }: { position: [number, number, number] }) {
  const height = 0.044;
  const width = 0.78;
  const depth = 0.4;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[width - 0.01, height - 0.003, 0.002]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.5} />
      </mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`pp-t-${i}`}>
          <RJ45Port position={[-0.32 + i * 0.055, 0.008, depth / 2 + 0.003]} />
        </group>
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <group key={`pp-b-${i}`}>
          <RJ45Port position={[-0.32 + i * 0.055, -0.008, depth / 2 + 0.003]} />
        </group>
      ))}
      <mesh position={[0.36, 0, depth / 2 + 0.003]}>
        <boxGeometry args={[0.04, 0.025, 0.002]} />
        <meshStandardMaterial color="#1e293b" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function PDU({ position }: { position: [number, number, number] }) {
  const height = 0.044;
  const width = 0.78;
  const depth = 0.15;

  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[width, height - 0.003, 0.002]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.6} />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={`pdu-${i}`} position={[-0.28 + i * 0.08, 0, depth / 2 + 0.003]}>
          <boxGeometry args={[0.03, 0.025, 0.005]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <LED position={[0.35, 0.01, depth / 2 + 0.004]} color="#10b981" size={0.015} />
      <mesh position={[-0.35, 0, depth / 2 + 0.004]}>
        <boxGeometry args={[0.015, 0.02, 0.004]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

function RackFrame() {
  const frameColor = '#1e293b';
  const frameMetal = 0.85;
  const frameRough = 0.25;

  const railPositions: [number, number, number][] = [
    [-0.44, 0, -0.33],
    [0.44, 0, -0.33],
    [-0.44, 0, 0.33],
    [0.44, 0, 0.33],
  ];

  return (
    <group>
      {railPositions.map((pos, i) => (
        <mesh key={`rail-${i}`} position={pos} castShadow>
          <boxGeometry args={[0.03, 2.0, 0.03]} />
          <meshStandardMaterial color={frameColor} metalness={frameMetal} roughness={frameRough} />
        </mesh>
      ))}
      {([
        [0, 1.0, -0.33, 0.88, 0.025, 0.03],
        [0, 1.0, 0.33, 0.88, 0.025, 0.03],
        [-0.44, 1.0, 0, 0.03, 0.025, 0.66],
        [0.44, 1.0, 0, 0.03, 0.025, 0.66],
      ] as [number, number, number, number, number, number][]).map(([x, y, z, w, h, d], i) => (
        <mesh key={`top-${i}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={frameColor} metalness={frameMetal} roughness={frameRough} />
        </mesh>
      ))}
      {([
        [0, -1.0, -0.33, 0.88, 0.025, 0.03],
        [0, -1.0, 0.33, 0.88, 0.025, 0.03],
        [-0.44, -1.0, 0, 0.03, 0.025, 0.66],
        [0.44, -1.0, 0, 0.03, 0.025, 0.66],
      ] as [number, number, number, number, number, number][]).map(([x, y, z, w, h, d], i) => (
        <mesh key={`bottom-${i}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={frameColor} metalness={frameMetal} roughness={frameRough} />
        </mesh>
      ))}
      {[-0.5, 0, 0.5].map((yOffset, i) => (
        <group key={`mid-${i}`}>
          <mesh position={[0, yOffset, -0.33]} castShadow>
            <boxGeometry args={[0.88, 0.015, 0.02]} />
            <meshStandardMaterial color={frameColor} metalness={frameMetal} roughness={frameRough} />
          </mesh>
          <mesh position={[0, yOffset, 0.33]} castShadow>
            <boxGeometry args={[0.88, 0.015, 0.02]} />
            <meshStandardMaterial color={frameColor} metalness={frameMetal} roughness={frameRough} />
          </mesh>
        </group>
      ))}
      {[-0.40, 0.40].map((x, i) => (
        <mesh key={`guide-${i}`} position={[x, 0, 0.28]}>
          <boxGeometry args={[0.008, 1.9, 0.008]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.35]}>
        <boxGeometry args={[0.86, 1.95, 0.005]} />
        <meshStandardMaterial color="#111827" metalness={0.3} roughness={0.7} transparent opacity={0.15} />
      </mesh>
      {Array.from({ length: 20 }, (_, row) =>
        Array.from({ length: 8 }, (_, col) => (
          <mesh key={`perf-${row}-${col}`} position={[-0.35 + col * 0.1, -0.85 + row * 0.09, 0.353]}>
            <boxGeometry args={[0.06, 0.05, 0.002]} />
            <meshStandardMaterial color="#0f172a" metalness={0.2} roughness={0.8} transparent opacity={0.3} />
          </mesh>
        ))
      )}
      <mesh position={[0, 0.85, 0.2]} castShadow>
        <boxGeometry args={[0.6, 0.08, 0.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.25, 0.85, 0.3]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.25, 0.85, 0.3]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.3]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>
      {[-0.15, 0, 0.15].map((x, i) => (
        <mesh key={`cable-${i}`} position={[x, 0.9, 0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.15, 8]} />
          <meshStandardMaterial color={i === 0 ? '#06b6d4' : i === 1 ? '#10b981' : '#f59e0b'} metalness={0.2} roughness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.35]}>
        <boxGeometry args={[0.88, 1.95, 0.008]} />
        <meshStandardMaterial color="#0f172a" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
}

function ScanParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      (posAttr.array as Float32Array)[i3 + 1] += 0.003;
      if ((posAttr.array as Float32Array)[i3 + 1] > 1.2) {
        (posAttr.array as Float32Array)[i3 + 1] = -1.2;
      }
      (posAttr.array as Float32Array)[i3] = (Math.sin(time + i) * 0.02) + (posAttr.array as Float32Array)[i3];
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#06b6d4"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ScanLine() {
  const lineRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (lineRef.current) {
      const t = state.clock.elapsedTime * 0.3;
      lineRef.current.position.y = Math.sin(t) * 1.0;
    }
  });

  return (
    <mesh ref={lineRef} position={[0, 0, 0.36]}>
      <planeGeometry args={[0.9, 0.01]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function RackAssembly() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, -0.3, 0]}>
      <RackFrame />
      <Switch position={[0, 0.7, 0]} portCount={24} />
      <Switch position={[0, 0.55, 0]} portCount={24} />
      <Server position={[0, 0.35, 0]} />
      <Server position={[0, 0.15, 0]} />
      <PatchPanel position={[0, 0.0, 0]} />
      <Server position={[0, -0.2, 0]} />
      <Switch position={[0, -0.42, 0]} portCount={24} />
      <PDU position={[0, -0.55, 0]} />
      <ScanParticles />
      <ScanLine />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} color="#94a3b8" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#f1f5f9"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-3, 3, -2]} intensity={0.3} color="#06b6d4" />
      <pointLight position={[0, 2, -3]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, -1.5, 1]} intensity={0.3} color="#06b6d4" />
      <Environment preset="night" />
      <Float speed={1} rotationIntensity={0.05} floatIntensity={0.1}>
        <group scale={1.65}>
          <RackAssembly />
        </group>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
        <circleGeometry args={[3, 64]} />
        <meshStandardMaterial color="#030712" metalness={0.9} roughness={0.1} transparent opacity={0.5} />
      </mesh>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={1.5}
        maxDistance={5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
        makeDefault
      />
    </>
  );
}

export default function RackScene() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'block' }}>
      <Canvas
        camera={{ position: [0, 0, 2.1], fov: 70 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%', background: 'transparent', display: 'block' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
