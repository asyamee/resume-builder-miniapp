import React, { useEffect, useRef, useState } from 'react'

type ScaledContainerProps = {
  maxWidth?: number
  children: React.ReactNode
}

export const AutoScale: React.FC<ScaledContainerProps> = ({ maxWidth = 900, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [contentHeight, setContentHeight] = useState(0)

  const updateScale = () => {
    if (!wrapperRef.current || !contentRef.current) return

    const containerWidth = wrapperRef.current.clientWidth
    const newScale = containerWidth / maxWidth

    setScale(newScale)

    const realHeight = contentRef.current.scrollHeight

    setContentHeight(realHeight * newScale)
  }

  useEffect(() => {
    updateScale()
    window.addEventListener('resize', updateScale)

    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        width: '100%',
        height: contentHeight,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: maxWidth,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
