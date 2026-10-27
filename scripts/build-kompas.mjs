// Merges coded party positions into src/data/kompas.json.
// usage: node scripts/build-kompas.mjs data/kompas-<year>
// <dir>/kompas.json: { basis, parties: [[id, short, name], ...] }
// <dir>/statements.json: [{ id, t, topic?, ctx?, src? }]
// <dir>/<id>/positions.json: coded program, see AGENTS.md
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
const statements = JSON.parse(readFileSync(join(dir, 'statements.json'), 'utf8'));

// Fallback topic/context for the 2022 statement set (2026 keeps them in statements.json).
const meta = {
  davek_visoki: ['Davki', 'Dohodnina je progresivna: višji dohodki so obdavčeni z višjo stopnjo.'],
  davek_place: ['Davki', 'Nižji davki na plače pomenijo več denarja za zaposlene in manj prihodkov za proračun.'],
  davek_nepremicnine: ['Davki', 'Slovenija ima nadomestilo za uporabo stavbnega zemljišča, ne pa splošnega davka na nepremičnine.'],
  min_placa: ['Delo', 'Minimalno plačo vsako leto določi minister za delo po posvetu s socialnimi partnerji.'],
  soupravljanje: ['Delo', 'Soupravljanje pomeni, da imajo predstavniki delavcev besedo pri odločitvah podjetja.'],
  zasebno_zdravstvo: ['Zdravstvo', 'Koncesionarji so zasebni zdravniki, ki delajo v javni mreži in jih plača zdravstvena zavarovalnica.'],
  dopolnilno: ['Zdravstvo', 'Dopolnilno zavarovanje je pokrivalo doplačila k storitvam. Od leta 2024 ga je nadomestil obvezni zdravstveni prispevek.'],
  zasebne_sole: ['Šolstvo', 'Ustavno sodišče je leta 2014 odločilo, da mora država financirati obvezni program zasebnih osnovnih šol v celoti.'],
  javna_stanovanja: ['Stanovanja', 'Javna najemna stanovanja gradijo država, občine in stanovanjski skladi.'],
  najemnine: ['Stanovanja', 'Najemnine na prostem trgu danes niso omejene.'],
  jek2: ['Energija', 'JEK2 je predlagani drugi blok jedrske elektrarne v Krškem.'],
  premog: ['Energija', 'Termoelektrarna Šoštanj kuri premog iz velenjskega premogovnika.'],
  migracije: ['Migracije', 'Gre za priseljevanje tujcev na delo, za azil in za združevanje družin.'],
  ograja: ['Migracije', 'Ograja na meji s Hrvaško je bila postavljena leta 2015 med begunsko krizo.'],
  nato: ['Varnost', 'Slovenija je članica zveze NATO od leta 2004.'],
  obramba: ['Varnost', 'Članice NATO so se leta 2014 zavezale k izdatkom za obrambo v višini vsaj 2 % BDP, leta 2025 pa k še višjemu cilju do leta 2035.'],
  konoplja: ['Družba', 'Leta 2024 so volivci na posvetovalnem referendumu podprli gojenje in posest konoplje za osebno rabo.'],
  rtv: ['Mediji', 'RTV prispevek plačujejo gospodinjstva in podjetja in je glavni vir financiranja RTV Slovenija.'],
  upokojitev: ['Pokojnine', 'Starostna meja za upokojitev je bila dolgo 65 let oziroma 60 let s 40 leti delovne dobe. O njenem zviševanju se v zadnjih letih veliko razpravlja.'],
  brezplacen_prevoz: ['Promet', 'Brezplačen javni prevoz imajo danes upokojenci in nekatere druge skupine.'],
};

const cfg = JSON.parse(readFileSync(join(dir, 'kompas.json'), 'utf8'));
const parties = cfg.parties;

const out = {
  basis: cfg.basis,
  statements: statements.map((s) => ({
    id: s.id, t: s.t,
    topic: s.topic ?? meta[s.id][0],
    ctx: s.ctx ?? meta[s.id][1],
    ...(s.src ? { src: s.src } : {}),
  })),
  parties: [],
};
for (const [key, short, name] of parties) {
  const f = join(dir, key, 'positions.json');
  if (!existsSync(f)) { console.warn('missing', key); continue; }
  const p = JSON.parse(readFileSync(f, 'utf8'));
  const pos = {};
  for (const s of statements) {
    const x = p.positions[s.id];
    if (!x) throw new Error(`${key}: missing ${s.id}`);
    pos[s.id] = x.v === null ? null : { v: x.v, q: x.quote, p: x.page ?? null, ...(x.url ? { u: x.url } : {}) };
  }
  out.parties.push({ id: key, short, name, source: p.source_title, url: p.source_url, pos });
}
writeFileSync(new URL('../src/data/kompas.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('parties:', out.parties.map((p) => p.short).join(', '));
