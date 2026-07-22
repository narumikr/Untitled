import React, { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import { createPortal } from 'react-dom'

import { usePortalContainer } from '@/internal/usePortalContainer'

import styles from './IntoTheSekai.module.scss'

import type { IntoTheSekaiProps } from '@/types/components/effect/IntoTheSekai.types'

type PieceOfSekai = {
  points: { x: number; y: number }[]
  velocity: { x: number; y: number }
  opacity: number
}

type AnimationTrigger =
  React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>

const PINK = 'rgb(255, 186, 241, {0})'
const YELLOW = 'rgb(255, 247, 148, {0})'
const AQUA = 'rgb(149, 253, 255, {0})'

export const IntoTheSekai = ({
  execEvent,
  execEventDelay = 390,
  clickThrough = false,
  containerComponent,
  ...rest
}: IntoTheSekaiProps) => {
  const portalContainer = usePortalContainer(containerComponent)
  const [startAnimation, setStartAnimation] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sekaiPieceRef = useRef<PieceOfSekai[]>([])

  const optionStyle = {
    ...(containerComponent && { position: 'absolute' }),
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const setCanvasSize = () => {
      if (!portalContainer) return
      canvas.width = portalContainer.offsetWidth
      canvas.height = portalContainer.offsetHeight
    }

    setCanvasSize()

    window.addEventListener('resize', setCanvasSize)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [portalContainer])

  const wasAnimatingRef = useRef(false)

  useEffect(() => {
    if (!startAnimation && wasAnimatingRef.current) {
      wasAnimatingRef.current = false
      const timeoutId = setTimeout(() => {
        execEvent?.()
      }, execEventDelay)
      return () => clearTimeout(timeoutId)
    }
    if (startAnimation) {
      wasAnimatingRef.current = true
    }
  }, [startAnimation, execEvent, execEventDelay])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    let animationFrameId: number

    const render = () => {
      if (!ctx || !canvas || !startAnimation) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sekaiPieceRef.current = sekaiPieceRef.current
        .map((tri) => {
          const newPoints = tri.points.map((p) => ({
            x: p.x + tri.velocity.x,
            y: p.y + tri.velocity.y,
          }))

          return {
            ...tri,
            points: newPoints,
            opacity: tri.opacity - 0.0075,
          }
        })
        .filter((t) => t.opacity > 0)

      if (sekaiPieceRef.current.length === 0) {
        setStartAnimation(false)
        return
      }

      sekaiPieceRef.current.forEach((tri, index) => {
        ctx.beginPath()
        ctx.moveTo(tri.points[0].x, tri.points[0].y)
        tri.points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y))
        ctx.closePath()
        ctx.fillStyle = `${getPieceColor(index).replace('{0}', `${tri.opacity}`)}`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [startAnimation])

  const handleClick = (e: AnimationTrigger) => {
    if (!portalContainer) return
    setStartAnimation(true)
    const rect = portalContainer.getBoundingClientRect()
    if (!rect) return

    const effectX = getClickPosition(e).clientX - rect.left
    const effectY = getClickPosition(e).clientY - rect.top

    const newPieceOfSekai = createSekaiPiece(effectX, effectY)
    sekaiPieceRef.current = [...sekaiPieceRef.current, ...newPieceOfSekai]

    if (clickThrough && canvasRef.current) {
      const { clientX, clientY } = getClickPosition(e)
      const canvasElement = canvasRef.current
      const previousPointerEvents = canvasElement.style.pointerEvents
      try {
        canvasElement.style.pointerEvents = 'none'
        const elementBelow = document.elementFromPoint(clientX, clientY)
        elementBelow?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true, clientX, clientY }),
        )
      } finally {
        canvasElement.style.pointerEvents = previousPointerEvents
      }
    }
  }

  if (!portalContainer) return null

  return createPortal(
    <canvas
      {...rest}
      className={clsx(styles['into-the-sekai'], rest.className)}
      style={{ ...(optionStyle as React.CSSProperties), ...rest.style }}
      ref={canvasRef}
      onClick={handleClick}
    />,
    portalContainer,
  )
}

const getClickPosition = (e: AnimationTrigger) => {
  if ('touches' in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
  } else {
    return { clientX: e.clientX, clientY: e.clientY }
  }
}

const createSekaiPiece = (x: number, y: number) => {
  return Array.from({ length: 60 }).map(() => {
    const angle = Math.random() * 2 * Math.PI
    const speed = Math.random() * 3 + 2

    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    }

    const cx = x + Math.random() * 80 - 40
    const cy = y + Math.random() * 80 - 40
    const size = Math.random() * 25 + 25
    const baseAngle = Math.random() * 2 * Math.PI
    const angleVariation = Math.PI / 4

    const points = [0, 1, 2].map((i) => {
      const vertexAngle =
        baseAngle + (i * 2 * Math.PI) / 3 + (Math.random() - 0.5) * 2 * angleVariation
      return {
        x: cx + Math.cos(vertexAngle) * size,
        y: cy + Math.sin(vertexAngle) * size,
      }
    })

    return { points, velocity, opacity: 1 }
  })
}

const getPieceColor = (index: number) => {
  switch (index % 3) {
    case 0:
      return PINK
    case 1:
      return AQUA
    case 2:
    default:
      return YELLOW
  }
}
