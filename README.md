# 🧪 Liquid Glass Portfolio

A premium, highly interactive, and visually stunning cinematic developer portfolio. Built using **React 19**, **Vite**, **TypeScript**, and **TailwindCSS**, this project features a dark cinematic aesthetic with customized liquid-glass UI elements and a custom-engineered seamless video background loop.

---

## 🌟 Key Features

*   **🎬 Cinematic Video Background:** A full-screen video background (`/assets/Man_typing_on_laptop_202607020937.mp4`) that integrates a custom JavaScript-based cross-fading loop mechanism to ensure seamless transitions.
*   **🫧 Liquid Glass UI:** Premium glassmorphism UI components (navbar, cards, tab selectors, and social buttons) utilizing carefully crafted background blurs, borders, and hover states.
*   **⚡ Interactive Tabs:** Dynamic tab system matching standard routing sections:
    *   **Projects Showcase:** Highlights of key production projects like *LearnLi*, *Soulful Haven*, and *WeddingSnap*.
    *   **Interactive Skills:** Categorized layout of engineering capabilities grouped by domains (Mobile, Web, Data & DevOps).
    *   **Contact & Call to Action:** Seamless email subscription intake form and interactive manifesto dialog.
*   **📱 Responsive Layout:** Perfectly optimized across mobile, tablet, and desktop viewports, hiding desktop actions on mobile to keep interfaces clutter-free.
*   **✨ Micro-Animations:** Elegant hover effects, scale transformations, and fade transitions that elevate user engagement.

---

## 🛠️ Tech Stack

*   **Core Library:** React 19
*   **Build Tool:** Vite 8 (extremely fast Hot Module Replacement)
*   **Styling:** TailwindCSS v3 (utility-first styles combined with custom glassmorphism utilities)
*   **Programming Language:** TypeScript
*   **Icons:** Lucide React

---

## ⚙️ How the Seamless Background Loop Works

Unlike default HTML5 video loops that suffer from sudden flickers or cuts, this portfolio implements a custom JavaScript-based cross-fading loop:

1.  **RequestAnimationFrame Sync:** Rather than using heavy setTimeouts, a recursive `requestAnimationFrame` loop calculates precise frame durations.
2.  **Pre-End Fade Out:** When the video gets within `0.55s` of its ending timestamp, it begins a `500ms` fade-out, smoothly transitioning the opacity to `0`.
3.  **Reset & Fade In:** Once the video ends, the player resets the playback head to `0.0s`, initiates playback, and performs a corresponding `500ms` fade-in.

This results in a professional, distraction-free looping background video.

---

## 📁 Project Structure

```text
liquid-glass-portfolio/
├── public/                 # Static assets (contains background video)
│   └── assets/
│       └── Man_typing_on_laptop_202607020937.mp4
├── src/
│   ├── App.tsx             # Main App layout, tab-switching, and video loop engine
│   ├── main.tsx            # React application entry point
│   ├── index.css           # Custom glassmorphism utility classes and base styles
│   └── vite-env.d.ts       # Vite TypeScript type declarations
├── index.html              # HTML5 wrapper and Google fonts link
├── package.json            # Project dependencies and script runner configurations
├── tailwind.config.js      # Tailwind configuration rules
└── README.md               # Project documentation (this file)
```

---

## 🚦 Getting Started

Follow these steps to run the portfolio website locally:

### 1. Prerequisites
Ensure you have **Node.js** (v18.x or higher) and **npm** installed on your system.

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/BadushaPN/liquid-glass-portfolio.git

# Navigate into the project folder
cd liquid-glass-portfolio

# Install required packages
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with Hot Module Replacement (HMR) enabled.

### 4. Build for Production
```bash
# Compile and optimize the project
npm run build

# Preview the production-ready build locally
npm run preview
```

---

## 🎨 Design Customization

### Changing the Background Video
Simply replace the video file in `public/assets/Man_typing_on_laptop_202607020937.mp4` with your own video, keeping the same name, or update the `src` attribute in the `<video>` element inside `src/App.tsx`.

### Customizing the Glassmorphism Effect
The `.liquid-glass` class is defined in `src/index.css`. You can adjust the backdrop blur intensity and background opacity to match your preference:
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 📬 Contact & Links

*   **GitHub:** [@badushapn](https://github.com/badushapn)
*   **LinkedIn:** [Badusha P N](https://linkedin.com/in/badushapn)
*   **Email:** [badushapn.developer@gmail.com](mailto:badushapn.developer@gmail.com)
