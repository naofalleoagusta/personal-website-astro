export type WorkingExperienceType = {
  name: string;
  startDate: string;
  endDate: string;
  expandedContent: React.ReactNode;
  content: string;
  employmentType: "Full-time" | "Part-time" | "Freelance";
};

export const EXPERIENCES: WorkingExperienceType[] = [
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content:
      "Kadoqu is a marketplace that focused on selling gift. Joined Kadoqu as part-time Software Engineer, I’m responsible for maintaining and developing the Storefront...",
    expandedContent: <div>hello</div>,
    employmentType: "Part-time",
  },
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content: "blabla",
    expandedContent: <div>hello</div>,
    employmentType: "Part-time",
  },
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content: "blabla",
    expandedContent: <div>hello</div>,
    employmentType: "Part-time",
  },
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content: "blabla",
    expandedContent: <div>hello</div>,
    employmentType: "Part-time",
  },
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content: "blabla",
    expandedContent: <div>hello</div>,
    employmentType: "Part-time",
  },
];
