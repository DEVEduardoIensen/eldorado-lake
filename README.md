# Eldorado Lake - Official Website

## Overview
This repository contains the source code for the official Eldorado Lake website. The project is a high-performance landing page tailored for the sport fishing sector, specifically highlighting operations at Lago Foz do Areia, Paraná.

## Technical Architecture
The application is built using a modern, lightweight, and dependency-free stack to ensure maximum performance, security, and scalability.

- **Markup & Styling**: HTML5 and CSS3 (Vanilla). Utilizes CSS Grid and Flexbox for fully responsive layouts across all device viewports.
- **Interactivity**: Vanilla ES6+ JavaScript. Features modular components including custom lightboxes, intersection observers, scroll-based logic, and dynamic DOM manipulation without the overhead of heavy frameworks.
- **Assets Optimization**: Full integration of WebP image formatting. Image compression algorithms were applied to maintain visual fidelity while strictly minimizing bandwidth consumption, optimizing for mobile data connections.
- **Media**: Background video optimized for web delivery (MP4), heavily compressed to guarantee near-instant First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

## Design System
The visual identity follows a strict "Aquatic Dark & Gold" theme.
- **Typography**: Primary headings utilize Outfit; body text utilizes Inter.
- **UI/UX Patterns**: Glassmorphism effects, custom micro-animations, and dynamic hover states designed to increase user retention and conversion rates.
- **Accessibility**: Includes considerations for reduced motion and responsive font scaling.

## Features
1. **Hero Section**: High-resolution video background with synchronized, performant scroll animations.
2. **Infrastructure**: Responsive grid displays detailing accommodations and services.
3. **Packages**: Interactive pricing tiers with clear value propositions.
4. **Media Gallery**: Integrated YouTube and Instagram embeds, alongside a highly optimized image gallery with a custom modal viewer.
5. **Contact/Booking**: Direct WhatsApp integration routing for immediate lead capture.

## Deployment Strategy
This project is configured for seamless deployment on Vercel's Global Edge Network.
- **Hosting**: Vercel.
- **Analytics**: Vercel Web Analytics integrated for real-time visitor tracking and insights.
- **Performance**: Edge caching ensures global delivery times under 50ms.

## Development & Maintenance
The codebase is structured for easy maintenance and maximum performance. Content updates (text, images, prices) can be performed directly via the repository files.

Recent codebase optimization updates have removed obsolete background removal Python scripts, unused image assets, and cleaned up comments and excessive whitespaces to keep the source files clean, lightweight, and performant.

---
*Proprietary code developed for Eldorado Lake operations.*
