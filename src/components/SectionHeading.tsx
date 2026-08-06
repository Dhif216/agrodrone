import type { CSSProperties } from "react"

type SectionHeadingProps = {
  label: string
  title: string
  align?: "left" | "center"
  className?: string
  labelClassName?: string
  titleClassName?: string
  labelStyle?: CSSProperties
  titleStyle?: CSSProperties
}

export default function SectionHeading({
  label,
  title,
  align = "center",
  className = "",
  labelClassName = "",
  titleClassName = "",
  labelStyle,
  titleStyle,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left"

  return (
    <div className={`${alignClass} ${className}`.trim()}>
      <span className={`text-xs font-semibold uppercase tracking-widest ${labelClassName}`.trim()} style={labelStyle}>
        {label}
      </span>
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-normal mt-3 leading-tight ${titleClassName}`.trim()}
        style={{ fontFamily: "'DM Serif Display', serif", ...titleStyle }}
      >
        {title}
      </h2>
    </div>
  )
}
