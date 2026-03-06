# Hrishinandan N - Portfolio

This repository contains the source code for my personal portfolio website.

## About

- Role: Aspiring Machine Learning Engineer
- Location: Kerala, India
- Tech: React, Vite, Tailwind CSS

## Sections

- Hero
- Achievements
- About
- Skills
- Education
- Experience
- Projects
- Blogs
- Certifications (Certificates + Badges)
- Talks
- Contact
- Footer

## Content Management

Portfolio content is JSON-driven.

- Section data files: `/src/data/*.json`
- Data aggregator: `/src/data/index.js`
- Schema reference: `/src/data/portfolioSchema.json`

Most updates (text, links, cards, dates, assets) can be done directly in the JSON files without changing components.

## Contact

The contact form is integrated with Google Apps Script for form submissions.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Deployment

Deployable on GitHub Pages, Netlify, Vercel, or any static hosting provider.

If using GitHub Pages with a repository path, set the Vite `base` value in `/vite.config.js` accordingly.
