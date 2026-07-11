import React, { useRef, useEffect, useState } from "react";

interface ShapeGridProps {
  speed?: number;
  squareSize?: number;
  direction?: "diagonal" | "horizontal" | "vertical" | "none";
  borderColor?: string;
  hoverFillColor?: string;
  shape?: "hexagon" | "circle" | "square";
  hoverTrailAmount?: number;
}

export const ShapeGrid: React.FC<ShapeGridProps> = ({
  speed = 0.15,
  squareSize = 40,
  direction = "diagonal",
  borderColor = "#ebebeb",
  hoverFillColor = "#f7cc57",
  shape = "hexagon",
  hoverTrailAmount = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track state of faded shapes for hover effect
    const activeHovers = new Map<string, number>();

    const drawHexagon = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + (Math.PI / 6); // Pointy-topped
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    };

    const drawSquare = (ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.rect(cx - size / 2, cy - size / 2, size, size);
      ctx.closePath();
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += speed * 0.05;

      const r = squareSize / 2;
      let colSpacing = squareSize;
      let rowSpacing = squareSize;

      if (shape === "hexagon") {
        colSpacing = Math.sqrt(3) * r;
        rowSpacing = 1.5 * r;
      }

      const cols = Math.ceil(canvas.width / colSpacing) + 2;
      const rows = Math.ceil(canvas.height / rowSpacing) + 2;

      // Update existing hovers - fade them out
      for (const [key, val] of activeHovers.entries()) {
        if (val <= 0.01) {
          activeHovers.delete(key);
        } else {
          const fadeSpeed = hoverTrailAmount === 0 ? 0.15 : 0.05 / (hoverTrailAmount + 0.1);
          activeHovers.set(key, Math.max(0, val - fadeSpeed));
        }
      }

      // Check which cell is currently under the mouse
      let hoveredRow = -1;
      let hoveredCol = -1;
      let minDist = Infinity;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          let cx = col * colSpacing;
          let cy = row * rowSpacing;

          if (shape === "hexagon" && row % 2 !== 0) {
            cx += colSpacing / 2;
          }

          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < r * 1.2 && dist < minDist) {
            minDist = dist;
            hoveredRow = row;
            hoveredCol = col;
          }
        }
      }

      if (hoveredRow !== -1 && hoveredCol !== -1) {
        const key = `${hoveredRow},${hoveredCol}`;
        activeHovers.set(key, 1.0);
      }

      // Draw the grid
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          let cx = col * colSpacing;
          let cy = row * rowSpacing;

          if (shape === "hexagon" && row % 2 !== 0) {
            cx += colSpacing / 2;
          }

          const key = `${row},${col}`;
          const hoverIntensity = activeHovers.get(key) || 0;

          ctx.save();

          // Base shape animation / wave pulse based on position and direction
          let wave = 0;
          if (direction === "diagonal") {
            wave = Math.sin((cx + cy) * 0.005 + time);
          } else if (direction === "horizontal") {
            wave = Math.sin(cx * 0.005 + time);
          } else if (direction === "vertical") {
            wave = Math.sin(cy * 0.005 + time);
          }

          // Ambient pulse of opacity for border
          const ambientOpacity = 0.08 + (wave + 1) * 0.08;

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.globalAlpha = ambientOpacity;

          if (shape === "hexagon") {
            drawHexagon(ctx, cx, cy, r);
          } else if (shape === "circle") {
            drawCircle(ctx, cx, cy, r);
          } else {
            drawSquare(ctx, cx, cy, squareSize * 0.9);
          }
          ctx.stroke();

          // Hover Fill effect
          if (hoverIntensity > 0) {
            ctx.globalAlpha = hoverIntensity;
            ctx.fillStyle = hoverFillColor;
            if (shape === "hexagon") {
              drawHexagon(ctx, cx, cy, r);
            } else if (shape === "circle") {
              drawCircle(ctx, cx, cy, r);
            } else {
              drawSquare(ctx, cx, cy, squareSize * 0.9);
            }
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor, shape, hoverTrailAmount, mouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: -1000, y: -1000 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full"
      />
    </div>
  );
};
