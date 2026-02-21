"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface SparklineProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
}

export function Sparkline({
  data,
  color = "#3b82f6",
  width = 80,
  height = 32,
  strokeWidth = 1.5,
  className,
}: SparklineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Trigger animation when visible
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!containerRef.current || data.length < 2) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const padding = 2;
      const usableWidth = width - padding * 2;
      const segmentWidth = usableWidth / (data.length - 1);
      const index = Math.round((x - padding) / segmentWidth);
      setHoverIndex(Math.max(0, Math.min(index, data.length - 1)));
    },
    [data, width]
  );

  if (data.length < 2) return null;

  const padding = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Build smooth SVG path
  const points = data.map((value, i) => ({
    x: padding + (i / (data.length - 1)) * (width - padding * 2),
    y: padding + (1 - (value - min) / range) * (height - padding * 2),
  }));

  // Create a smooth cubic bezier path
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
  }

  // Gradient fill path (closes at the bottom)
  const fillD = `${d} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  const gradientId = `sparkline-gradient-${color.replace(/[^a-zA-Z0-9]/g, "")}`;

  const lastPoint = points[points.length - 1];
  const hoverPoint = hoverIndex !== null ? points[hoverIndex] : null;
  const hoverValue = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <svg
      ref={containerRef}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ overflow: "visible", cursor: "crosshair" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Fill area under line */}
      <path
        d={fillD}
        fill={`url(#${gradientId})`}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}
      />

      {/* Main line */}
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isVisible ? "sparkline-path" : ""}
        style={
          isVisible
            ? ({ "--sparkline-length": "200" } as React.CSSProperties)
            : { opacity: 0 }
        }
      />

      {/* End dot with pulse */}
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={4}
        fill={color}
        opacity={isVisible ? 0.2 : 0}
        style={{
          transition: "opacity 0.3s ease 1s",
          animation: isVisible ? "pulse 2s ease-in-out infinite" : "none",
        }}
      />
      <circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={2.5}
        fill={color}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease 1s",
        }}
      />

      {/* Hover indicator */}
      {hoverPoint && hoverIndex !== null && (
        <>
          {/* Vertical line */}
          <line
            x1={hoverPoint.x}
            y1={0}
            x2={hoverPoint.x}
            y2={height}
            stroke={color}
            strokeWidth={0.5}
            strokeDasharray="2 2"
            opacity={0.4}
          />
          {/* Hover dot */}
          <circle
            cx={hoverPoint.x}
            cy={hoverPoint.y}
            r={3}
            fill={color}
            stroke="rgba(0,0,0,0.5)"
            strokeWidth={1}
          />
          {/* Value tooltip */}
          <g>
            <rect
              x={Math.min(hoverPoint.x - 18, width - 36)}
              y={Math.max(hoverPoint.y - 22, -6)}
              width={36}
              height={16}
              rx={4}
              fill="rgba(24,24,27,0.95)"
              stroke={color}
              strokeWidth={0.5}
            />
            <text
              x={Math.min(hoverPoint.x, width - 18)}
              y={Math.max(hoverPoint.y - 11, 3)}
              textAnchor="middle"
              fill="white"
              fontSize={9}
              fontFamily="monospace"
            >
              {hoverValue !== null && hoverValue >= 1000
                ? `$${(hoverValue / 1000).toFixed(1)}k`
                : hoverValue !== null
                  ? `$${hoverValue}`
                  : ""}
            </text>
          </g>
        </>
      )}
    </svg>
  );
}
