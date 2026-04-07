/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { fetchSiteContent } from '@/lib/firestore';

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
  image: string;
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
  settings: {
    siteName: string;
    logo: string;
    favicon: string;
  };
}

export const siteContent: SiteContent = {
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
    { name: 'PR & FR', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Logistics', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Human Resources', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Project Management', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Visuals', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Presentation', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'R&D', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Marketing', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
    { name: 'Operations', tagline: "IT'S A MARATHON NOT A SPRINT", description: '...', image: '/assets/placeholder.png' },
  ],
  team: [
    { id: 1, name: 'Ahmed Bahi', role: 'CLUB PRESIDENT', image: '/assets/placeholder.png', achievement: 'Placeholder Achievement' },
    { id: 2, name: 'TBD', role: 'VICE PRESIDENT', image: '/assets/placeholder.png?v=2', achievement: 'Placeholder Achievement' },
    { id: 3, name: 'TBD', role: 'PROJECT MANAGER', image: '/assets/placeholder.png?v=3', achievement: 'Placeholder Achievement' },
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
  settings: {
    siteName: 'Enactus MSA',
    logo: '/assets/enactusMSA2.png',
    favicon: '',
  },
};

interface ContentState {
  content: SiteContent;
  loading: boolean;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentState>({
  content: siteContent,
  loading: true,
  refreshContent: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(siteContent);
  const [loading, setLoading] = useState(true);

  const refreshContent = useCallback(async () => {
    try {
      const data = await fetchSiteContent();
      setContent(data);
    } catch (err) {
      console.error('Failed to fetch content from Firestore:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  // Apply site name + favicon dynamically
  useEffect(() => {
    document.title = content.settings.siteName || 'Enactus MSA';

    const link =
      document.querySelector<HTMLLinkElement>("link[rel='icon']") ||
      document.createElement('link');
    link.rel = 'icon';
    if (content.settings.favicon) {
      link.href = content.settings.favicon;
      if (!link.parentElement) document.head.appendChild(link);
    }
  }, [content.settings.siteName, content.settings.favicon]);

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext).content;
}

export function useContentState() {
  return useContext(ContentContext);
}
