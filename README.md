# 🚀 Mesaya Portfolio - Interactive 3D Portfolio Website

Welcome to my interactive 3D portfolio website! This project showcases my skills as a front-end developer specializing in React, Vue.js, and modern web technologies.

## 🌐 Live Demo
**[View Live Portfolio](https://mesayaaa.github.io/portfolio-3d/)**

> An immersive 3D portfolio experience featuring glassmorphism design, smooth animations, and responsive layout.

## 🚀 Features

- **Interactive 3D Environment** - Built with Three.js and WebGL
- **Smooth Animations** - Powered by GSAP for fluid transitions
- **Responsive Design** - Optimized for all devices
- **Modern UI/UX** - Clean, professional interface
- **Dark/Light Theme** - Toggle between themes
- **Smooth Scrolling** - Enhanced user experience
- **Navigation System** - Quick access to different sections
- **Performance Optimized** - Fast loading and smooth interactions

## 🛠️ Technologies Used

### Frontend Frameworks & Libraries
- React.js
- Vue.js & Nuxt.js
- Three.js for 3D graphics
- GSAP for animations
- Vite for build tooling

### Languages & Styling
- JavaScript (ES6+)
- TypeScript
- HTML5 & CSS3
- SCSS/Sass
- Tailwind CSS

### Tools & Workflow
- Git version control
- ESLint & Prettier
- Webpack & Vite
- Jest for testing
- Node.js

## 📁 Project Structure

```
├── Experience/
│   ├── World/
│   │   ├── Controls.js      # Scroll animations and interactions
│   │   ├── Environment.js   # Lighting and scene setup
│   │   ├── Floor.js         # Floor and circle elements
│   │   ├── Room.js          # Main 3D room model
│   │   └── World.js         # World management
│   ├── Utils/
│   │   ├── Resources.js     # Asset loading
│   │   ├── Sizes.js         # Responsive handling
│   │   └── Time.js          # Animation timing
│   ├── Camera.js            # Camera controls
│   ├── Experience.js        # Main experience class
│   ├── Navigation.js        # Navigation system
│   ├── Preloader.js         # Loading animations
│   ├── Renderer.js          # WebGL renderer
│   ├── TextAnimations.js    # Text animation effects
│   └── Theme.js             # Theme switching
├── public/
│   ├── models/              # 3D models
│   └── textures/            # Textures and videos
├── index.html
├── main.js
├── style.css
└── package.json
```

## 🎯 Sections

1. **About Me** - Introduction and background
2. **My Projects** - Showcase of development work
3. **Skills & Tools** - Technical competencies
4. **Contact** - Ways to get in touch

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mesaya-portfolio.git
cd mesaya-portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customization

### Colors
The color scheme can be customized in `style.css`:
```css
:root {
  --color-text-light: #333332;
  --color-background-light: #FAF4E5;
  --color-pink-light: #e5a1aa;
  --color-green-light: #7AD0AC;
  --color-blue-light: #8395CD;
  --color-orange-light: #F39C12;
}
```

### 3D Models
Replace the models in `public/models/` with your own 3D assets. Make sure to update the asset paths in `Experience/Utils/assets.js`.

## 🔧 Performance Optimizations

- Efficient 3D model loading with Draco compression
- Lazy loading of resources
- Optimized texture sizes
- Smooth frame rate with requestAnimationFrame
- Minimized bundle size with tree shaking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

Feel free to contribute to this project! Please read the contributing guidelines before submitting pull requests.

## 📞 Contact

- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- **Portfolio**: [Your Portfolio Website](https://yourportfolio.com)

## 🙏 Acknowledgments

- Inspired by modern web development trends
- Three.js community for excellent documentation
- GSAP for smooth animations
- The open-source community for amazing tools

---

⭐ **If you found this project helpful, please consider giving it a star!** ⭐
