import data from './referendumi.json';

export type Arg = { arg: string; by: string; src: string };
export type Ref = {
  slug: string; date: string; type: string; title: string; question: string; initiator: string;
  what: string[]; if_yes: string; if_no: string; for: Arg[]; against: Arg[];
  parties: { party: string; stance: string; src?: string; note?: string }[];
  result: { turnout: number; yes: number; no: number; quorum_met: boolean | null; quorum_note?: string; outcome: string; status?: string; src?: string } | null;
  unverified?: string[];
  aftermath?: string; sources: string[];
};
export type Archived = { date: string; topic: string; outcome: string; turnout: number | null; src: string };

export const latest = data.latest as Ref[];
export const upcoming = (data.upcoming ?? []) as Ref[];
export const archive = (data.archive ?? []) as Archived[];
export const all = [...upcoming, ...latest];
export const notes = (data.notes ?? []) as string[];
export const researchedAt = data.researched_at as string;
export const isUnofficial = (r: Ref) => !!r.result?.status?.startsWith('neuradni');

export const stanceClass = (s: string) =>
  s === 'ZA' ? 'yes' : s === 'PROTI' ? 'no' : 'neutral';
