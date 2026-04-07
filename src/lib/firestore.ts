import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';
import type { SiteContent, Committee, TeamMember } from '@/context/ContentContext';
import { siteContent as defaults } from '@/context/ContentContext';

// --- Fetch all site content ---

export async function fetchSiteContent(): Promise<SiteContent> {
  const sectionKeys = ['hero', 'about', 'stats', 'board', 'sponsors', 'contact', 'settings'] as const;

  const sectionDocs = await Promise.all(
    sectionKeys.map((key) => getDoc(doc(db, 'content', key)))
  );

  const sections: Record<string, unknown> = {};
  sectionKeys.forEach((key, i) => {
    sections[key] = sectionDocs[i].exists() ? sectionDocs[i].data() : undefined;
  });

  const [committeesSnap, teamSnap] = await Promise.all([
    getDocs(collection(db, 'committees')),
    getDocs(collection(db, 'team')),
  ]);

  type WithOrder = { order?: number };

  const committees: Committee[] = [];
  committeesSnap.forEach((d) => committees.push(d.data() as Committee));
  committees.sort((a, b) => ((a as WithOrder).order ?? 0) - ((b as WithOrder).order ?? 0));

  const team: TeamMember[] = [];
  teamSnap.forEach((d) => team.push({ ...d.data(), id: Number(d.id) } as TeamMember));
  team.sort((a, b) => ((a as WithOrder).order ?? 0) - ((b as WithOrder).order ?? 0));

  type Sections = Record<string, Record<string, unknown> | undefined>;
  const s = sections as Sections;

  return {
    hero: { ...defaults.hero, ...s.hero },
    about: { ...defaults.about, ...s.about },
    stats: { ...defaults.stats, ...s.stats },
    board: { ...defaults.board, ...s.board },
    sponsors: { ...defaults.sponsors, ...s.sponsors },
    contact: { ...defaults.contact, ...s.contact },
    settings: { ...defaults.settings, ...s.settings },
    committees: committees.length > 0 ? committees : defaults.committees,
    team: team.length > 0 ? team : defaults.team,
  } as SiteContent;
}

// --- Update a single section ---

export async function updateSection(
  key: 'hero' | 'about' | 'stats' | 'board' | 'sponsors' | 'contact' | 'settings',
  data: Record<string, unknown>
) {
  await setDoc(doc(db, 'content', key), data, { merge: true });
}

// --- Committees CRUD ---

export async function setCommittees(committees: Committee[]) {
  const batch = writeBatch(db);
  const snap = await getDocs(collection(db, 'committees'));
  snap.forEach((d) => batch.delete(d.ref));
  committees.forEach((c, i) => {
    const ref = doc(collection(db, 'committees'));
    batch.set(ref, { ...c, order: i });
  });
  await batch.commit();
}

export async function addCommittee(committee: Committee) {
  const snap = await getDocs(collection(db, 'committees'));
  const ref = doc(collection(db, 'committees'));
  await setDoc(ref, { ...committee, order: snap.size });
}

export async function updateCommittee(docId: string, committee: Committee) {
  await setDoc(doc(db, 'committees', docId), committee, { merge: true });
}

export async function deleteCommittee(docId: string) {
  await deleteDoc(doc(db, 'committees', docId));
}

// --- Team CRUD ---

export async function setTeamMembers(members: TeamMember[]) {
  const batch = writeBatch(db);
  const snap = await getDocs(collection(db, 'team'));
  snap.forEach((d) => batch.delete(d.ref));
  members.forEach((m, i) => {
    const ref = doc(db, 'team', String(m.id));
    batch.set(ref, { ...m, order: i });
  });
  await batch.commit();
}

export async function addTeamMember(member: Omit<TeamMember, 'id'>) {
  const snap = await getDocs(collection(db, 'team'));
  const maxId = snap.docs.reduce((max, d) => Math.max(max, Number(d.id) || 0), 0);
  const id = maxId + 1;
  await setDoc(doc(db, 'team', String(id)), { ...member, id, order: snap.size });
}

export async function updateTeamMember(id: number, data: Partial<TeamMember>) {
  await setDoc(doc(db, 'team', String(id)), data, { merge: true });
}

export async function deleteTeamMember(id: number) {
  await deleteDoc(doc(db, 'team', String(id)));
}

// --- Seed defaults ---

export async function seedDefaults() {
  const { committees, team, ...sections } = defaults;
  await Promise.all(
    Object.entries(sections).map(([key, data]) =>
      setDoc(doc(db, 'content', key), data)
    )
  );
  await setCommittees(committees);
  await setTeamMembers(team);
}
