# Autonomous AI Agent Guidelines — Smart Vehicle Landing Page

This repository hosts the official landing page and web presentation layer for the **Smart Vehicle (Pametno Vozilo)** open-source Edge AI robotics platform.

## Project & Author Metadata
- **Project Name:** Smart Vehicle (Pametno Vozilo) — Autonomous Edge AI Platform
- **Author:** Danilo Stoletović
- **Author Website:** [danilostoletovic.com](https://danilostoletovic.com)
- **Official Domain:** [https://smartvehicle.dev/](https://smartvehicle.dev/)
- **GitHub Organization:** [https://github.com/smartvehiclelab](https://github.com/smartvehiclelab)
- **Central Repository:** [https://github.com/smartvehiclelab/landing-page](https://github.com/smartvehiclelab/landing-page)
- **License:** MIT License

## Machine-Readable Specifications
- **Author & Colophon:** [humans.txt](https://smartvehicle.dev/humans.txt)
- **Web App Manifest:** [site.webmanifest](https://smartvehicle.dev/site.webmanifest)
- **LLM Knowledge Spec:** [llms.txt](https://smartvehicle.dev/llms.txt)
- **AI Agent Capabilities:** [agents.txt](https://smartvehicle.dev/agents.txt)
- **Security Policy (RFC 9116 / Cloudflare):** [.well-known/security.txt](https://smartvehicle.dev/.well-known/security.txt)
- **Robots Policy:** [robots.txt](https://smartvehicle.dev/robots.txt)
- **Sitemap:** [sitemap.xml](https://smartvehicle.dev/sitemap.xml)


## Engineering Guidelines for AI Coding Agents
1. **Zero External Runtime Dependencies:**
   - The landing page is authored using semantic HTML5, Vanilla CSS, and lightweight Vanilla JavaScript.
   - Do not introduce npm packages, build bundlers, or heavy external CSS frameworks (e.g. Tailwind) without explicit user instructions.
2. **Performance First & Core Web Vitals:**
   - The page achieves 100/100/100/100 on Google PageSpeed Insights.
   - Any added visual assets must be compressed (AVIF/WebP) with proper dimensions, explicit `loading="lazy"`, and `fetchpriority` attributes where appropriate.
3. **Dual CSS Synchronization:**
   - `style.css` is the readable source stylesheet.
   - `style.min.css` is the minified production stylesheet referenced by `index.html`.
   - When modifying styles, always update both `style.css` and `style.min.css`.
4. **Security & Vulnerability Reporting:**
   - Security disclosures must follow the guidelines at `/.well-known/security.txt` and be directed to `danilo.stoletovic@outlook.com`.
