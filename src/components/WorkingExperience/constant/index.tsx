export type WorkingExperienceType = {
  name: string;
  startDate: string;
  endDate: string;
  expandedContent: React.ReactNode;
  content: string;
  employmentType: "Full-time" | "Part-time" | "Freelance";
  tools: string[];
};

export const EXPERIENCES: WorkingExperienceType[] = [
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
    content:
      "Kadoqu.com offers product and services start from an event Reminder, Wrapping Lab, GiDA Bot, and variant gift products that will match for",
    expandedContent: (
      <div>
        Kadoqu.com offers product and services start from an event Reminder,
        Wrapping Lab, GiDA Bot, and variant gift products that will match for
        any occasion. Kadoqu special feature is being developed with AI and will
        be presented through GiDA as a gift personal assistance. I joined Kadoqu
        as part-time Software Engineer, I’m responsible for maintaining and
        developing the Storefront and GraphQL. Features that I have developed at
        Kadoqu :
        <ul className="list-disc pl-[30px]">
          <li>
            Developed a profile page for user to maintain their data, tracks
            order status, and wishlist.
          </li>
          <li>
            Developed a lazy checker for Kadoqu whenever there is a change on
            shipping cost from third party API. Also I’m responsible for
            shipping cost estimation based on weight and volume.
          </li>
          <li>Developed a PDF generator for order detail on admin panel.</li>
          <li>Developed an event reminder Calendar.</li>
        </ul>
      </div>
    ),
    employmentType: "Part-time",
    tools: [
      "React",
      "GraphQL",
      "Javascript",
      "PostgreSQL",
      "Bootstrap",
      "Node.js",
      "Apollo GraphQL",
      "CSS",
    ],
  },
  {
    name: "Kadosoft",
    startDate: "July 2020",
    endDate: "Feb 2021",
    content:
      "Kadoqu.com offers product and services start from an event Reminder, Wrapping Lab, GiDA Bot, and variant gift products that will match for",
    expandedContent: (
      <div>
        During the start of the pandemic, Kadoqu struggle to survive. The
        investor decided to disband Kadoqu and transform the team into a
        software house called KadoSoft. KadoSoft helps people transform their
        business in the Digital Economy era. I joined KadoSoft as Freelance
        Software Engineer, I helped KadoSoft developed:
        <ul className="list-disc pl-[30px]">
          <li>Developed a Website Profile Company for KadoSoft's client.</li>
          <li>Developed Kadosoft's landing page.</li>
          <li>Developed Kadosoft's showcase website.</li>
        </ul>
      </div>
    ),
    employmentType: "Freelance",
    tools: [
      "React",
      "GraphQL",
      "Javascript",
      "PostgreSQL",
      "Bootstrap",
      "Node.js",
      "PHP",
      "Laravel",
      "jQuery",
      "CSS",
      "MySql",
    ],
  },
  {
    name: "DNArtworks",
    startDate: "Oct 2020",
    endDate: "Apr 2021",
    content:
      "Kadoqu.com offers product and services start from an event Reminder, Wrapping Lab, GiDA Bot, and variant gift products that will match for",
    expandedContent: (
      <div>
        DNArtworks is a creative consultant company. I was responsible for
        maintaining and developing project for DNArtworks’s client. Things that
        I do at DNArtworks :
        <ul className="list-disc pl-[30px]">
          <li>
            Develop a System Information for a Tour Company, especially in Tour
            Package.
          </li>
          <li>Develop a Website Profile Company.</li>
          <li>Developing a custom admin panel.</li>
        </ul>
      </div>
    ),
    employmentType: "Freelance",
    tools: [
      "Javascript",
      "Bootstrap",
      "PHP",
      "jQuery",
      "CSS",
      "MySql",
      "CodeIgniter"
    ],
  },
];
