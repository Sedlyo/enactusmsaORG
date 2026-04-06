import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  achievement: string;
}

export interface Committee {
  name: string;
  description: string;
  tagline: string;
}

export interface SiteContent {
  hero: {
    subtitle: string;
    enactusLogo: string;
    msaLogo: string;
    msaSubtitle: string;
  };
  about: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
    images: string[];
  };
  stats: {
    yearsOfExperience: number;
    projectsCompleted: number;
  };
  board: {
    images: string[];
    description: string;
  };
  committees: Committee[];
  team: TeamMember[];
  sponsors: {
    title: string;
    description: string;
    logos: string[];
  };
  contact: {
    heading: string;
    subheading: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const defaultContent: SiteContent = {
  hero: {
    subtitle: 'Enactus: Where purpose and creativity meet.',
    enactusLogo: '/assets/EnactusLOGO.png',
    msaLogo: '/assets/MSA_Logo.png',
    msaSubtitle: 'A October University for Modern Sciences & Arts organization',
  },
  about: {
    heading: 'Who We Are',
    paragraph1: 'Enactus MSA is a student organization...',
    paragraph2: 'Through innovative projects...',
    paragraph3: 'Guided by our values...',
    stat1Value: '50+',
    stat1Label: 'Active Members',
    stat2Value: '10+',
    stat2Label: 'Projects',
    stat3Value: '5+',
    stat3Label: 'Years Active',
    images: [
      '/assets/placeholder.png?v=1',
      '/assets/placeholder.png?v=2',
      '/assets/placeholder.png?v=3',
      '/assets/placeholder.png?v=4',
    ],
  },
  stats: {
    yearsOfExperience: 5,
    projectsCompleted: 10,
  },
  board: {
    images: [
      '/assets/placeholder.png?v=board1',
      '/assets/placeholder.png?v=board2',
      '/assets/placeholder.png?v=board3',
    ],
    description:
      'Our dedicated board members lead the team with passion and vision, driving impactful projects and fostering a culture of innovation and social responsibility.',
  },
  committees: [
    { name: 'PR & FR', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Logistics', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Human Resources', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Project Management', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Visuals', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Presentation', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'R&D', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Marketing', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
    { name: 'Operations', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...' },
  ],
  team: [
    { id: 1, name: 'Ahmed Bahi', role: 'CLUB PRESIDENT', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 2, name: 'null', role: 'VICE PRESIDENT', image: '/assets/placeholder.png?v=2', achievement: 'Placeholder Achievement' },
    { id: 3, name: 'null', role: 'PROJECT MANAGER', image: '/assets/placeholder.png?v=3', achievement: 'Placeholder Achievement' },
  ],
  sponsors: {
    title: 'OUR SPONSORS',
    description: 'We are proud...',
    logos: [
      '/assets/placeholder.png',
      '/assets/placeholder.png?v=2',
      '/assets/placeholder.png?v=3',
    ],
  },
  contact: {
    heading: 'Contact Us',
    subheading: 'Open to all inquiries, collaborations, and sponsorship opportunities.',
    email: 'enactus@msa.edu.eg',
    phone: '',
    address: 'MSA University, Cairo, Egypt',
  },
};

const STORAGE_KEY = 'enactus-msa-content';

function loadContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to handle any new fields added after save
      return { ...defaultContent, ...parsed };
    }
  } catch {
    // Corrupted data — fall back to defaults
  }
  return defaultContent;
}

function saveContent(content: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // Storage full or unavailable
  }
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadContent);
  const [loading] = useState(false);

  // Persist whenever content changes
  useEffect(() => {
    saveContent(content);
  }, [content]);

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
