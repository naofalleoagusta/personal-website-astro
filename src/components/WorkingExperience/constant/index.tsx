export type WorkingExperienceType = {
  name: string;
  startDate: string;
  endDate: string;
  expandedContent: React.ReactNode;
  employmentType: "Full-time" | "Part-time" | "Freelance";
  tools: string[];
  website?: string;
};

export const EXPERIENCES: WorkingExperienceType[] = [
  {
    name: "Kadoqu",
    startDate: "August 2019",
    endDate: "May 2020",
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
    employmentType: "Full-time",
    tools: [
      "Javascript",
      "Bootstrap",
      "PHP",
      "jQuery",
      "CSS",
      "MySql",
      "CodeIgniter",
    ],
    website: "https://dnartworks.co.id/",
  },
  {
    name: "EKRUT",
    startDate: "May 2021",
    endDate: "Mar 2022",
    expandedContent: (
      <div>
        Established in 2016, EKRUT is a recruitment platform that uses
        technology and recruiter network to provide faster and better hires
        without compromising quality. Working as full front-end engineer for the
        first time. I helped Ekrut maintaining and developing their internal and
        external web-app. Stuff that I built at Ekrut :
        <ul className="list-disc pl-[30px]">
          <li>
            Revamped Ekrut Media aka Blog from GatsbyJS to NextJS. Revamping
            Ekrut Media helped their website to be indexed by Google Robot. Also
            boosted their daily visitor from 100 visitors/day to 50K
            visitors/day, by maintaining their google lighthouse score and fix
            the SEO meta-ish.
          </li>
          <li>
            Maintained and developed internal and external’s search talent
            feature.
          </li>
          <li>Developed a high performance Selectable List component.</li>
          <li>
            Helped Ekrut bootstrapped a Job portal for blue collar worker.
          </li>
        </ul>
      </div>
    ),
    employmentType: "Full-time",
    tools: [
      "Next.js",
      "React",
      "SASS",
      "LESS",
      "CSS",
      "Redux",
      "SEO",
      "Javascript",
      "Node.js",
      "Typescript",
      "CSS",
    ],
    website: "https://ekrut.com/",
  },
  {
    name: "SIRCLO",
    startDate: "Mar 2022",
    endDate: "Present",
    expandedContent: (
      <div>
        Founded in 2013, SIRCLO Group’s mission is to maximise the potential of
        people and businesses through integrated technology solutions, as a
        means to enable them to make a leap into the future. I joined SIRCLO as
        front-end engineer on team product and channel, maintaining product
        inventory and marketplace integration. So far, things that I built
        SIRCLO:
        <ul className="list-disc pl-[30px]">
          <li>
            Developed a dynamic and high performance table list component to be
            used across team.
          </li>
          <li>Revamped Integration Channel UI and flow.</li>
          <li>Implement Apollo GraphQL caching on product list.</li>
          <li>Developed an auto fill form using SessionStorage.</li>
          <li>
            Developed an error message mappers from marketplace using cosine
            similarity.
          </li>
          <li>Developed Wholesale Price for single product.</li>
          <li>Developed Limit Purchase for single product.</li>
        </ul>
      </div>
    ),
    employmentType: "Full-time",
    tools: [
      "Javascript",
      "Typescript",
      "React",
      "Node.js",
      "SASS",
      "CSS",
      "GraphQL",
      "Apollo GraphQL",
      "Material-UI",
    ],
    website: "https://sirclo.com/",
  },
];
