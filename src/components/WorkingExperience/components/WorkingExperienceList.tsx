import { EXPERIENCES } from "../constant";
import WorkingExperienceCard from "./WorkingExperienceCard";

const WorkingExperienceList = () => {
  return (
    <div className="flex pl-4 relative mt-6">
      <div className="w-[2px] border-l-2 border-black dark:border-white border-solid"></div>
      <div className="w-full space-y-4 my-12">
        {EXPERIENCES.map((experience, idx) => (
          <WorkingExperienceCard
            key={`${experience.name}-${idx}`}
            {...experience}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkingExperienceList;
