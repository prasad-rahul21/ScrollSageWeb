# **App Name**: ScrollSAGE

## Core Features:

- Swipeable Article Cards: Implements a Tinder-style swipeable card interface for article previews using Framer Motion. Allows users to swipe left to dismiss an article or right to add it to bookmarks. Shows title, summary, and reading time on each card. Implements a radial background glow effect that corresponds to the swipe direction.
- Interactive Navbar: Includes a profile avatar dropdown, a bookmark icon, and a dark/light mode toggle switch. The app name 'ScrollSAGE' has an animated typewriter effect or a glitch hover effect.
- Animated Preference Page: A preference page with two sections: topic selection using pill/bubble buttons with bouncy click animations, and a reading time selector with a scroll bar linked to a dynamic React Speedometer.

## Style Guidelines:

- Day Mode Background: Light slate (#f1f5f9)
- Night Mode Background: Deep slate (#0f172a)
- Day Mode Primary Text: Deep blue (#0f172a)
- Night Mode Primary Text: Off-white (#f8fafc)
- Day Mode Accent Colors: Indigo (#6366f1) and yellow (#facc15)
- Night Mode Accent Colors: Violet (#8b5cf6) and teal (#14b8a6)
- Accent: Use vibrant green (#00FF00) for interactive elements and highlights.
- Employ glassmorphism and subtle gradients for a modern aesthetic.
- Prioritize cool, playful, and smooth transitions throughout the application.
- Integrate micro-interactions for hover, tap, swipe, and toggle animations to enhance user engagement.
- Use engaging 3D icons for bookmarks and profile avatars.

## Original User Request:
Build a funky, highly interactive, animated, and 3D-enhanced article reading web app called ScrollSAGE, focused entirely on great UI/UX, rich animations, and user engagement.

🔧 Tech Stack Requirements:
Use React with Vite

Language: TypeScript

Styling: Tailwind CSS

Use shadcn/ui, Radix UI, and other modern UI component libraries (if applicable)

Animations via Framer Motion

For 3D elements, use Three.js or @react-three/fiber for integration

Include Day/Night mode, with a toggle switch on the top-right corner of the Navbar

🌗 Theme Modes:
☀️ Day Mode:
Background: #f1f5f9 (light slate)

Primary Text: #0f172a (deep blue)

Accent Colors: #6366f1 (indigo), #facc15 (yellow)

Buttons: Gradient from-[#6366f1] to-[#22d3ee]

🌙 Night Mode:
Background: #0f172a (deep slate)

Primary Text: #f8fafc (off-white)

Accent Colors: #8b5cf6 (violet), #14b8a6 (teal)

Buttons: Gradient from-[#7c3aed] to-[#06b6d4]

📱 App Pages & UI Details:
1. Login / Signup Page
Funky animated login page with 3D floating elements (e.g., glowing books, floating article icons)

Background animation: Subtle 3D moving gradient blob or parallax waves using Three.js

Input fields styled with shadcn/ui, animated with Framer Motion

Button with hover lift and ripple effect

2. Homepage
Top Navbar:

Left: Logo + App Name "ScrollSAGE" (text with animated typewriter effect or glitch hover)

Right: Bookmark icon, Profile avatar dropdown, and Dark/Light toggle switch

Feature Section (Framer Motion fade-in cards):

Animated cards: “Curated Articles”, “Time Selector”, “Topic Selection”, “Dive into Knowledge”

Cards have 3D tilt-on-hover effect

Unlock the Vault button at the bottom with glowing neon animation

Background includes floating 3D shapes or animated knowledge orbs

3. Preference Page
Split section layout:

Left: Topic Selection — pill/bubble buttons using Radix UI with bouncy click animations

Right: Reading Time Selector:

A scroll bar (range: 2–8 min) linked to a dynamic React Speedometer

Speedometer changes color in gradient (e.g., from-[#22d3ee] to-[#f43f5e])

Sync between scroll bar and speedometer value

Bottom Button: "Let’s Dive, Baby" with spring bounce animation

4. Swipeable Article Page
Tinder-style Framer Motion swipeable cards

Swipe left: dismisses the article

Swipe right: adds to bookmarks

Card includes:

Title

Small summary

Reading time

Clickable for full article view

Use radial background glow on swipe direction

Background: subtle looping 3D animation using react-three-fiber (e.g., rotating abstract object)

5. Article Detail Page
Full article view with scroll-based animations

Header section with image and dynamic text animation

Floating “Back” button and “Bookmark” icon

💎 Overall UX / Design Guidelines:
Prioritize cool, playful, and smooth transitions

Use micro-interactions: hover, tap, swipe, toggle animations

Maintain high contrast and readability in both dark and light modes

Use glassmorphism or subtle gradients for modern look

Make the layout responsive for desktop and mobile
  