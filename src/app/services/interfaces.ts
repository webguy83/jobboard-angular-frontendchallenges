interface Requirements {
  content: string;
  items: string[];
}

interface Role {
  content: string;
  items: string[];
}

type Contract = 'Full Time' | 'Part Time' | 'Freelance';

interface JobCollection {
  apply: string;
  company: string;
  contract: Contract;
  description: string;
  index: number;
  location: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  requirements: Requirements;
  role: Role;
  website: string;
}

export interface Job extends JobCollection {
  id: string;
}

export interface FilteredData {
  position: string;
  location: string;
  fullTimeOnly: boolean;
}
