import type { ReactElement } from 'react'

export default function RackTrackLogo(): ReactElement {
  return (
    <span className="rack-mark" aria-hidden="true">
      <svg viewBox="0 0 320 260" role="img" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 30h205c48 0 87 39 87 87s-39 87-87 87h-47l31 54h-57L67 128h152c17 0 31-14 31-31s-14-31-31-31H42L14 30Z"
          fill="#ffffff"
        />
        <path
          d="M55 128h85l39 65H96L55 128Z"
          fill="#d9dcde"
        />
        <path d="M74 154h73l16 26H91L74 154Z" fill="#ffffff" opacity="0.35" />
      </svg>
    </span>
  )
}
