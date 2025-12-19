"use client";

interface WaveDividerProps {
  fill?: string;
  className?: string;
  flip?: boolean;
}

export function WaveDivider({
  fill = "var(--cream)",
  className = "",
  flip = false
}: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{
        transform: flip ? 'rotate(180deg)' : undefined,
        marginTop: flip ? undefined : '-1px',
        marginBottom: flip ? '-1px' : undefined
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px]"
      >
        <path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
          fill={fill}
          opacity="0.5"
        />
        <path
          d="M0,80 C150,40 350,100 600,80 C850,60 1050,100 1200,80 L1200,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
