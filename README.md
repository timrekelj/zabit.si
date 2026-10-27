# zabit.si

Slovenska politika, razložena brez navijanja. Static site built with [Astro](https://astro.build).

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # output in dist/
```

## Where the content lives

| What | File |
|---|---|
| Masthead "posodobljeno" date, navigation | `src/data/site.ts` |
| Institutions, election seat counts, governments, glossary | `src/data/content.ts` |
| Referendums (latest, upcoming, archive) | `src/data/referendumi.json` |
| Volilni kompas statements and party positions | `src/data/kompas.json` (generated) |

Bump `updated` in `src/data/site.ts` whenever content changes.

## Volilni kompas

Party positions are coded only from official party programs. Each position has a value
from -2 (explicitly against) to 2 (explicitly for), a verbatim quote and a page number,
or `null` if the program does not address the statement.

`src/data/kompas.json` is generated from a folder of coded programs:

```
<dir>/statements.json
<dir>/<party>/positions.json   # gs, sds, nsi, sd, levica
```

```sh
node scripts/build-kompas.mjs data/kompas-2026
```

Topic labels and the one-line context under each statement live in `scripts/build-kompas.mjs`.

## Rules

See `/o-nas/`: every fact has a source, both sides get equal care, party positions come
only from party documents, humour targets the system and never one party.
