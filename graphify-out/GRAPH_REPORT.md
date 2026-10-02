# Graph Report - AAVEG  (2026-10-02)

## Corpus Check
- 95 files · ~366,714 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: .css 5, (none) 1)

## Summary
- 259 nodes · 537 edges · 20 communities (14 shown, 6 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Components & Layout
- Visual Assets & Theme
- Hero Section & Animations
- Build Configuration
- Navigation & Common UI
- Design Reference Images
- App Router & Entry Points
- NPM Dependencies
- Home Sections & Cards
- Dev Dependencies & Linting
- College Logo Assets
- Hostel Architecture Imagery
- Framework Core Assets
- README Documentation
- Device Detection Utils
- Events Wheel Navigation
- Public Icon Sprites
- Hero Card Effect
- Hostel Data Model

## God Nodes (most connected - your core abstractions)
1. `react` - 50 edges
2. `lucide-react` - 15 edges
3. `Button()` - 12 edges
4. `react-router-dom` - 11 edges
5. `ShinyText()` - 11 edges
6. `FloatingElements()` - 10 edges
7. `Magnetic()` - 10 edges
8. `GridBackground()` - 8 edges
9. `GlitchText()` - 7 edges
10. `Hero Section UI Reference Mockup` - 7 edges

## Surprising Connections (you probably didn't know these)
- `WhatsApp Export Hero Reference Asset` --semantically_similar_to--> `Hero Section UI Reference Mockup`  [INFERRED] [semantically similar]
  src/assets/images/WhatsApp Image 2026-09-28 at 1.30.38 PM.jpeg → public/assets/images/hero-reference.jpg
- `WhatsApp Export Hostel Leaderboard Asset` --semantically_similar_to--> `Hostel Leaderboard Podium UI Mockup`  [INFERRED] [semantically similar]
  src/assets/images/WhatsApp Image 2026-09-28 at 1.30.40 PM.jpeg → public/assets/images/hostel-leaderboard.jpg
- `WhatsApp Export Events Wheel Asset` --semantically_similar_to--> `Events Wheel Radial UI Design Mockup`  [INFERRED] [semantically similar]
  src/assets/images/WhatsApp Image 2026-09-28 at 1.30.39 PM.jpeg → public/assets/images/events-wheel.jpg
- `Fest Entrypoint (index.html)` --references--> `Hero Section UI Reference Mockup`  [EXTRACTED]
  index.html → public/assets/images/hero-reference.jpg
- `Fest Entrypoint (index.html)` --references--> `AAVEG Monogram Brand Favicon (favicon.svg)`  [EXTRACTED]
  index.html → public/favicon.svg

## Import Cycles
- None detected.

## Communities (20 total, 6 thin omitted)

### Community 0 - "UI Components & Layout"
Cohesion: 0.23
Nodes (16): lucide-react, HostelWars(), CircularHouseSelector(), BackgroundBeams(), CardSpotlight(), FloatingElements(), FocusCards(), GlitchText() (+8 more)

### Community 1 - "Visual Assets & Theme"
Cohesion: 0.07
Nodes (31): AAVEG 2026 Fest Identity & OpenGraph Metadata, Fest Entrypoint (index.html), Cinematic Halloween Typography (Cinzel, Creepster, Nosifer, Outfit), AAVEG Games Section UI Showcase, Pumpkin Jump Mini-Game Concept, Thunder Shield Mini-Game Concept, Brutalist Hostel Solitary Silhouette Atmosphere, Abandoned Hostel Monolith Exterior Concept Art (+23 more)

### Community 2 - "Hero Section & Animations"
Cohesion: 0.09
Nodes (12): react, src_assets_images_hero_aaveg_title_logo, AavegHorrorText(), Bats(), Clouds(), FloatingParticles(), Fog(), HauntedEnvironment() (+4 more)

### Community 3 - "Build Configuration"
Cohesion: 0.08
Nodes (26): name, private, scripts, build, dev, lint, preview, type (+18 more)

### Community 4 - "Navigation & Common UI"
Cohesion: 0.18
Nodes (18): react-router-dom, src_assets_logos_college_logo, Button(), InstagramIcon(), LinkedinIcon(), YoutubeIcon(), SoundToggle(), Footer() (+10 more)

### Community 5 - "Design Reference Images"
Cohesion: 0.12
Nodes (18): Aaveg Mini-Games Design Specification, Aaveg Games UI Design Reference Asset, Aaveg Festival Title Logo Artwork Asset, AAVEG Horror Brush Distressed Typography, Full Flow Reference Architecture Asset, End-to-End Festival Narrative Journey, Cinematic Horror Hero Section Layout Architecture, Hero Section Reference UI Mockup Asset (+10 more)

### Community 6 - "App Router & Entry Points"
Cohesion: 0.15
Nodes (12): react-dom, App(), Hero(), FestivalMovieJourney(), Header(), useLenis(), raf(), src_index (+4 more)

### Community 7 - "NPM Dependencies"
Cohesion: 0.15
Nodes (13): dependencies, animejs, canvas-confetti, clsx, framer-motion, gsap, lenis, lucide-react (+5 more)

### Community 8 - "Home Sections & Cards"
Cohesion: 0.26
Nodes (4): GlassContainer(), SectionTitle(), FeatureCard(), FESTIVAL_CONFIG

### Community 9 - "Dev Dependencies & Linting"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 10 - "College Logo Assets"
Cohesion: 0.33
Nodes (6): High-Contrast Header Navigation Branding, Poornima College of Engineering Header Logo Asset (Dark Mode), Poornima College of Engineering Original Color Logo Asset, Poornima College Institutional Accreditation & Branding, Temporary College Logo Placeholder Asset, Preliminary College Logo Placeholder

### Community 11 - "Hostel Architecture Imagery"
Cohesion: 0.50
Nodes (4): Brutalist Abandoned Hostel Architectural Theme, Abandoned Hostel Monolith Exterior Asset, Hostel Gothic Corridor Atmospheric Aesthetic, Dilapidated Hostel Corridor Interior Asset

### Community 12 - "Framework Core Assets"
Cohesion: 0.50
Nodes (4): React Frontend Framework Core, React Logo Vector Asset, Vite Next-Gen Frontend Tooling & Dev Server, Vite Logo Vector Asset

### Community 13 - "README Documentation"
Cohesion: 0.50
Nodes (4): React + Vite Template Documentation, Production ESLint TypeScript Guidance, React Compiler Performance Rationale, Vite React Plugins Setup

## Knowledge Gaps
- **82 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+77 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 99 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Hero Section & Animations` to `UI Components & Layout`, `Build Configuration`, `Navigation & Common UI`, `App Router & Entry Points`, `Home Sections & Cards`?**
  _High betweenness centrality (0.240) - this node is a cross-community bridge._
- **Why does `dependencies` connect `NPM Dependencies` to `Build Configuration`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies & Linting` to `Build Configuration`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _82 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Visual Assets & Theme` be split into smaller, more focused modules?**
  _Cohesion score 0.07311827956989247 - nodes in this community are weakly interconnected._
- **Should `Hero Section & Animations` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._
- **Should `Build Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.0812807881773399 - nodes in this community are weakly interconnected._