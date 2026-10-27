# AGENTS.md

Guidance for coding agents working on zabit.si.

> This is the `onepager` branch: a single page with the Claude logo. The politics site
> (referendums, kompas, explainers) lives on `master`; most of the content rules below
> apply there.

## What this is

zabit.si explains Slovenian politics to everyone, without taking sides: referendums,
a volilni kompas (party matcher), and explainers on how the state works. The goal is to be
the most up-to-date, trustworthy source on Slovenian politics. All site copy is in Slovenian.

## Stack and commands

- [Astro](https://astro.build) 7, static output, no UI framework. Interactivity is plain
  TypeScript in `<script>` tags inside `.astro` pages.
- Fonts are self-hosted via `@fontsource-variable/newsreader` (headings, long-form text)
  and `@fontsource-variable/schibsted-grotesk` (UI, body).

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # must pass before you finish; output in dist/
```

There are no tests. A clean `npm run build` is the minimum check.

## Layout

```
src/layouts/Base.astro          <head> and page shell
src/styles/global.css           design tokens and shared classes
src/components/ClaudeLogo.astro Claude mark (simple-icons, CC0)
src/pages/index.astro           the one page
```

## Content rules (non-negotiable)

1. **Every fact needs a source.** Constitution, Državni zbor, DVK (volitve.gov.si,
   dvk-rs.si), Uradni list / pisrs.si, official party documents, or reputable media.
   Never state current political facts from model memory; look them up.
2. **Both sides with equal care.** Referendum arguments: similar count and length per side,
   each attributed (`by`) with a source link (`src`). No editorialising.
3. **Party positions come only from party documents.** In the kompas each position is
   `{ v: -2..2, quote, page }` with a verbatim quote, or `null` if the program does not
   address the statement. Do not infer from ideology or later government actions.
4. **Neutral presentation.** No party colours. Parties are listed alphabetically or by
   seat count, never in an order that implies preference. Result rankings are the only
   exception.
5. **Humour targets the system, never one party.** If a joke would not work equally for
   every party, cut it.
6. **Be honest about uncertainty.** Unofficial results are labelled (`result.status`
   starting with `neuradni`). Unverified claims go in the referendum's `unverified` list,
   which the page shows.

## Updating content

- Bump `updated` in `src/data/site.ts` whenever content changes.
- **Referendums:** edit `src/data/referendumi.json`. Keep `title` short and plain
  (the full official name goes in `full_title`). When DVK publishes final results,
  update the numbers and remove the `neuradni` status.
- **Kompas:** add or edit `data/kompas-<year>/<party>/positions.json`, then run
  `node scripts/build-kompas.mjs data/kompas-<year>`. Topic labels and the one-line
  context per statement live in `statements.json` (`topic`, `ctx`, `src`); the 2022 set
  uses fallbacks in the script. The live kompas is built from `data/kompas-2026`.
  `data/kompas-2022` is kept as an archive.
- **Elections, governments:** `src/data/content.ts`. Research notes with sources for the
  2026 election, government and local elections are in `data/elections-2026-research.json`.
- **Local elections:** `src/data/lokalne-2026.json`, page `src/pages/lokalne-volitve-2026.astro`.

## Design conventions

- Editorial, newspaper-like: warm paper (`--paper`), ink text, thin rules. No drop
  shadows, gradients, emoji icons or decorative colour.
- Use the tokens in `global.css` (`--ink*`, `--rule`, `--yes`/`--no` only for ZA/PROTI).
- Headings and quotes in `var(--serif)`, UI and labels in `var(--sans)`; small caps-style
  labels use the `.label` class.
- Write copy in plain, friendly Slovenian for all ages. Avoid em dashes in copy.

## Git

- Default branch is `master`. Don't commit or push unless asked.
- `node_modules/` and `dist/` are ignored.
