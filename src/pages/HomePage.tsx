import { useEffect, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

type NetworkDeviceBase = {
  id: string;
  label: string;
  color: string;
  ports: number;
  unitSpan: 1 | 2;
  startX: number;
  startY: number;
  startZ: number;
  startScale: number;
  startRx: number;
  startRy: number;
  startRz: number;
  dockRy: number;
  floatX: number;
  floatY: number;
  floatZ: number;
  phase: number;
  delay: number;
  hasSignal?: boolean;
  hasSlash?: boolean;
};

type NetworkDevice = NetworkDeviceBase & {
  height: number;
  rackTop: number;
};

type DeviceRefMap = Record<string, HTMLDivElement | null>;

const DEVICE_GAP = 8;
const DEVICE_HEIGHT_BY_UNIT = {
  1: 50,
  2: 62,
} as const;
const RACK_TOP_PADDING = 54;
const RACK_BOTTOM_PADDING = 76;
const RACK_SLOT_INSET = 54;
const RACK_WIDTH = 420;
const RACK_DEPTH = 46;
const WHAT_SECTION_SCROLL_VIEWPORTS = 0.85;
const WHAT_RACK_LEFT_COMPLETE_PROGRESS = 0.68;
const WHAT_TEXT_REVEAL_PROGRESS = 0.32;

const DEVICE_BASE: NetworkDeviceBase[] = [
  {
    id: 'edge-switch',
    label: 'EDGE SWITCH',
    color: '#796cff',
    ports: 16,
    unitSpan: 1,
    startX: 0.56,
    startY: -0.34,
    startZ: 150,
    startScale: 1,
    startRx: -13,
    startRy: -26,
    startRz: 2,
    dockRy: -7,
    floatX: 18,
    floatY: 16,
    floatZ: 32,
    phase: 0.2,
    delay: 0.02,
  },
  {
    id: 'firewall',
    label: 'FIREWALL',
    color: '#ff384f',
    ports: 10,
    unitSpan: 2,
    startX: -0.56,
    startY: -0.18,
    startZ: 220,
    startScale: 1.04,
    startRx: -11,
    startRy: 24,
    startRz: -2,
    dockRy: -7,
    floatX: 26,
    floatY: 18,
    floatZ: 42,
    phase: 1.4,
    delay: 0.08,
    hasSlash: true,
  },
  {
    id: 'core-switch',
    label: 'CORE SWITCH',
    color: '#7467ff',
    ports: 14,
    unitSpan: 1,
    startX: 0.56,
    startY: 0.32,
    startZ: 110,
    startScale: 0.94,
    startRx: -10,
    startRy: -21,
    startRz: 3,
    dockRy: -7,
    floatX: 20,
    floatY: 20,
    floatZ: 30,
    phase: 2.2,
    delay: 0.13,
  },
  {
    id: 'router',
    label: 'ROUTER',
    color: '#19ff8a',
    ports: 12,
    unitSpan: 1,
    startX: -0.56,
    startY: 0.45,
    startZ: 180,
    startScale: 0.98,
    startRx: -12,
    startRy: 23,
    startRz: -1,
    dockRy: -7,
    floatX: 24,
    floatY: 22,
    floatZ: 36,
    phase: 3.1,
    delay: 0.18,
    hasSignal: true,
  },
  {
    id: 'dmz-firewall',
    label: 'DMZ FIREWALL',
    color: '#ff4056',
    ports: 8,
    unitSpan: 2,
    startX: -0.56,
    startY: 0.25,
    startZ: 95,
    startScale: 0.9,
    startRx: -14,
    startRy: 28,
    startRz: 1,
    dockRy: -7,
    floatX: 28,
    floatY: 14,
    floatZ: 28,
    phase: 4,
    delay: 0.22,
    hasSlash: true,
  },
  {
    id: 'access-switch',
    label: 'ACCESS SWITCH',
    color: '#00d8ff',
    ports: 16,
    unitSpan: 1,
    startX: 0.56,
    startY: 0.48,
    startZ: 135,
    startScale: 0.92,
    startRx: -12,
    startRy: -24,
    startRz: -3,
    dockRy: -7,
    floatX: 20,
    floatY: 22,
    floatZ: 30,
    phase: 4.9,
    delay: 0.26,
  },
  {
    id: 'gateway',
    label: 'GATEWAY',
    color: '#21ff91',
    ports: 6,
    unitSpan: 1,
    startX: 0.56,
    startY: -0.02,
    startZ: 70,
    startScale: 0.82,
    startRx: -9,
    startRy: -23,
    startRz: 2,
    dockRy: -7,
    floatX: 22,
    floatY: 18,
    floatZ: 24,
    phase: 5.6,
    delay: 0.3,
    hasSignal: true,
  },
  {
    id: 'load-balancer',
    label: 'LOAD BALANCER',
    color: '#8677ff',
    ports: 12,
    unitSpan: 1,
    startX: -0.56,
    startY: 0.58,
    startZ: 60,
    startScale: 0.86,
    startRx: -11,
    startRy: 19,
    startRz: 2,
    dockRy: -7,
    floatX: 18,
    floatY: 18,
    floatZ: 24,
    phase: 6.4,
    delay: 0.34,
  },
  {
    id: 'wan-router',
    label: 'WAN ROUTER',
    color: '#18f58d',
    ports: 8,
    unitSpan: 2,
    startX: -0.56,
    startY: -0.42,
    startZ: 55,
    startScale: 0.76,
    startRx: -12,
    startRy: 26,
    startRz: -2,
    dockRy: -7,
    floatX: 16,
    floatY: 18,
    floatZ: 24,
    phase: 7.2,
    delay: 0.38,
    hasSignal: true,
  },
];

const NETWORK_DEVICES = DEVICE_BASE.reduce<NetworkDevice[]>((devices, device) => {
  const previous = devices[devices.length - 1];
  const rackTop = previous ? previous.rackTop + previous.height + DEVICE_GAP : 0;

  devices.push({
    ...device,
    height: DEVICE_HEIGHT_BY_UNIT[device.unitSpan],
    rackTop,
  });

  return devices;
}, []);

const RACK_BODY_HEIGHT =
  RACK_TOP_PADDING +
  RACK_BOTTOM_PADDING +
  NETWORK_DEVICES.reduce((total, device, index) => {
    const gap = index === NETWORK_DEVICES.length - 1 ? 0 : DEVICE_GAP;
    return total + device.height + gap;
  }, 0);

const RACK_HOLE_COUNT = Math.max(18, Math.round(RACK_BODY_HEIGHT / 22));

const STATS = [
  { value: '40–60%', label: 'drift between CMDB and physical reality in production' },
  { value: '~30%', label: 'of unplanned outages traced to inventory and config drift' },
  { value: '15–20%', label: 'of installed assets are ghosts, still drawing power and license cost' },
  { value: '3–6 weeks', label: 'of manual evidence prep per compliance cycle' },
  { value: '20–40 min', label: 'of every incident lost confirming what\'s actually in the rack' },
];

const CAPABILITIES = [
  { icon: '⬡', title: 'Physical Inventory',      body: 'Every device in every rack, identified and verified. Continuous, not annual.' },
  { icon: '⇄', title: 'Port & Cable Intelligence', body: 'Every port, every cable, every connection — mapped and searchable.' },
  { icon: '◈', title: 'Topology & 3D Twin',        body: 'Your data center, rendered in three dimensions and kept current.' },
  { icon: '⚿', title: 'Security Posture',          body: 'Firmware and vulnerability state surfaced per device, in real time.' },
  { icon: '⚡', title: 'Incident Response',         body: 'Find the device, find the port, before you open the door.' },
  { icon: '▦', title: 'Capacity Planning',          body: 'Plan against measured reality, not last year\'s spreadsheet.' },
  { icon: '⊕', title: 'Procurement Guidance',       body: 'Compatible parts and modules, recommended automatically.' },
  { icon: '✓', title: 'Compliance Evidence',        body: 'Audit-ready artifacts, generated continuously.' },
];

const PROOF_ROWS = [
  { metric: 'Time to characterize a rack', before: '2–5 days, manual', after: 'Minutes, from a phone sweep' },
  { metric: 'CMDB reconciliation cycle',   before: 'Quarterly, error-prone', after: 'Continuous, automated' },
  { metric: 'Ghost asset discovery',       before: 'Never, or by accident', after: 'First sweep' },
  { metric: 'Compliance evidence prep',    before: '3–6 weeks per cycle', after: 'Always ready' },
  { metric: 'Incident device lookup',      before: '20–40 min per incident', after: 'Seconds' },
];

const ROLES = [
  { id: 'infrastructure', title: 'Infrastructure and data center leaders' },
  { id: 'network',        title: 'Network architects and engineers' },
  { id: 'security',       title: 'Security and vulnerability teams' },
  { id: 'compliance',     title: 'Compliance and audit owners' },
  { id: 'incident',       title: 'Incident responders and on-call engineers' },
  { id: 'ma',             title: 'M&A and migration teams' },
];

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function easeInOutCubic(value: number) {
  return value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function useRackScrollAnimation(
  showcaseRef: RefObject<HTMLDivElement | null>,
  stageRef: RefObject<HTMLDivElement | null>,
  deviceRefs: RefObject<DeviceRefMap>,
  whatRef: RefObject<HTMLElement | null>,
  capRef: RefObject<HTMLElement | null>,
  capStackRef: RefObject<HTMLDivElement | null>,
  capCardRefs: RefObject<(HTMLElement | null)[]>,
  proofRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const showcase = showcaseRef.current;
    const stage = stageRef.current;

    if (!showcase || !stage) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const render = (time: number) => {
      const showcaseRect = showcase.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scrollableDistance = Math.max(1, showcase.offsetHeight - window.innerHeight);
      const rawProgress = clamp(-showcaseRect.top / scrollableDistance);
      const brandProgress = easeOutCubic(clamp(rawProgress / 0.16));
      const headlineProgress = easeOutCubic(clamp((rawProgress - 0.1) / 0.18));
      const copyOutProgress = easeOutCubic(clamp((rawProgress - 0.36) / 0.18));
      const dockProgress = easeInOutCubic(clamp((rawProgress - 0.5) / 0.4));
      const rackProgress = easeOutCubic(clamp((rawProgress - 0.42) / 0.16));
      const cornerProgress = easeInOutCubic(clamp((rawProgress - 0.92) / 0.075));
      const installedProgress = easeOutCubic(clamp((dockProgress - 0.965) / 0.035));
      const scanProgress = dockProgress > 0.985 ? (time * 0.00034) % 1 : 0;
      const stageOpacity = 1;
      const stageWidth = stageRect.width;
      const stageHeight = stageRect.height;
      const what = whatRef.current;
      const cap = capRef.current;
      const capStack = capStackRef.current;
      const proof = proofRef.current;
      const whatRect = what?.getBoundingClientRect();
      const capRect = cap?.getBoundingClientRect();
      const capStackRect = capStack?.getBoundingClientRect();
      const proofRect = proof?.getBoundingClientRect();
      const whatRawProgress = whatRect
        ? clamp((window.innerHeight * 0.88 - whatRect.top) / (window.innerHeight * WHAT_SECTION_SCROLL_VIEWPORTS))
        : 0;
      const capApproachProgress = capRect
        ? easeInOutCubic(clamp((window.innerHeight * 0.86 - capRect.top) / (window.innerHeight * 0.42)))
        : 0;
      const postProblemProgress = rawProgress > 0.985 ? whatRawProgress : 0;
      const whatRackTravelProgress = easeInOutCubic(clamp(postProblemProgress / WHAT_RACK_LEFT_COMPLETE_PROGRESS));
      const rackReturnProgress = rawProgress > 0.985 ? capApproachProgress : 0;
      const whatTextProgress = easeOutCubic(
        clamp((postProblemProgress - WHAT_RACK_LEFT_COMPLETE_PROGRESS) / WHAT_TEXT_REVEAL_PROGRESS)
      );
      // How far the "What" section has scrolled *above* the viewport (0 = section top at viewport bottom, 1 = section fully gone)
      const whatScrolledAwayProgress = whatRect
        ? easeInOutCubic(clamp((-whatRect.bottom) / (window.innerHeight * 0.4)))
        : 0;
      // Rack swings left→right only after the "What" section has scrolled away
      const postSectionSwingProgress = rawProgress > 0.985 ? whatScrolledAwayProgress : 0;
      // Proof section: rack travels from right → left as proof enters viewport
      const proofApproachProgress = proofRect
        ? easeInOutCubic(clamp((window.innerHeight * 0.82 - proofRect.top) / (window.innerHeight * 0.55)))
        : 0;
      const proofRackTravelProgress = proofApproachProgress;
      // Cap section: rack travels right → left smoothly as user scrolls through the 900svh cap section
      const capScrollProgress = cap
        ? easeInOutCubic(clamp((-cap.getBoundingClientRect().top) / (cap.offsetHeight - window.innerHeight)))
        : 0;
      const capRackTravelProgress = postSectionSwingProgress >= 1 ? capScrollProgress : 0;
      const capRevealProgress = easeOutCubic(clamp((rackReturnProgress - 0.78) / 0.22));
      const rackScale = Math.min(stageWidth < 1100 ? 0.86 : 1.1, (stageHeight - 78) / RACK_BODY_HEIGHT);
      const cornerScale = Math.min(0.66, rackScale * 0.72);
      const activeRackScale = lerp(rackScale, cornerScale, cornerProgress);
      const cornerX = stageWidth / 2 - RACK_WIDTH * cornerScale * 0.62 - 56;
      const cornerY = stageHeight / 2 - RACK_BODY_HEIGHT * cornerScale * 0.56 - 54;
      const dockedGroupX = lerp(0, cornerX, cornerProgress);
      const rackSwingOffset = Math.min(380, Math.max(280, stageWidth * 0.2));
      const leftRackTargetX = -stageWidth / 2 + rackSwingOffset;
      const rightRackTargetX = stageWidth / 2 - rackSwingOffset;

      // Phase 1: rack eases to left as "What" section enters  (whatRackTravelProgress 0→1)
      // Phase 2: rack holds at left while text is visible      (postProblemProgress 0.68→1)
      // Phase 3: after section scrolls away, rack swings left→right (postSectionSwingProgress 0→1)
      // Phase 4: during cap section scroll, rack travels right→left (capRackTravelProgress 0→1)
      // Phase 5: as proof section enters, rack is already left, stays left
      const rackAtLeft = postProblemProgress > 0;
      const swingToRight = easeInOutCubic(clamp(postSectionSwingProgress));

      // Phase 1 & 2: lerp from dockedGroupX → leftRackTargetX
      const leftTravelX = lerp(dockedGroupX, leftRackTargetX, whatRackTravelProgress);
      // Phase 3: swing left → right
      const swungX = lerp(leftRackTargetX, rightRackTargetX, swingToRight);
      // Phase 4: cap scroll — right → left
      const capTravelX = lerp(rightRackTargetX, leftRackTargetX, capRackTravelProgress);
      // Phase 5: proof — already at left, stays
      const proofX = leftRackTargetX;

      const leftPhaseGroupX = rackAtLeft
        ? proofRackTravelProgress > 0 ? proofX
          : capRackTravelProgress > 0 ? capTravelX
          : postSectionSwingProgress > 0 ? swungX
          : leftTravelX
        : dockedGroupX;
      const groupX = lerp(leftPhaseGroupX, dockedGroupX, rackReturnProgress);

      // Rotation: rack faces right (negative ry = faces right in 3D) during cap travel
      const baseRackRy = lerp(-7, 9, whatRackTravelProgress);
      const swungRackRy = lerp(9, -9, swingToRight);
      // During cap travel: starts facing right (-9), stays facing right as it moves left
      const capRackRy = lerp(-9, -9, capRackTravelProgress); // holds right-facing
      const proofRackRy = -9; // stays right-facing at proof
      const rackRotateY = proofRackTravelProgress > 0 ? proofRackRy
        : capRackTravelProgress > 0 ? capRackRy
        : postSectionSwingProgress > 0 ? swungRackRy
        : baseRackRy;

      const baseAssemblyRy = lerp(lerp(0, -18, cornerProgress), 18, whatRackTravelProgress);
      const swungAssemblyRy = lerp(18, -18, swingToRight);
      const capAssemblyRy = lerp(-18, -18, capRackTravelProgress); // holds right-facing tilt
      const proofAssemblyRy = -18;
      const assemblyRotateY = proofRackTravelProgress > 0 ? proofAssemblyRy
        : capRackTravelProgress > 0 ? capAssemblyRy
        : postSectionSwingProgress > 0 ? swungAssemblyRy
        : baseAssemblyRy;
      const groupY = lerp(0, cornerY, cornerProgress);
      const assemblyRotateX = lerp(0, -2, cornerProgress);
      const rackCenterY = 0;
      const idleStrength = motionQuery.matches ? 0 : 1;

      showcase.style.setProperty('--intro-title-opacity', (1 - brandProgress).toFixed(4));
      showcase.style.setProperty('--intro-title-y', `${brandProgress * -86}px`);
      showcase.style.setProperty('--intro-title-scale', (1 + brandProgress * 0.08).toFixed(4));
      showcase.style.setProperty('--headline-opacity', headlineProgress.toFixed(4));
      showcase.style.setProperty('--headline-y', `${(1 - headlineProgress) * 42}px`);
      showcase.style.setProperty('--copy-opacity', (1 - copyOutProgress).toFixed(4));
      showcase.style.setProperty('--copy-y', `${copyOutProgress * -72}px`);
      showcase.style.setProperty('--copy-scale', (1 - copyOutProgress * 0.05).toFixed(4));
      showcase.style.setProperty('--assembly-x', `${groupX.toFixed(2)}px`);
      showcase.style.setProperty('--assembly-y', `${groupY.toFixed(2)}px`);
      showcase.style.setProperty('--assembly-rx', `${assemblyRotateX.toFixed(2)}deg`);
      showcase.style.setProperty('--assembly-ry', `${assemblyRotateY.toFixed(2)}deg`);
      showcase.style.setProperty('--rack-opacity', Math.min(0.94, rackProgress).toFixed(4));
      showcase.style.setProperty('--rack-y', `${((1 - rackProgress) * 24).toFixed(2)}px`);
      showcase.style.setProperty('--rack-rx', '-5deg');
      showcase.style.setProperty('--rack-ry', `${rackRotateY.toFixed(2)}deg`);
      showcase.style.setProperty('--rack-scale', activeRackScale.toFixed(4));
      showcase.style.setProperty('--installed-opacity', installedProgress.toFixed(4));
      showcase.style.setProperty('--scan-opacity', dockProgress > 0.985 && rawProgress < 0.985 ? '1' : '0');
      showcase.style.setProperty('--scan-y', `${scanProgress * 100}%`);
      showcase.style.setProperty('--stage-opacity', stageOpacity.toFixed(4));
      stage.style.pointerEvents = rawProgress > 0.985 ? 'none' : 'auto';

      if (what) {
        what.style.setProperty('--what-opacity', whatTextProgress.toFixed(4));
        what.style.setProperty('--what-y', `${((1 - whatTextProgress) * 46).toFixed(2)}px`);
      }

      if (cap) {
        cap.style.setProperty('--cap-opacity', capRevealProgress.toFixed(4));
        cap.style.setProperty('--cap-y', `${((1 - capRevealProgress) * 34).toFixed(2)}px`);
      }

      if (capStackRect) {
        // capStackRect is the grid container; animate cards as it enters the viewport
        const gridEnterProgress = easeOutCubic(
          clamp((window.innerHeight * 0.9 - capStackRect.top) / (window.innerHeight * 0.5))
        );

        capCardRefs.current.forEach((card, index) => {
          if (!card) return;

          // Stagger: each card starts 0.06 later than the previous
          const stagger = index * 0.06;
          const cardProgress = easeOutCubic(clamp((gridEnterProgress - stagger) / (1 - stagger)));
          const y = lerp(52, 0, cardProgress);
          const scale = lerp(0.92, 1, cardProgress);

          card.style.setProperty('--card-y', `${y.toFixed(2)}px`);
          card.style.setProperty('--card-scale', scale.toFixed(4));
          card.style.setProperty('--card-opacity', cardProgress.toFixed(4));
        });
      }

      NETWORK_DEVICES.forEach((device, index) => {
        const element = deviceRefs.current[device.id];

        if (!element) {
          return;
        }

        const localProgress = easeInOutCubic(clamp((dockProgress - device.delay) / (1 - device.delay)));
        const floatAmount = (1 - localProgress) * idleStrength;
        const elapsed = time * 0.001;
        const maxStartX = Math.max(0, stageWidth / 2 - 330);
        const maxStartY = Math.max(0, stageHeight / 2 - 112);
        const startX = clamp(device.startX * stageWidth, -maxStartX, maxStartX);
        const startY = clamp(device.startY * stageHeight, -maxStartY, maxStartY);
        const targetX = 0;
        const targetY =
          rackCenterY +
          (-RACK_BODY_HEIGHT / 2 + RACK_TOP_PADDING + device.rackTop + device.height / 2) * activeRackScale;
        const x = lerp(startX, targetX, localProgress) + Math.sin(elapsed * 0.85 + device.phase) * device.floatX * floatAmount;
        const y = lerp(startY, targetY, localProgress) + Math.cos(elapsed * 0.72 + device.phase) * device.floatY * floatAmount;
        const z = lerp(device.startZ, 72, localProgress) + Math.sin(elapsed * 0.64 + device.phase) * device.floatZ * floatAmount;
        const rx = lerp(device.startRx, -5, localProgress);
        const ry = lerp(device.startRy, device.dockRy, localProgress);
        const rz = lerp(device.startRz, 0, localProgress);
        const scale = lerp(device.startScale, activeRackScale, localProgress);

        element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) translate(-50%, -50%) scale(${scale.toFixed(4)})`;
        const flyingOpacity = (0.58 + localProgress * 0.38 + (1 - localProgress) * 0.2) * (1 - installedProgress);
        element.style.opacity = flyingOpacity.toFixed(4);
        element.style.zIndex = String(10 + index);
        element.style.setProperty('--nd-rx', `${rx.toFixed(2)}deg`);
        element.style.setProperty('--nd-ry', `${ry.toFixed(2)}deg`);
        element.style.setProperty('--nd-rz', `${rz.toFixed(2)}deg`);
      });

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [capCardRefs, capRef, capStackRef, deviceRefs, proofRef, showcaseRef, stageRef, whatRef]);
}

function RackFrame() {
  return (
    <div
      className="rack-dock"
      aria-hidden="true"
      style={
        {
          '--rack-width': `${RACK_WIDTH}px`,
          '--rack-height': `${RACK_BODY_HEIGHT}px`,
          '--rack-depth': `${RACK_DEPTH}px`,
          '--rack-slot-inset': `${RACK_SLOT_INSET}px`,
        } as CSSProperties
      }
    >
      <div className="rack-depth rack-depth--top" />
      <div className="rack-depth rack-depth--right" />
      <div className="rack-depth rack-depth--bottom" />
      <div className="rack-front">
        <div className="rack-backplane" />
        {NETWORK_DEVICES.map((device) => (
          <span
            className="rack-slot"
            key={`slot-${device.id}`}
            style={{
              top: RACK_TOP_PADDING + device.rackTop,
              height: device.height,
            }}
          />
        ))}
        <div className="rack-installed-devices" aria-hidden="true">
          {NETWORK_DEVICES.map((device) => (
            <div
              className="rack-installed-device"
              key={`installed-${device.id}`}
              style={{
                '--device-h': `${device.height}px`,
                '--nd-rx': '-5deg',
                '--nd-ry': `${device.dockRy}deg`,
                '--nd-rz': '0deg',
                top: RACK_TOP_PADDING + device.rackTop,
                height: device.height,
              } as CSSProperties}
            >
              <NetworkDeviceCard {...device} />
            </div>
          ))}
        </div>
        <div className="rack-rail rack-rail--left">
          {Array.from({ length: RACK_HOLE_COUNT }).map((_, index) => (
            <span key={`left-${index}`} />
          ))}
        </div>
        <div className="rack-rail rack-rail--right">
          {Array.from({ length: RACK_HOLE_COUNT }).map((_, index) => (
            <span key={`right-${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NetworkDeviceCard({
  label,
  color,
  ports,
  height,
  unitSpan,
  hasSignal,
  hasSlash,
}: NetworkDevice) {
  return (
    <div
      className="nd-wrap"
      style={
        {
          '--nd-color': color,
          '--device-h': `${height}px`,
          '--unit-span': unitSpan,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="nd-card">
        <div className="nd-extrude-top" />
        <div className="nd-extrude-right" />
        <div className="nd-extrude-bottom" />
        <div className="nd-face">
          <div className="nd-leds">
            <span className="nd-led nd-led--on" />
            <span className="nd-led nd-led--blink" />
            <span className="nd-led nd-led--off" />
          </div>
          <div className="nd-ports">
            {Array.from({ length: ports }).map((_, index) => (
              <span key={index} className="nd-port" />
            ))}
          </div>
          <div className="nd-meta">
            <span className="nd-label">{label}</span>
            {hasSlash && <span className="nd-glyph">///</span>}
            {hasSignal && <span className="nd-glyph">)))</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const whatRef = useRef<HTMLElement>(null);
  const capRef = useRef<HTMLElement>(null);
  const capStackRef = useRef<HTMLDivElement>(null);
  const capCardRefs = useRef<(HTMLElement | null)[]>([]);
  const deviceRefs = useRef<DeviceRefMap>({});
  const proofRef = useRef<HTMLElement>(null);

  useRackScrollAnimation(showcaseRef, stageRef, deviceRefs, whatRef, capRef, capStackRef, capCardRefs, proofRef);

  // Scroll-reveal: add .is-visible when sections enter the viewport
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.home-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <section className="home-rack-showcase" ref={showcaseRef}>
        <div className="home-hero-local" ref={stageRef}>
          <div className="nd-scene" aria-hidden="true">
            <div className="rack-assembly">
              <RackFrame />
              {NETWORK_DEVICES.map((device) => (
                <div
                  className="nd-motion-anchor"
                  key={device.id}
                  style={{ '--device-h': `${device.height}px` } as CSSProperties}
                  ref={(node) => {
                    deviceRefs.current[device.id] = node;
                  }}
                >
                  <NetworkDeviceCard {...device} />
                </div>
              ))}
              <div className="rack-scan" aria-hidden="true" />
            </div>
          </div>

          <div className="home-hero-copy-local">
            <div className="home-title-swap">
              <h1 className="home-title home-title--brand">RackTrack</h1>
              <h1 className="home-title home-title--headline">
                Point your phone at the rack
                <br />
                Get a network you can trust.
              </h1>
            </div>
            <p className="home-lede">
              RackTrack is the Physical Intelligence Layer for the modern data center. Verified inventory,
              port-level topology, firmware posture, and compliance evidence &mdash; from a smartphone video sweep.
            </p>
            <div className="home-actions">
              <Link className="home-button primary" to="/contact">
                Get Started <span aria-hidden="true">-&gt;</span>
              </Link>
              <Link className="home-button" to="/product">
                Explore Features <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ── Section 1.2 · Problem ── */}
      <section className="home-section home-section--problem home-reveal">
        <div className="home-section-heading">
          <p className="home-eyebrow">The problem</p>
          <h2>Your CMDB lies. Your DCIM guesses. Nobody owns the truth.</h2>
          <p>
            Every system above the rack — CMDB, DCIM, ITSM, asset register — describes what
            <em> should</em> be there. Switch fabrics describe what's talking. Neither describes
            what's actually in the rack right now.
          </p>
        </div>
        <div className="home-stat-grid">
          {STATS.map((stat) => (
            <div className="home-stat" key={stat.value}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 1.3 · What RackTrack Is ── */}
      <section className="home-section home-section--what" ref={whatRef}>
        <div className="home-section-heading">
          <p className="home-eyebrow">What RackTrack is</p>
          <h2>The Physical Intelligence Layer for the modern data center.</h2>
          <p>
            RackTrack captures the physical state of your racks from a smartphone video, verifies it
            against your live network, and turns it into a continuously reconciled truth that the rest
            of your stack can finally trust.
          </p>
        </div>
        <p className="home-positioning">
          Not an audit tool. Not a DCIM replacement. The truth layer underneath both.
        </p>
      </section>

      {/* ── Section 1.4 · Capabilities — 4×2 grid, rows stack in on scroll ── */}
      <section className="cap-section" ref={capRef}>
        <div className="cap-sticky-wrap">
          <div className="home-section-heading">
            <p className="home-eyebrow">Capabilities</p>
            <h2>Designed for the teams that inherit physical uncertainty.</h2>
          </div>
          <div
            className="cap-grid-stack"
            ref={capStackRef}
          >
            {CAPABILITIES.map((cap, i) => (
              <article
                className="cap-card"
                key={cap.title}
                style={{
                  '--cap-index': i,
                  '--cap-total': CAPABILITIES.length,
                } as CSSProperties}
                ref={(node) => {
                  capCardRefs.current[i] = node;
                }}
              >
                <div className="cap-card-icon" aria-hidden="true">{cap.icon}</div>
                <div className="cap-card-body">
                  <h3>{`${String(i + 1).padStart(2, '0')} · ${cap.title.toUpperCase()}`}</h3>
                  <p>{cap.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 1.5 · Proof ── */}
      <section className="home-section home-section--proof home-reveal" ref={proofRef}>
        <div className="home-section-heading">
          <p className="home-eyebrow">Proof</p>
          <h2>Before and after — in your environment.</h2>
        </div>
        <div className="home-proof-table">
          <div className="home-proof-header">
            <span>Metric</span>
            <span>Without RackTrack</span>
            <span>With RackTrack</span>
          </div>
          {PROOF_ROWS.map((row) => (
            <div className="home-proof-row" key={row.metric}>
              <span className="home-proof-metric">{row.metric}</span>
              <span className="home-proof-before">{row.before}</span>
              <span className="home-proof-after">{row.after}</span>
            </div>
          ))}
        </div>
        <p className="home-proof-footnote">
          Total addressable value per 500-rack footprint: $1M–$2.5M annually.{' '}
          <em>Modeled outcome. Inputs and assumptions available on request.</em>
        </p>
      </section>

      {/* ── Section 1.6 · Who It's For ── */}
      <section className="home-section home-reveal">
        <div className="home-section-heading">
          <p className="home-eyebrow">Who it's for</p>
          <h2>One optimized layer, useful to every team around the rack.</h2>
        </div>
        <div className="home-roles-grid">
          {ROLES.map((role) => (
            <article className="home-role-card" key={role.id}>
              <h3>{role.title}</h3>
            </article>
          ))}
        </div>
      </section>

      {/* ── Section 1.7 · Final CTA ── */}
      <section className="home-section home-final-cta home-reveal">
        <div>
          <h2>See your rack the way RackTrack sees it.</h2>
          <p>
            Twenty minutes. One rack or one row. The output is a side-by-side of what your CMDB says,
            what your network reports, and what RackTrack actually finds — for your environment, not a benchmark.
          </p>
          <Link to="/contact" className="home-button primary">
            Book a baseline assessment <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
