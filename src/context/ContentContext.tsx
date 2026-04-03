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
    title: string;
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
    image1: string;
    image2: string;
    image3: string;
    image4: string;
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

const defaultContent: SiteContent = {
  hero: {
    subtitle: 'Enactus: Where purpose and creativity meet.',
    enactusLogo: '/assets/EnactusLOGO.png',
    msaLogo: '/assets/MSA_Logo.png',
    msaSubtitle: 'A October University for Modern Sciences & Arts organization',
  },
  about: {
    title: 'about us',
    heading: 'Who We Are',
    paragraph1: 'Enactus MSA is a student organization at October University for Modern Sciences & Arts, focused on social entrepreneurship. We bring together passionate students who believe in the power of business to create a better world.',
    paragraph2: 'Through innovative projects, we address real community challenges — from environmental sustainability to economic empowerment — making a lasting impact on the people and communities we serve.',
    paragraph3: 'Guided by our values of integrity, teamwork, and excellence, we develop the next generation of leaders who will shape a more equitable and sustainable future.',
    stat1Value: '50+',
    stat1Label: 'Active Members',
    stat2Value: '10+',
    stat2Label: 'Projects',
    stat3Value: '5+',
    stat3Label: 'Years Active',
    image1: '/assets/team-board.jpg',
    image2: '/assets/team-president.jpg',
    image3: '/assets/team-board.jpg',
    image4: '/assets/team-president.jpg',
  },
  committees: [
    { name: 'PR & FR', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The PR & FR Committee is responsible for building and maintaining relationships with partners, sponsors, and external organizations.' },
    { name: 'Logistics', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Logistics Committee ensures smooth operations behind every event and project.' },
    { name: 'Marketing', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Marketing Committee drives our brand presence and outreach.' },
    { name: 'R&D', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Research & Development Committee is the intellectual backbone of our organization.' },
    { name: 'Visuals', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Our Visuals Committee consists of Photography, Design, and Video Editing teams.' },
    { name: 'Human Resources', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Our HR team keeps track of members performance through assessments and evaluations.' },
    { name: 'Volunteering', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Volunteering Committee connects our members with meaningful community initiatives.' },
    { name: 'Operations', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Operations Committee is the driving force behind executing our strategy.' },
    { name: 'PM', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'The Project Management Committee oversees all active projects within Enactus MSA.' },
  ],
  team: [
    { id: 1, name: 'Ahmed Bahi', role: 'CLUB PRESIDENT', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 2, name: 'Placeholder Name', role: 'VICE PRESIDENT', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 3, name: 'Placeholder Name', role: 'HEAD OF MARKETING', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 4, name: 'Placeholder Name', role: 'HEAD OF LOGISTICS', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 5, name: 'Placeholder Name', role: 'HEAD OF HR', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
  ],
  sponsors: {
    title: 'OUR SPONSORS',
    description: 'We are proud to partner with organizations that share our vision for a better world.',
    logos: [],
  },
  contact: {
    heading: 'Get In Touch',
    subheading: 'Have a question or want to get involved? Reach out to us.',
    email: 'enactus@msa.edu.eg',
    phone: '+20 000 000 0000',
    address: 'October University for Modern Sciences & Arts, Cairo, Egypt',
  },
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('enactus-content');
      return saved ? JSON.parse(saved) : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  useEffect(() => {
    localStorage.setItem('enactus-content', JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: SiteContent) => setContent(newContent);
  const resetContent = () => setContent(defaultContent);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}