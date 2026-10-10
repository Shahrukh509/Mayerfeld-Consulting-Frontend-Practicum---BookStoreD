# 📚 Booklovers - Independent Bookstore Website

A lightweight, single-page website for an independent bookstore built strictly with **pure HTML5 and CSS3**—completely free of JavaScript, external frameworks, or build dependencies.

The site features a warm literary palette (parchment cream, sand, espresso brown, terracotta rust), fully responsive CSS Grid and Flexbox layouts, accessible semantic landmarks, and in-line code comments explaining the architectural decisions behind every section.

---

## 📄 Table of Contents

- [Architectural Overview & Section Rationale](#-architectural-overview--section-rationale)
- [Features](#-features)
- [Theme Palette & CSS Variables](#-theme-palette--css-variables)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [License](#-license)

---

## 🧠 Architectural Overview & Section Rationale

Below is an overview of why each section and layout technique was chosen, as documented in the source code comments:

### 1. Global Box-Sizing Reset & Body (`box-sizing: border-box`)
* **Why:** Applying `box-sizing: border-box` globally ensures that padding and borders are calculated inside an element's total width and height. Setting `overflow-x: hidden` and using fluid measurements prevents horizontal scrolling across mobile, tablet, and desktop viewports without requiring JavaScript hacks.

### 2. Header & Navigation (`<header>`, `<nav>`)
* **Why:** `<header>` serves as the primary top banner landmark. `<nav>` wraps the site's primary navigation links (`href="#..."`) to support internal smooth-scrolling without JavaScript. **Flexbox** (`display: flex`) is used to align the brand identity, search form, and links on a single horizontal axis.

### 3. Hero Banner (`<section class="hero">`) & `<h1>`
* **Why:** HTML accessibility standards recommend having exactly **one `<h1>` per page** to establish the top-level topic for search engines and screen readers. Flexbox centers the hero message visually and vertically over a warm gradient background.

### 4. Features Strip (`<section class="features">`)
* **Why:** Highlights key value propositions (e.g., local delivery, book clubs, curbside pick-up). **CSS Grid** (`repeat(auto-fit, minmax(220px, 1fr))`) allows items to automatically stack into columns on desktop and wrap seamlessly into single columns on mobile devices without relying on complex media queries.

### 5. Product Collections (`<section class="products">` - Fiction, Non-Fiction, Staff Picks)
* **Why:** Serves as the primary catalog layout. Each category uses `<article>` elements for semantic self-containment. 
* **Layout Rationale:** **CSS Grid** (`repeat(auto-fit, minmax(240px, 1fr))`) establishes a responsive grid system for book cards, while **Flexbox** (`display: flex; flex-direction: column; justify-content: space-between;`) is applied inside each card to keep titles, cover badges, descriptions, and action buttons consistently aligned regardless of text length.

### 6. Upcoming Events & Book Clubs (`<section class="events">`)
* **Why:** Replaces temporary popups/modals with a clean, static, accessible 2-column/1-column CSS Grid. Allows readers to browse upcoming author readings, community book clubs, and store events directly within the page flow.

### 7. Footer & Store Info (`<footer>`, `<aside>`)
* **Why:** `<footer>` is the standard semantic landmark for closing page metadata, copyright, hours, location, and quick links. Using `<address>` provides standard machine-readable contact information for local SEO.

---

## ✨ Features

- **Zero JavaScript**: Operates entirely on HTML5 standard controls and pure CSS3 rendering.
- **Semantic Landmarks**: Screen-reader accessible markup using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<address>`, and `<footer>`.
- **Pure CSS Grid & Flexbox Layouts**: 
  - **Grid**: Auto-wrapping product cards, features, and event listings.
  - **Flexbox**: Header bar distribution, hero banner centering, and uniform card footer alignments.
- **Custom CSS Properties (`:root`)**: Centralized color variables for easy theme customization and maintenance.
- **Zero Horizontal Scroll**: Strictly engineered to maintain a fluid layout from mobile devices (320px) to ultra-wide displays.

---

## 🎨 Theme Palette & CSS Variables

| CSS Variable | Hex Code | Purpose |
| :--- | :--- | :--- |
| `--bg-cream` | `#FDFBF7` | Main page background (soft parchment paper look) |
| `--bg-sand` | `#F5EFE6` | Card backgrounds & subtle contrast sections |
| `--text-espresso` | `#2C1D11` | Primary text & major headings (deep coffee tone) |
| `--text-muted` | `#6A584C` | Secondary body text & card subtitles |
| `--accent-rust` | `#C05A3E` | Call-to-action buttons, badges & links (terracotta) |
| `--border-warm` | `#E3D8C8` | Structural borders & subtle separators |

---

## 📂 Project Structure

```text
.
├── index.html       # Complete HTML5 structure with embedded CSS3 & inline commentary
└── README.md        # Comprehensive project overview and architectural documentation