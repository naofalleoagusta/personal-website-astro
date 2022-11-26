import { Popover } from "@headlessui/react";
import { useState, useId } from "react";
import { usePopper } from "react-popper";

import { TOOLS_ICON } from "../../constants";

const SIZES = {
  small: 36,
  medium: 44,
  large: 52,
};

const classes = {
  small: `w-[${SIZES.small}px] h-[${SIZES.small}px] p-2`,
  medium: `w-[${SIZES.medium}px] h-[${SIZES.medium}px] p-2`,
  large: `w-[${SIZES.large}px] h-[${SIZES.large}px] p-3`,
};

type ToolProps = {
  size: "small" | "medium" | "large";
  name: string;
};

const Tool = ({ name, size }: ToolProps) => {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [openState, setOpenState] = useState(false);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [-6, 8],
        },
      },
    ],
  });
  const id = useId;

  const toggleMenu = () => {
    setOpenState((prev) => !prev);
    referenceElement?.click(); // eslint-disable-line
  };

  const onHover = (open: boolean, action: "onMouseEnter" | "onMouseLeave") => {
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      toggleMenu();
    }
  };
  return (
    <Popover>
      <Popover.Button
        ref={setReferenceElement}
        className="focus:outline-none"
        id={`btn-${name}-${size}-${id}`}
      >
        <div
          onMouseEnter={() => onHover(openState, "onMouseEnter")}
          onMouseLeave={() => onHover(openState, "onMouseLeave")}
          className={`${classes[size]} rounded-lg  bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 transition duration-300 ease-in-out mr-4 mb-4`}
        >
          <img
            src={`/${TOOLS_ICON[name]}`}
            alt={`${name} icon`}
            width={SIZES[size]}
            height={SIZES[size]}
          />
        </div>
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <p className="bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 py-1 px-2 rounded-lg">
          {name}
        </p>
      </Popover.Panel>
    </Popover>
  );
};

export default Tool;
