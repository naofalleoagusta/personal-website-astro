import { useCallback, useState } from "react"

import WorkingExperienceCard from "./WorkingExperienceCard"

import { EXPERIENCES } from "../constant"

const WorkingExperienceList = () => {
  const [target, setTarget] = useState("")

  const handleExpand = useCallback((name: string) => {
    setTarget((prev) => (prev === name ? "" : name))
  }, [])

  return (
    <div className="flex pl-4 relative mt-6">
      <div className="w-[2px] border-l-2 border-black dark:border-white border-solid"></div>
      <div className="w-full space-y-4 my-12">
        {EXPERIENCES.map((experience, idx) => (
          <WorkingExperienceCard
            key={`${experience.name}-${idx}`}
            {...experience}
            expand={target === experience.name}
            handleExpand={handleExpand}
          />
        ))}
      </div>
    </div>
  )
}

export default WorkingExperienceList
