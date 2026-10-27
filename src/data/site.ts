// Bump `updated` whenever content changes; it is shown in the masthead.
export const site = {
  name: 'zabit.si',
  tagline: 'Slovenska politika, razložena brez navijanja.',
  updated: '2026-10-27',
};

export const nav = [
  { href: '/lokalne-volitve-2026/', label: 'Lokalne volitve' },
  { href: '/referendumi/', label: 'Referendumi' },
  { href: '/kompas/', label: 'Volilni kompas' },
  { href: '/kako-deluje/', label: 'Kako deluje država' },
  { href: '/koalicija/', label: 'Koalicije' },
  { href: '/vlade/', label: 'Vlade' },
  { href: '/slovar/', label: 'Slovar' },
];

export const fmtDate = (iso: string) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
