"use client"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  level: number
  color?: string
}

export function AudioVisualizer({ level, color = "blue" }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const barWidth = 4
    const barGap = 2
    const barCount = Math.floor(canvas.width / (barWidth + barGap))

    const colorMap = {
      blue: "#3b82f6",
      red: "#ef4444",
      green: "#10b981",
    }

    const barColor = colorMap[color as keyof typeof colorMap] || colorMap.blue

    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < barCount; i++) {
        // Generate a random height for each bar based on the level
        const randomFactor = Math.random() * 0.5 + 0.5
        const height = Math.max(4, canvas.height * level * randomFactor)

        const x = i * (barWidth + barGap)
        const y = canvas.height - height

        ctx.fillStyle = barColor
        ctx.fillRect(x, y, barWidth, height)
      }

      animationFrameRef.current = requestAnimationFrame(renderFrame)
    }

    renderFrame()

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [level, color])

  return <canvas ref={canvasRef} width={300} height={60} className="w-full h-full" />
}
