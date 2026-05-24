import type { ReactElement } from 'react'

export default function RackTrackLogo(): ReactElement {
  return (
    <span className="rack-mark" aria-hidden="true">
      <svg viewBox="0 0 280 270" role="img" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-cyan" x1="10" y1="12" x2="220" y2="258" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#C8FFFF" />
            <stop offset="18%"  stopColor="#00F0FF" />
            <stop offset="60%"  stopColor="#00AADD" />
            <stop offset="100%" stopColor="#0066AA" />
          </linearGradient>

          {/* tight inner glow */}
          <filter id="glow-tight" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b2" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="b2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/*
          Outer R boundary (clockwise):
            - diagonal cut at top-left  (10,78) → (60,12)
            - along top to bowl start   (60,12) → (215,12)
            - bowl outer right curve    (215,12) → (295,100) → (215,178)
            - middle bar                (215,178) → (155,178)
            - right diagonal leg        (155,178) → (200,258)
            - right leg base            (200,258) → (148,258)
            - right leg left side       (148,258) → (103,178)
            - across to left leg        (103,178) → (45,178)
            - left leg down             (45,178)  → (45,258)
            - left leg base             (45,258)  → (10,258)
            - up left spine             (10,258)  → (10,78)
            - Z closes with diagonal
          Inner bowl hollow (clockwise, evenodd cuts it out):
            (45,42) → (215,42) → curve right → (215,160) → (45,160) → Z
        */}
        <path
          fillRule="evenodd"
          fill="url(#logo-cyan)"
          filter="url(#glow-tight)"
          d={
            'M 60 12 L 215 12 ' +
            'C 290 12 295 65 295 100 C 295 140 290 178 215 178 ' +
            'L 155 178 L 200 258 L 148 258 L 103 178 ' +
            'L 45 178 L 45 258 L 10 258 L 10 78 Z ' +
            'M 45 42 L 215 42 C 265 42 270 158 215 160 L 45 160 Z'
          }
        />

        {/* bright highlight trace on inner hollow edge */}
        <path
          fill="none"
          stroke="#90FAFF"
          strokeWidth="1.8"
          opacity="0.75"
          d="M 45 42 L 215 42 C 265 42 270 158 215 160 L 45 160"
        />

        {/* bright highlight on top edge and diagonal cut */}
        <path
          fill="none"
          stroke="#C8FFFF"
          strokeWidth="1.5"
          opacity="0.6"
          d="M 10 78 L 60 12 L 215 12"
        />
      </svg>
    </span>
  )
}
