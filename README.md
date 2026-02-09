# TEC - E-Cell MET Landing Page

> A high-performance, F1 racing-themed landing page for the Tech & Entrepreneurship Challenge (TEC) event by E-Cell MET.

![TEC E-Cell](public/teclogo.svg)

## 🏎️ About TEC

TEC (Tech & Entrepreneurship Challenge) is a **3-month innovation saga** where entrepreneurial ideas accelerate from concept to reality through 6 intensive phases. Organized by E-Cell MET, this event brings together aspiring entrepreneurs, mentors, and industry experts in a high-energy competition.

## ✨ Features

### 🎬 Scroll-Driven Hero Section
- Canvas-based animation using 120 F1 car frames
- Smooth scroll-scrubbing video playback
- Dual-screen storytelling approach with fade transitions
- Image preloading for optimal performance

### 🏁 Interactive Timeline ("The Circuit")
- Carbon fiber textured background
- Mouse-tracking spotlight effect
- SVG race track with 6 checkpoints
- Scroll-animated progress line
- Phase detail cards with hover effects

### 👥 Mentors Section ("The Pit Crew")
- Bold F1-inspired title styling with red glow effects
- Responsive mentor card grid
- Hover animations with red glowing borders
- Expertise tag system

### 🚀 Teams Section ("The Grid")
- Masonry layout for startup showcases
- F1-themed team cards
- Position numbers and member counts
- Smooth hover animations

### 📡 Contact Section ("Mission Control")
- Telemetry-style contact form
- Real-time "Transmission Active" indicator
- Custom-styled form fields
- Submission feedback

### 🎨 Design System
- **Theme**: Dark F1 Racing with Deep Black (#050505) and F1 Red (#FF1801)
- **Typography**: Russo One, Orbitron, Montserrat, Inter
- **Effects**: Glassmorphism, red glows, smooth animations
- **Framework**: Tailwind CSS with custom configuration

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Canvas API**: For scroll-driven video sequence
- **Custom Hooks**: 
  - `useScrollImageSequence` - Manages F1 car frame animation
  - `useMousePosition` - Tracks mouse for interactive effects

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohansachinpatil/TEC-ECellMET.git
   cd TEC-ECellMET
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
TEC-ECellMET/
├── public/
│   ├── frames/              # 120 F1 car animation frames
│   ├── logo.png            # E-Cell logo
│   ├── ecellmetlogo.svg    # E-Cell MET logo
│   └── teclogo.svg         # TEC logo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Glassmorphism navbar
│   │   ├── HeroSection.jsx # Scroll-driven hero
│   │   ├── TimelineSection.jsx # Interactive circuit
│   │   ├── MentorsSection.jsx  # Pit crew
│   │   ├── TeamsSection.jsx    # The grid
│   │   ├── ContactSection.jsx  # Mission control
│   │   └── Footer.jsx      # Site footer
│   ├── hooks/
│   │   ├── useScrollImageSequence.js
│   │   └── useMousePosition.js
│   ├── App.jsx
│   ├── index.css           # Global styles + Tailwind
│   └── main.jsx
├── tailwind.config.js      # Custom theme config
├── vite.config.js
└── package.json
```

## 🎯 Key Features Implementation

### Scroll Animation
The hero section uses a custom hook to preload and render 120 frames of an F1 car animation, synchronized with scroll position for a cinematic effect.

### Performance Optimizations
- Image preloading with loading states
- Throttled scroll event listeners
- Optimized canvas rendering
- Responsive lazy loading

### Mobile Responsiveness
Fully optimized for mobile devices (Android/iOS):
- Responsive text sizing (text-base → text-2xl → text-7xl)
- Touch-friendly buttons and navigation
- Optimized spacing and padding
- Grid layouts that stack on mobile
- Compact navbar for small screens

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` folder.

## 🌐 Deployment

This project can be easily deployed to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  'deep-black': '#050505',
  'f1-red': '#FF1801',
}
```

### Fonts
Update Google Fonts imports in `index.html` and Tailwind config.

### Content
- **Mentors**: Edit data in `src/components/MentorsSection.jsx`
- **Teams**: Edit data in `src/components/TeamsSection.jsx`
- **Timeline Phases**: Edit data in `src/components/TimelineSection.jsx`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is created for E-Cell MET's TEC event.

## 🙏 Acknowledgments

- E-Cell MET Team
- F1 Racing for design inspiration
- React and Vite communities

---

**Built with ❤️ for E-Cell MET | TEC 2024**
