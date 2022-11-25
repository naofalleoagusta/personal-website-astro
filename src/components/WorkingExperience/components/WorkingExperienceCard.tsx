import type { WorkingExperienceType } from "../constant";

type WorkingExperienceCardProps = WorkingExperienceType;

const WorkingExperienceCard = ({
  content,
  employmentType,
  endDate,
  expandedContent,
  name,
  startDate,
}: WorkingExperienceCardProps) => {
  return (
    <div className="flex space-x-4 items-center w-full">
      <div className="w-[20px] h-[20px] bg-transparent rounded-full border-2 border-black dark:border-white absolute left-[7px]">
        <div className="w-[10px] h-[10px] bg-black dark:bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      <div className="flex-grow bg-gray-100 dark:bg-gray-900 p-4 rounded-xl">
        <div className="flex items-center">
          <img
            src={`/${name}.webp`}
            alt={`${name} logo`}
            className="w-[55px] h-[55px] mr-3 p-1 rounded-xl"
            width={55}
            height={55}
          />
          <div>
            <h3 className="font-bold text-sm md:text-lg dark:text-white">
              {name}
            </h3>
            <div className="md:flex items-center dark:text-white text-xs">
              <p className="mr-2">{employmentType}</p>
              <div className="hidden md:mr-2 md:block w-1 h-1 bg-black rounded-full dark:bg-white" />
              <p>
                {startDate} - {endDate}
              </p>
            </div>
          </div>
        </div>
        <div className="dark:text-white p-2">{content}</div>
      </div>
    </div>
  );
};

export default WorkingExperienceCard;
