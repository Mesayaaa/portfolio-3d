# 🚀 Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login to Netlify
netlify login

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

## Environment Setup

### Required Environment Variables
```env
# Optional: Analytics
VITE_GA_ID=your-google-analytics-id
VITE_HOTJAR_ID=your-hotjar-id

# Optional: Contact form
VITE_CONTACT_ENDPOINT=your-contact-form-endpoint
```

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Performance Optimization

### 1. Image Optimization
- Use WebP format for images
- Compress images before uploading
- Use appropriate image sizes

### 2. Code Splitting
- The build already includes automatic code splitting
- Vendor libraries are separated into chunks
- Assets are optimized and cached

### 3. Caching Strategy
- Static assets: 1 year cache
- HTML: No cache
- Service worker for offline capability

## SEO Optimization

### 1. Meta Tags
- All essential meta tags are included
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (JSON-LD)

### 2. Sitemap
- Located at `/public/sitemap.xml`
- Update URLs when deploying
- Submit to Google Search Console

### 3. Robots.txt
- Located at `/public/robots.txt`
- Allows search engine crawling
- Blocks unnecessary files

## Custom Domain Setup

### Vercel
1. Add domain in Vercel dashboard
2. Update DNS records
3. Enable automatic SSL

### Netlify
1. Add domain in Netlify dashboard
2. Update DNS records
3. Enable automatic SSL

## Analytics Integration

### Google Analytics
```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID');
</script>
```

### Hotjar
```javascript
// Add to index.html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

## Security Headers

The `vercel.json` file includes security headers:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: Restrictive permissions

## Monitoring

### 1. Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Check loading times regularly

### 2. Error Tracking
Consider integrating:
- Sentry for error tracking
- LogRocket for user session recording
- Hotjar for user behavior analytics

## Backup Strategy

### 1. Code Backup
- Push to GitHub regularly
- Use semantic versioning
- Create release tags

### 2. Asset Backup
- Keep original model files
- Backup texture files
- Store in cloud storage

## Post-Deployment Checklist

- [ ] Test all animations and interactions
- [ ] Verify 3D models load correctly
- [ ] Check mobile responsiveness
- [ ] Test contact form functionality
- [ ] Verify SEO meta tags
- [ ] Submit sitemap to search engines
- [ ] Set up analytics tracking
- [ ] Configure custom domain
- [ ] Enable SSL certificate
- [ ] Test page load speeds

## Troubleshooting

### Common Issues
1. **3D Models not loading**
   - Check file paths
   - Verify CORS settings
   - Ensure files are in public directory

2. **Animations not working**
   - Check GSAP library loading
   - Verify JavaScript execution order
   - Check browser console for errors

3. **Mobile performance issues**
   - Enable performance optimizations
   - Reduce particle count
   - Disable complex animations on mobile

### Performance Issues
1. **Slow loading**
   - Optimize model file sizes
   - Use texture compression
   - Enable asset caching

2. **High memory usage**
   - Implement proper disposal
   - Use LOD (Level of Detail) models
   - Optimize texture sizes

### Contact
For deployment issues, refer to the main README or create an issue in the repository.
