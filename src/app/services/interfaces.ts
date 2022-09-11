interface Requirements {
  content: string;
  items: string[];
}

interface Role {
  content: string;
  items: string[];
}

interface JobCollection {
  apply: string;
  company: string;
  contract: string;
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
