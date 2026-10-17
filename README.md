# Yuice Labs

Company website for Yuice Labs, built with React, TypeScript, Vite, and Tailwind CSS.

## Getting started

```sh
npm install
npm run dev
```

## Project structure

```text
src/
  components/
    home/       Homepage sections and their visualizations
    layout/     Site header and footer
    ui/         Shared brand, icon, and section-label components
  data/         Typed content used by the homepage
  layouts/      Shared page layouts
  pages/        Route-level page composition
  index.css     Tailwind import and global/site styles
  index.tsx     Application entry point
```

The homepage is composed in `src/pages/HomePage.tsx`. Content arrays are kept
in `src/data/homePage.ts`, separate from their presentation. Shared site chrome
belongs in `src/layouts` and `src/components/layout`; page-specific sections
belong in `src/components/home`.

## Workflows

```sh
npm run dev    # Start the development server
npm run lint   # Run ESLint and TypeScript checks
npm run build  # Create a production build
npm run start  # Preview the production build
```
