# 3D Neon Carousel Website - Setup Instructions

## Project Overview

A production-ready React + Vite application featuring a stunning 3D neon carousel with dark mode, GSAP animations, and Tailwind CSS styling.

## Tech Stack

- **React** 19.2.0
- **Vite** 7.2.2 (Build tool)
- **Tailwind CSS** 3.x (Utility-first CSS with neon theme)
- **Swiper.js** 12.0.3 (3D carousel with fade effect)
- **GSAP** 3.13.0 (Smooth animations)
- **PostCSS** & **Autoprefixer**

## Features

### 🎨 3D Neon Carousel
- **3 Slides** with stunning content:
  1. **Welcome Slide** - Tamil & English welcome message
  2. **Authors Slide** - 3 clickable author profiles linking to YouTube
  3. **Community Slide** - Social media integration

### ✨ Visual Effects
- **Dark Theme** with neon blue, pink, and cyan accents
- **GSAP Animations** - Zoom-in + rotate effects on slide transitions
- **Neon Glow Effects** - Dynamic shadows on active elements
- **Smooth Transitions** - Fade effect between slides
- **Hover Interactions** - Scale and glow on hover

### 🔗 Social Media Integration
- Facebook
- Instagram
- YouTube (3 author channels)
- WhatsApp

All links open in new tabs with proper security attributes.

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

All required dependencies are already configured in `package.json`:
- Tailwind CSS, PostCSS, Autoprefixer
- Swiper.js and GSAP
- React and Vite

### 2. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

Build output will be in the `dist/` folder.

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
theantamil-amuthu-novels/
├── src/
│   ├── components/
│   │   ├── NeonBannerCarousel.jsx    # Main 3D carousel with all 3 slides
│   │   ├── SocialIcons.jsx           # Social media icons with neon effects
│   │   ├── AuthorSection.jsx         # Standalone author section
│   │   ├── Header.jsx                # Navigation header
│   │   └── BackgroundVowels.jsx      # Animated background
│   ├── assets/
│   │   ├── image1.jpg                # Slide 1: Welcome content
│   │   ├── image2.jpg                # Slide 2: Authors content
│   │   ├── image3.jpg                # Slide 3: Community content
│   │   ├── swetha-avatar.png
│   │   ├── thenmozhi-avatar.png
│   │   └── mohanaamozhi-avatar.png
│   ├── context/
│   │   ├── ThemeContext.jsx          # Dark/light theme management
│   │   └── LanguageContext.jsx       # Tamil/English switching
│   ├── App.jsx                       # Main app component
│   ├── App.scss                      # App-specific styles
│   └── index.css                     # Global styles + Tailwind directives
├── tailwind.config.js                # Tailwind configuration with neon theme
├── postcss.config.js                 # PostCSS configuration
├── vite.config.js                    # Vite configuration
└── package.json                      # Dependencies

```

## Configuration Files

### Tailwind Config (`tailwind.config.js`)

Custom neon theme colors:
- `neon-cyan` - #00f0ff
- `neon-magenta` - #ff00ff
- `neon-pink` - #ff1493
- `neon-blue` - #0ea5e9
- `dark-bg` - #020617

Custom shadows:
- `shadow-neon-cyan`
- `shadow-neon-magenta`
- `shadow-neon-pink`
- `shadow-glow-sm/md/lg`

Custom animations:
- `animate-float`
- `animate-glow-pulse`
- `animate-slide-in`

## Component Details

### NeonBannerCarousel Component

**Location:** `src/components/NeonBannerCarousel.jsx`

**Features:**
- 3 slides with fade transitions
- GSAP animations on slide change (zoom + rotate)
- Custom navigation buttons with neon styling
- Pagination dots with active state glow
- Autoplay (6 second delay)
- Responsive design (mobile & desktop)

**Slide Content:**

1. **Slide 1 - Welcome**
   - Tamil text: "தேன்தமிழமுது தேடியடி அள்ளி அள்ளி படுக ஆசை பெருகுமே!"
   - English: "Countless words to find in endless worlds. We welcome you!"
   - Background: image1.jpg with overlay

2. **Slide 2 - Authors**
   - Title: "Follow us on Pratilipi for more stories!"
   - 3 clickable author cards with round avatars
   - Each links to YouTube channel (opens in new tab)
   - Background: image2.jpg with overlay

3. **Slide 3 - Community**
   - Heading: "Let's build a world together!"
   - Subheading: "Join our community"
   - 4 social media icons (Facebook, Instagram, YouTube, WhatsApp)
   - Background: image3.jpg with overlay

### SocialIcons Component

**Location:** `src/components/SocialIcons.jsx`

**Features:**
- 4 social media platforms
- Dynamic hover effects with custom colors
- Neon glow on hover
- Scale transformation on hover
- Tooltips showing platform name

### Author Links

| Author | YouTube Channel |
|--------|----------------|
| Swetha swe | https://youtube.com/@swethaa_swe |
| Thenmozhi | https://youtube.com/@thenthuzhinovels |
| Mohanaamozhi | https://youtube.com/@mohanaamozhi_novels |

### Social Media Links

| Platform | URL |
|----------|-----|
| WhatsApp | https://whatsapp.com/channel/0029VbB0Wxt65yDK3ZTYCC1D |
| Facebook | https://www.facebook.com/share/g/1FKze6xJV1/ |
| Instagram | https://www.instagram.com/thentamizhamuzhunovels |
| YouTube | Linked to author channels |

## Customization

### Change Slide Content

Edit `src/components/NeonBannerCarousel.jsx`:
- Update Tamil/English text in Slide 1
- Modify author information in Slide 2
- Change community message in Slide 3

### Modify Neon Colors

Edit `tailwind.config.js`:
```javascript
colors: {
  'neon-cyan': '#00f0ff',      // Change to your preferred cyan
  'neon-magenta': '#ff00ff',   // Change to your preferred magenta
  'neon-pink': '#ff1493',      // Change to your preferred pink
}
```

### Adjust Animation Speed

In `NeonBannerCarousel.jsx`, modify:
```javascript
autoplay={{
  delay: 6000,  // Change delay (milliseconds)
}}
```

GSAP animation duration:
```javascript
{ scale: 1, rotateY: 0, opacity: 1, duration: 0.8 }  // Change duration
```

### Update Images

Replace images in `src/assets/`:
- `image1.jpg` - Welcome slide background
- `image2.jpg` - Authors slide background
- `image3.jpg` - Community slide background
- Author avatar images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading images
- CSS animations using GPU acceleration
- Optimized Swiper configuration
- Tailwind CSS purging unused styles in production
- Vite's fast HMR (Hot Module Replacement)

## Troubleshooting

### Issue: Tailwind styles not applying

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Issue: Carousel not animating

**Solution:**
- Check that GSAP is imported correctly
- Verify Swiper CSS imports in NeonBannerCarousel.jsx
- Check browser console for errors

### Issue: Images not loading

**Solution:**
- Verify images exist in `src/assets/`
- Check file names match imports
- Ensure proper file extensions (.jpg, .png)

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Environment

- Node.js 16+ required
- npm or yarn package manager

## License

This project is part of the Tamil Novels website.

## Credits

- **Design:** Neon theme with 3D carousel
- **Images:** Tamil novel content from provided assets
- **Authors:** Swetha, Thenmozhi, Mohanaamozhi

---

**Created with React + Vite + Tailwind CSS + Swiper.js + GSAP**

For questions or support, check the social media links in the carousel!
