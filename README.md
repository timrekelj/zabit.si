# zabit.si (onepager)

Single page with the Claude logo. Same stack as `master`: [Astro](https://astro.build), static output.

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # output in dist/
```

| What | File |
|---|---|
| The page | `src/pages/index.astro` |
| Claude logo (simple-icons, CC0) | `src/components/ClaudeLogo.astro` |
| `<head>` and page shell | `src/layouts/Base.astro` |
| Design tokens, fonts | `src/styles/global.css` |
