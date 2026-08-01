---
name: seo-optimizer
description: Audits and updates website code for technical SEO, Google Search visibility, meta tags, and structured data (Schema.org).
---

# SEO & Google Search Optimization Skill

When asked to optimize a website for SEO or Google Search rankings, follow these explicit audit and code modification guidelines:

## 1. Meta Tags & Document Head Optimization
* **Title Tags**: Ensure every page has a unique `<title>` tag (50–60 characters). Include primary keyword early and brand name at the end (`Target Keyword - Brand`).
* **Meta Descriptions**: Ensure a concise `<meta name="description">` (120–155 characters) summarizing the page with a clear call-to-action.
* **Viewport & Canonical**: Ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present. Add `<link rel="canonical" href="...">` to eliminate duplicate content issues.
* **Open Graph & Social**: Add `og:title`, `og:description`, `og:image`, `og:url`, and `twitter:card` tags for social preview indexing.

## 2. Heading Hierarchy & Content Accessibility
* **Strict H1 Rule**: Verify exactly ONE `<h1>` exists per page containing the main target search keyword.
* **Semantic Hierarchy**: Structure subheadings logically (`<h1>` -> `<h2>` -> `<h3>`). Do not skip heading levels for visual styling (use CSS classes instead).
* **Image Accessibility**: Add descriptive `alt="..."` attributes to all `<img>` elements. Add `loading="lazy"` to off-screen images to improve Core Web Vitals.

## 3. Structured Data (JSON-LD / Schema.org)
* Inject valid Schema.org JSON-LD scripts inside the `<head>` or body.
* Include **WebSite** or **Organization** schema on the homepage.
* Include **Article**, **Product**, or **BreadcrumbList** schema on relevant content pages to trigger rich snippets in Google search results.

## 4. Crawlability & Indexing Files
* Check for or generate a valid `public/robots.txt` file allowing search engine bots.
* Verify or generate an XML sitemap (`public/sitemap.xml`) referencing all indexable routes.
