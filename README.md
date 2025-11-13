# Antamil Amuthu Novels - React + SCSS UI

A beautiful, responsive React single-page UI for the Antamil Amuthu Novels project with animated Tamil vowels background and a slide-out hamburger menu.

## ✨ Features

- **React Functional Components**: Modern React with hooks
- **SCSS Modules**: Scoped styling with SCSS variables and mixins
- **Framer Motion**: Smooth animations for menu transitions and floating vowels
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Tamil Language Support**: Complete Tamil menu items and language switcher
- **Animated Background**: 12 Tamil vowels (அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ) with floating animations
- **Accessibility**: Semantic HTML and ARIA labels

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Main header with logo, hamburger, and language switcher
│   ├── Menu.jsx             # Slide-out navigation menu
│   └── BackgroundVowels.jsx # Animated Tamil vowels background
├── styles/
│   ├── header.module.scss   # Header component styles
│   ├── menu.module.scss     # Menu component styles
│   └── animation.module.scss # Animation styles for vowels
├── assets/
│   └── logo-placeholder.svg # Logo placeholder (ready to replace)
├── App.jsx                  # Main App component
├── App.scss                 # Global app styles
├── main.jsx                 # Entry point
├── index.css                # Global styles
└── vite.config.js           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install required packages:
   ```bash
   npm install framer-motion sass
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 🎨 Customization

### Replace Logo

Replace the placeholder logo by updating the import path in `src/components/Header.jsx`:

```jsx
import Logo from "../assets/your-logo.png";
```

Then replace the `logo-placeholder.svg` file with your actual logo.

### Customize Colors

Edit the SCSS variables in the style files:

- `src/styles/header.module.scss`
- `src/styles/menu.module.scss`
- `src/styles/animation.module.scss`

Primary colors:
- Primary Blue: `#0a2a43`
- Primary Gold: `#ffd700`

### Update Menu Items

Edit the Tamil menu items in `src/components/Menu.jsx`:

```jsx
const menuItems = [
  { label: 'முகப்பு', id: 'home' },
  { label: 'தொடர்புக்கு', id: 'contact' },
  { label: 'எங்களை பற்றி', id: 'about' },
];
```

### Adjust Animations

Modify animation parameters in `src/components/BackgroundVowels.jsx`:

- `randomDuration()`: Controls how long each vowel takes to float
- `randomDelay()`: Controls the delay between vowels
- Opacity values: Change the transparency of the floating vowels

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: < 480px

## 🎯 Header Layout

The header contains three main elements in a single row:

1. **Logo** (Left): Clickable placeholder logo
2. **Hamburger Menu** (Center): Toggles the slide-out navigation
3. ** Switcher** (Right): World icon to switch between Tamil and English

## 🌍  Switcher

Currently shows two options:
- TAMIL
- ENGLISH

Update in `src/components/Header.jsx` to add more languages or implement language switching logic.

## 🎬 Animations

### Hamburger Menu
- Smooth slide-in animation from left
- Animated bars that transform to close icon
- Overlay with fade animation

### Background Vowels
- Continuous floating animation
- Random duration and delay for organic feel
- Low opacity to not interfere with content
- Infinite loop with ease-linear motion

### Language Menu
- Fade and slide animation
- Smooth transitions on hover

## 🔧 Technologies Used

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **SCSS**: CSS preprocessor with modules
- **Framer Motion**: Animation library
- **JavaScript ES6+**: Modern JavaScript

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^7.2.2",
    "sass": "^1.77.8"
  }
}
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [SCSS Documentation](https://sass-lang.com/documentation)

## 📝 Notes

- The logo placeholder is an SVG with a Tamil letter "அ" and golden circle design
- All components are functional components using React hooks
- SCSS modules prevent style conflicts between components
- Animations use Framer Motion for performance

## 🤝 Contributing

Feel free to customize and extend this template for your needs!

## 📄 License

This project is ready to be customized for your use case.
