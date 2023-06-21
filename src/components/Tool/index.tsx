import Tooltip from "../Tooltip"

import stopPropagation from "../../helpers/stopPropagation"

import { TOOLS_ICON } from "../../constants"

const SIZES = {
  small: 36,
  medium: 44,
  large: 52,
}

const classes = {
  small: `w-[${SIZES.small}px] h-[${SIZES.small}px] p-2`,
  medium: `w-[${SIZES.medium}px] h-[${SIZES.medium}px] p-2`,
  large: `w-[${SIZES.large}px] h-[${SIZES.large}px] p-3`,
}

type ToolProps = {
  size: "small" | "medium" | "large"
  name: string
}

const Tool = ({ name, size }: ToolProps) => {
  return (
    <div className="mr-[11px] mb-1" onClick={stopPropagation}>
      <Tooltip content={name}>
        <div
          className={`${classes[size]} rounded-lg  bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 transition duration-300 ease-in-out`}
        >
          <img
            src={`/${TOOLS_ICON[name]}`}
            alt={`${name} icon`}
            width={SIZES[size]}
            height={SIZES[size]}
          />
        </div>
      </Tooltip>
    </div>
  )
}

export default Tool
