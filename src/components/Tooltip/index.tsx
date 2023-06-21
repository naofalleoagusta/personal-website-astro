import { ReactNode, useState } from "react"
import "./index.css"

type TooltipProps = {
  direction?: "bottom" | "top" | "right" | "left"
  delay?: number
  children: ReactNode
  content: ReactNode
}

const Tooltip = ({ children, content, direction, delay }: TooltipProps) => {
  let timeout: number | undefined = undefined
  const [active, setActive] = useState(false)

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true)
    }, delay || 100)
  }

  const hideTip = () => {
    clearInterval(timeout)
    setActive(false)
  }

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && (
        <div className={`Tooltip-Tip ${direction || "top"}`}>{content}</div>
      )}
    </div>
  )
}

export default Tooltip
