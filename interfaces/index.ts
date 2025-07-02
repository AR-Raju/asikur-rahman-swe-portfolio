export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  readingTime: number;
  content: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: string;
  featured: boolean;
  createdAt: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Experience {
  _id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface ProfileData {
  name: string;
  profilePicture: string;
  designation: string;
  introduction: string;
  resumeUrl: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
  };
}

export interface Project {
  _id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  techStack: string[];
  images: string[];
  links: {
    live?: string;
    github?: string;
    demo?: string;
  };
  featured: boolean;
  status: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}
