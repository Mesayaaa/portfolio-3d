# Mesaya Portfolio - Front-End Developer

🚀 **Live Demo**: [View Portfolio](http://localhost:3000)

Welcome to my interactive 3D portfolio website! This project showcases my skills as a front-end developer specializing in React, Vue.js, and modern web technologies with an immersive 3D experience.

## ✨ Features

- **🎮 Interactive 3D Environment** - Built with Three.js and WebGL for immersive experience
- **🎨 Smooth Animations** - Powered by GSAP for fluid transitions and micro-interactions
- **📱 Responsive Design** - Optimized for all devices and screen sizes
- **🌙 Dark/Light Theme** - Toggle between themes with smooth transitions
- **🎯 Smooth Scrolling** - Enhanced user experience with ASScroll
- **🧭 Navigation System** - Intuitive navigation with keyboard and mouse wheel support
- **⚡ Performance Optimized** - Fast loading and smooth interactions
- **🎪 Particle Effects** - Dynamic particle system that responds to user interaction
- **🌊 Glassmorphism UI** - Modern frosted glass effects throughout the interface
- **🎪 Interactive Elements** - Hover effects, animations, and micro-interactions
- **📊 Statistics Counter** - Animated counters showing project statistics
- **🎯 Scroll Progress** - Visual progress indicator with smooth animations

## 🛠️ Technologies Used

### Frontend Frameworks & Libraries
- **React.js** - Component-based architecture
- **Vue.js** - Progressive framework for building UIs
- **Three.js** - 3D graphics library
- **GSAP** - Professional animation library
- **Vite** - Fast build tool and development server

### Languages & Core Technologies
- **JavaScript (ES6+)** - Modern JavaScript features
- **TypeScript** - Type-safe development
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **SCSS/Sass** - CSS preprocessor

### 3D & Animation
- **Three.js** - 3D rendering engine
- **WebGL** - Hardware-accelerated graphics
- **GSAP** - Advanced animations and transitions
- **Custom Shaders** - Custom visual effects

### Tools & Workflow
- **Git & GitHub** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite** - Build tool and dev server

## 📁 Project Structure

```
├── Experience/
│   ├── World/
│   │   ├── Controls.js      # Scroll animations and 3D interactions
│   │   ├── Environment.js   # Lighting and scene setup
│   │   ├── Floor.js         # Floor and circle elements
│   │   ├── Room.js          # Main 3D room model
│   │   └── World.js         # World management
│   ├── Utils/
│   │   ├── Resources.js     # Asset loading and management
│   │   ├── Sizes.js         # Responsive handling
│   │   └── Time.js          # Animation timing
│   ├── Camera.js            # Camera controls and setup
│   ├── Experience.js        # Main experience class
│   ├── Navigation.js        # Enhanced navigation system
│   ├── ParticleEffect.js    # Particle system implementation
│   ├── Preloader.js         # Loading animations
│   ├── Renderer.js          # WebGL renderer setup
│   ├── TextAnimations.js    # Text animation effects
│   └── Theme.js             # Theme switching
├── public/
│   ├── models/              # 3D models (.glb files)
│   └── textures/            # Textures and videos
├── index.html               # Main HTML file
├── main.js                  # Entry point
├── style.css               # Enhanced styling with glassmorphism
└── package.json
```

## 🎯 Sections

### 1. **Hero Section**
- Animated title with typing effect
- Technology badges with floating animations
- Location indicator
- 3D room introduction

### 2. **About Me**
- Personal introduction
- Statistics counter with animations
- Skills overview with interactive cards
- Professional approach

### 3. **My Work**
- Project showcase with glassmorphism cards
- Technology tags
- Feature highlights
- Interactive hover effects

### 4. **Skills & Technologies**
- Categorized skill tags
- Interactive skill badges
- Comprehensive technology stack
- Animated skill reveals

### 5. **Contact**
- Multiple contact methods
- Interactive contact cards
- Social media links
- Animated icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mesaya-portfolio.git
cd mesaya-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop** (1920px and above)
- **Laptop** (1024px - 1919px)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🎨 Customization

### Colors
Update the CSS custom properties in `style.css`:
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
Replace the models in `public/models/` with your own .glb files and update the references in `Experience/Utils/assets.js`.

### Content
Update the content in `index.html` to reflect your personal information, projects, and skills.

## 🔧 Performance Optimizations

- **Asset Loading** - Efficient 3D model loading with DRACO compression
- **Smooth Scrolling** - Optimized scroll performance with ASScroll
- **Responsive Images** - Adaptive image loading based on device capabilities
- **Code Splitting** - Modular JavaScript architecture
- **CSS Optimizations** - Efficient animations and transitions
- **Particle System** - Optimized particle rendering with canvas

## 🎪 Interactive Features

- **Mouse Tracking** - Particles follow mouse movement
- **Keyboard Navigation** - Arrow keys and Page Up/Down for section navigation
- **Smooth Scrolling** - Enhanced scrolling experience
- **Hover Effects** - Interactive elements with feedback
- **Theme Switching** - Smooth transition between light and dark themes
- **Progress Indicators** - Visual feedback for scroll progress

## 🐛 Known Issues

- Some 3D effects may not work on older mobile devices
- Particle effects are reduced on low-performance devices
- Safari may require user interaction for certain animations

## 🔄 Version History

- **v1.0.0** - Initial release with basic 3D portfolio
- **v1.1.0** - Added particle effects and glassmorphism
- **v1.2.0** - Enhanced animations and interactive elements
- **v1.3.0** - Improved responsive design and performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Mesaya** - Front-End Developer
- 📧 Email: your.email@example.com
- 🌐 LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐱 GitHub: [github.com/yourusername](https://github.com/yourusername)
- 💬 Discord: YourUsername#1234

## 🙏 Acknowledgments

- **Three.js** community for excellent 3D web development tools
- **GSAP** for powerful animation capabilities
- **Vite** for fast development experience
- **MDN Web Docs** for comprehensive web development resources
- **Design inspiration** from modern portfolio websites

---

⭐ Don't forget to give this project a star if you found it helpful!
