import { memo, useEffect, useRef, useState } from "react"

import Tool from "../../Tool"

import scrollToView from "../../../helpers/scrollToView"

import type { WorkingExperienceType } from "../constant"

type WorkingExperienceCardProps = WorkingExperienceType & {
  expand: boolean
  handleExpand: (target: string) => void
}

const preventPropagation = (event: any) => {
  event.stopPropagation()
}

const WorkingExperienceCard = ({
  employmentType,
  endDate,
  expandedContent,
  name,
  startDate,
  website,
  tools,
  expand,
  handleExpand,
}: WorkingExperienceCardProps) => {
  const [expandedContentHeight, setExpandedContentHeight] = useState(0)
  const expandedContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (expandedContentRef?.current) {
      setExpandedContentHeight(expandedContentRef.current.clientHeight)
    }
  }, [])

  const handleOnClick = () => {
    handleExpand(name)
    setTimeout(
      () => scrollToView(`${name.toLocaleLowerCase()}-experience`),
      400,
    )
  }

  const handleOnClickBtn = (event: any) => {
    preventPropagation(event)
    handleOnClick()
  }

  const handleOnClickCompany = (event: any) => {
    if (website) {
      preventPropagation(event)
      window.open(website)
    }
  }

  return (
    <div className="flex space-x-4 w-full">
      <div className="w-[20px] h-[20px] bg-transparent rounded-full border-2 border-black dark:border-white absolute left-[7px]">
        <div className="w-[10px] h-[10px] bg-black dark:bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      <div
        className="cursor-pointer flex-grow bg-gray-100 dark:bg-gray-900 p-4 rounded-xl mt-[-30px] min-w-0 mb-10"
        onClick={handleOnClick}
        id={`${name.toLocaleLowerCase()}-experience`}
      >
        <div className="flex items-center">
          <img
            src={`/${name}.webp`}
            alt={`${name} logo`}
            className="w-[55px] h-[55px] mr-3 p-1 rounded-xl cursor-newTab"
            width={55}
            height={55}
            onClick={handleOnClickCompany}
          />
          <div className="flex-grow">
            <h3 className="font-bold text-sm md:text-lg dark:text-white">
              {website ? (
                <a
                  href={website}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={handleOnClickCompany}
                  className="border-b-2 border-dotted border-black dark:border-white dark:text-white cursor-newTab"
                >
                  {name}
                </a>
              ) : (
                name
              )}
            </h3>
            <div className="md:flex items-center dark:text-white text-xs">
              <p className="mr-2">{employmentType}</p>
              <div className="hidden md:mr-2 md:block w-1 h-1 bg-black rounded-full dark:bg-white" />
              <p>
                {startDate} - {endDate}
              </p>
            </div>
          </div>
          <ArrowIcon expand={expand} />
        </div>
        <div className="dark:text-white p-2 min-w-0">
          <div
            className="overflow-hidden max-h-12 transition-maxHeight duration-500 ease-in-out"
            style={
              expand
                ? {
                    maxHeight: expandedContentHeight,
                  }
                : {}
            }
          >
            <div ref={expandedContentRef}>
              {expandedContent}
              <div className="mt-4">
                <h4 className="font-bold mb-4">Skill & Tech Stack : </h4>
                <div className="flex flex-wrap">
                  {tools.map((tool, idx) => (
                    <Tool name={tool} size="small" key={`${tool}-${idx}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            className="font-bold w-full p-2 mt-4 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 transition duration-300 ease-in-out"
            onClick={handleOnClickBtn}
            id={`btn-${name}`}
          >
            View {expand ? "Less" : "More"}
          </button>
        </div>
      </div>
    </div>
  )
}

const ArrowIcon = ({ expand }: { expand: boolean }) => {
  return (
    <div className="pr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className={`transition-transform duration-300 ease-in-out ${
          expand ? "-rotate-180" : ""
        } fill-black dark:fill-white`}
      >
        <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
      </svg>
    </div>
  )
}

export default memo(WorkingExperienceCard, (prevProps, nextProps) => {
  return prevProps.expand === nextProps.expand
})
