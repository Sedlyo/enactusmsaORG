/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { fetchSiteContent, updateSection, setCommittees as setCommitteesFirestore, setTeamMembers as setTeamMembersFirestore } from '../lib/firestore';

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
    eyebrow: string;
    heading: string;
    description: string;
    stat1Title: string;
    stat1Value: number;
    stat1Suffix: string;
    stat1Description: string;
    stat2Title: string;
    stat2Value: number;
    stat2Suffix: string;
    stat2Description: string;
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
    paragraph1: 'Enactus MSA is a student organization dedicated to empowering leaders and creating sustainable social impact through entrepreneurial action.',
    paragraph2: 'Through innovative projects, our team addresses real-world environmental, economic, and social challenges to bring long-term benefit to communities.',
    paragraph3: 'Guided by our core values, we equip university students with practical project management, leadership, and professional experience.',
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
    eyebrow: "What We've Achieved",
    heading: 'Impact In Numbers',
    description: 'Enactus MSA combines ambitious ideas with structured teamwork to deliver meaningful projects, leadership experience, and long-term community results.',
    stat1Title: 'Years of Experience',
    stat1Value: 5,
    stat1Suffix: 'Years',
    stat1Description: 'Equipping students with hands-on leadership, professional development, and real project management experience.',
    stat2Title: 'Projects Completed',
    stat2Value: 10,
    stat2Suffix: 'Initiatives',
    stat2Description: 'Well-structured projects that build community value, social innovation, and stakeholder trust.',
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
    { name: 'PR & FR', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Public Relations & Fundraising Committee', image: '/assets/placeholder.png' },
    { name: 'Logistics', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Logistics & Event Management Committee', image: '/assets/placeholder.png' },
    { name: 'Human Resources', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Human Resources & Member Development', image: '/assets/placeholder.png' },
    { name: 'Project Management', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Project Management & Execution', image: '/assets/placeholder.png' },
    { name: 'Visuals', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Design & Visual Arts Committee', image: '/assets/placeholder.png' },
    { name: 'Presentation', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Presentation & Pitching Committee', image: '/assets/placeholder.png' },
    { name: 'R&D', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Research & Development Committee', image: '/assets/placeholder.png' },
    { name: 'Marketing', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Digital Marketing & Social Media', image: '/assets/placeholder.png' },
    { name: 'Operations', tagline: "IT'S A MARATHON NOT A SPRINT", description: 'Field Operations & Strategy', image: '/assets/placeholder.png' },
  ],
  team: [
    { id: 1, name: 'Ahmed Bahi', role: 'CLUB PRESIDENT', image: '/assets/placeholder.png', achievement: 'Leading Enactus MSA' },
    { id: 2, name: 'TBD', role: 'VICE PRESIDENT', image: '/assets/placeholder.png?v=2', achievement: 'Operations Oversight' },
    { id: 3, name: 'TBD', role: 'PROJECT MANAGER', image: '/assets/placeholder.png?v=3', achievement: 'Impact Projects Lead' },
  ],
  sponsors: {
    title: 'OUR SPONSORS',
    description: 'We are proud to collaborate with leading organizations that support social entrepreneurship and youth empowerment.',
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

const LOCAL_STORAGE_KEY = 'enactus_site_content';

function sanitizeSiteContent(raw: any): SiteContent {
  const d = siteContent;
  if (!raw || typeof raw !== 'object') return d;

  const hero = {
    subtitle: typeof raw.hero?.subtitle === 'string' ? raw.hero.subtitle : d.hero.subtitle,
    enactusLogo: typeof raw.hero?.enactusLogo === 'string' ? raw.hero.enactusLogo : d.hero.enactusLogo,
    msaLogo: typeof raw.hero?.msaLogo === 'string' ? raw.hero.msaLogo : d.hero.msaLogo,
    msaSubtitle: typeof raw.hero?.msaSubtitle === 'string' ? raw.hero.msaSubtitle : d.hero.msaSubtitle,
  };

  const about = {
    heading: typeof raw.about?.heading === 'string' ? raw.about.heading : d.about.heading,
    paragraph1: typeof raw.about?.paragraph1 === 'string' ? raw.about.paragraph1 : d.about.paragraph1,
    paragraph2: typeof raw.about?.paragraph2 === 'string' ? raw.about.paragraph2 : d.about.paragraph2,
    paragraph3: typeof raw.about?.paragraph3 === 'string' ? raw.about.paragraph3 : d.about.paragraph3,
    stat1Value: typeof raw.about?.stat1Value === 'string' ? raw.about.stat1Value : d.about.stat1Value,
    stat1Label: typeof raw.about?.stat1Label === 'string' ? raw.about.stat1Label : d.about.stat1Label,
    stat2Value: typeof raw.about?.stat2Value === 'string' ? raw.about.stat2Value : d.about.stat2Value,
    stat2Label: typeof raw.about?.stat2Label === 'string' ? raw.about.stat2Label : d.about.stat2Label,
    stat3Value: typeof raw.about?.stat3Value === 'string' ? raw.about.stat3Value : d.about.stat3Value,
    stat3Label: typeof raw.about?.stat3Label === 'string' ? raw.about.stat3Label : d.about.stat3Label,
    images: Array.isArray(raw.about?.images) && raw.about.images.length > 0 ? raw.about.images : d.about.images,
  };

  const stats = {
    eyebrow: typeof raw.stats?.eyebrow === 'string' ? raw.stats.eyebrow : d.stats.eyebrow,
    heading: typeof raw.stats?.heading === 'string' ? raw.stats.heading : d.stats.heading,
    description: typeof raw.stats?.description === 'string' ? raw.stats.description : d.stats.description,
    stat1Title: typeof raw.stats?.stat1Title === 'string' ? raw.stats.stat1Title : d.stats.stat1Title,
    stat1Value: typeof raw.stats?.stat1Value === 'number' ? raw.stats.stat1Value : (Number(raw.stats?.stat1Value) || d.stats.stat1Value),
    stat1Suffix: typeof raw.stats?.stat1Suffix === 'string' ? raw.stats.stat1Suffix : d.stats.stat1Suffix,
    stat1Description: typeof raw.stats?.stat1Description === 'string' ? raw.stats.stat1Description : d.stats.stat1Description,
    stat2Title: typeof raw.stats?.stat2Title === 'string' ? raw.stats.stat2Title : d.stats.stat2Title,
    stat2Value: typeof raw.stats?.stat2Value === 'number' ? raw.stats.stat2Value : (Number(raw.stats?.stat2Value) || d.stats.stat2Value),
    stat2Suffix: typeof raw.stats?.stat2Suffix === 'string' ? raw.stats.stat2Suffix : d.stats.stat2Suffix,
    stat2Description: typeof raw.stats?.stat2Description === 'string' ? raw.stats.stat2Description : d.stats.stat2Description,
  };

  const board = {
    images: Array.isArray(raw.board?.images) && raw.board.images.length > 0 ? raw.board.images : d.board.images,
    description: typeof raw.board?.description === 'string' ? raw.board.description : d.board.description,
  };

  const committees = Array.isArray(raw.committees) && raw.committees.length > 0 ? raw.committees : d.committees;
  const team = Array.isArray(raw.team) && raw.team.length > 0 ? raw.team : d.team;

  const sponsors = {
    title: typeof raw.sponsors?.title === 'string' ? raw.sponsors.title : d.sponsors.title,
    description: typeof raw.sponsors?.description === 'string' ? raw.sponsors.description : d.sponsors.description,
    logos: Array.isArray(raw.sponsors?.logos) && raw.sponsors.logos.length > 0 ? raw.sponsors.logos : d.sponsors.logos,
  };

  const contact = {
    heading: typeof raw.contact?.heading === 'string' ? raw.contact.heading : d.contact.heading,
    subheading: typeof raw.contact?.subheading === 'string' ? raw.contact.subheading : d.contact.subheading,
    email: typeof raw.contact?.email === 'string' ? raw.contact.email : d.contact.email,
    phone: typeof raw.contact?.phone === 'string' ? raw.contact.phone : d.contact.phone,
    address: typeof raw.contact?.address === 'string' ? raw.contact.address : d.contact.address,
  };

  const settings = {
    siteName: typeof raw.settings?.siteName === 'string' ? raw.settings.siteName : d.settings.siteName,
    logo: typeof raw.settings?.logo === 'string' ? raw.settings.logo : d.settings.logo,
    favicon: typeof raw.settings?.favicon === 'string' ? raw.settings.favicon : d.settings.favicon,
  };

  return { hero, about, stats, board, committees, team, sponsors, contact, settings };
}

function getInitialContent(): SiteContent {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return sanitizeSiteContent(JSON.parse(saved));
    }
  } catch (e) {
    console.error('Failed to parse local content cache:', e);
  }
  return siteContent;
}

interface ContentState {
  content: SiteContent;
  loading: boolean;
  refreshContent: () => Promise<void>;
  updateContentSection: (
    key: 'hero' | 'about' | 'stats' | 'board' | 'sponsors' | 'contact' | 'settings',
    data: Record<string, unknown>
  ) => Promise<void>;
  updateCommittees: (committees: Committee[]) => Promise<void>;
  updateTeamMembers: (members: TeamMember[]) => Promise<void>;
}

const ContentContext = createContext<ContentState>({
  content: siteContent,
  loading: true,
  refreshContent: async () => {},
  updateContentSection: async () => {},
  updateCommittees: async () => {},
  updateTeamMembers: async () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getInitialContent);
  const [loading, setLoading] = useState(true);

  const saveToLocal = (newContent: SiteContent) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newContent));
    } catch (e) {
      console.error('Failed to save content to localStorage:', e);
    }
  };

  const refreshContent = useCallback(async () => {
    try {
      const data = await fetchSiteContent();
      setContent((prev) => {
        const sanitizedData = sanitizeSiteContent(data);
        const merged: SiteContent = {
          hero: { ...sanitizedData.hero, ...prev.hero },
          about: { ...sanitizedData.about, ...prev.about },
          stats: { ...sanitizedData.stats, ...prev.stats },
          board: { ...sanitizedData.board, ...prev.board },
          sponsors: { ...sanitizedData.sponsors, ...prev.sponsors },
          contact: { ...sanitizedData.contact, ...prev.contact },
          settings: { ...sanitizedData.settings, ...prev.settings },
          committees: prev.committees && prev.committees.length > 0 ? prev.committees : sanitizedData.committees,
          team: prev.team && prev.team.length > 0 ? prev.team : sanitizedData.team,
        };
        saveToLocal(merged);
        return merged;
      });
    } catch (err) {
      console.error('Failed to fetch content from Firestore:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContentSection = useCallback(
    async (
      key: 'hero' | 'about' | 'stats' | 'board' | 'sponsors' | 'contact' | 'settings',
      data: Record<string, unknown>
    ) => {
      setContent((prev) => {
        const next = { ...prev, [key]: { ...prev[key], ...data } };
        saveToLocal(next);
        return next;
      });
      try {
        await updateSection(key, data);
      } catch (e) {
        console.warn(`Firestore update for ${key} failed, changes kept locally:`, e);
      }
    },
    []
  );

  const updateCommittees = useCallback(async (committees: Committee[]) => {
    setContent((prev) => {
      const next = { ...prev, committees };
      saveToLocal(next);
      return next;
    });
    try {
      await setCommitteesFirestore(committees);
    } catch (e) {
      console.warn('Firestore update for committees failed, changes kept locally:', e);
    }
  }, []);

  const updateTeamMembers = useCallback(async (members: TeamMember[]) => {
    setContent((prev) => {
      const next = { ...prev, team: members };
      saveToLocal(next);
      return next;
    });
    try {
      await setTeamMembersFirestore(members);
    } catch (e) {
      console.warn('Firestore update for team failed, changes kept locally:', e);
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
    <ContentContext.Provider
      value={{
        content,
        loading,
        refreshContent,
        updateContentSection,
        updateCommittees,
        updateTeamMembers,
      }}
    >
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

