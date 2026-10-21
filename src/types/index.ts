export interface ExperienceType {
  name: string;
  startDate: string;
  endDate: string;
  employmentType: 'Full-time' | 'Part-time' | 'Freelance';
  website?: string;
  tools: string[];
  description: string;
  achievements: string[];
}
