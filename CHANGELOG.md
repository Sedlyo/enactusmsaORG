# Changelog

All notable changes to the **Enactus MSA** project will be documented in this file.

## [Unreleased] - 2026-08-01

### Added
- **SEO & Search Engine Optimization**:
  - Implemented `seo-optimizer` skill guidelines across document head and content hierarchy.
  - Updated primary `<title>` tag: `Enactus MSA - Social Entrepreneurship & Student Leadership | MSA University`.
  - Added comprehensive meta tags (`description`, `keywords`, `author`, `theme-color`, `robots`, `canonical`).
  - Added complete Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:site_name`, `og:url`) and Twitter Card metadata.
  - Injected Schema.org JSON-LD structured data (`EducationalOrganization` and `WebSite` schemas) for Google Search rich snippets.
  - Created `public/robots.txt` for search crawler guidance and route protection.
  - Created `public/sitemap.xml` for indexing site routes.
  - Added explicit crawler-accessible `<h1>` heading in `Hero.tsx` for search keyword relevance and H1 hierarchy compliance.

- **Skills Ecosystem**:
  - Added developer design and optimization skills: `ui-design`, `anti-ui-slop`, `ui-slop-score`, `ui-radar`, `frontend-design`, `ui-ux-pro-max`, and `seo-optimizer`.
  - Created project root `skills` directory junction linked to `.agents/skills`.
