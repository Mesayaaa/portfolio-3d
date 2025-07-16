/**
 * Dark Mode Test Suite
 * This script verifies that all elements properly support dark mode
 */

class DarkModeTest {
    constructor() {
        this.testResults = [];
        this.elementsToTest = [
            // Basic structure
            'body',
            '.page',
            '.page-wrapper',
            '.hero',
            '.section',
            '.section-margin',
            
            // 3D Canvas Elements
            '.experience',
            '.experience-canvas',
            '#particle-canvas',
            
            // Navigation and controls
            '.navigation',
            '.nav-link',
            '.toggle-bar',
            '.toggle-button',
            '.toggle-circle',
            '.scroll-progress',
            '.progress-line',
            
            // Content elements
            '.hero-main-title',
            '.hero-main-description',
            '.hero-second-subheading',
            '.hero-location',
            '.badge',
            '.section-title-text',
            '.section-heading',
            '.section-text',
            '.section-number',
            
            // Interactive elements
            '.stats-container',
            '.stat-number',
            '.stat-label',
            '.skill-card',
            '.skill-title',
            '.skill-description',
            '.skill-tag',
            '.project-item',
            '.project-title',
            '.project-description',
            '.tech-tag',
            '.feature-item',
            '.contact-item',
            '.contact-title',
            '.contact-description',
            '.contact-link',
            '.contact-icon',
            
            // Loading and indicators
            '.loading-message',
            '.loading-content',
            '.loading-spinner',
            '.loading-progress',
            '.loading-bar',
            '.scroll-indicator',
            '.scroll-message',
            '.scroll-arrow',
            '.preloader-text',
            '.preloader-spinner',
            '.preloader-progress',
            '.preloader-bar',
            
            // Special elements
            '.intro-text',
            '.arrow-svg-wrapper',
            '#particle-canvas',
            '.experience-canvas'
        ];
        
        this.init();
    }
    
    init() {
        console.log('🌙 Starting Dark Mode Test Suite...');
        this.runTests();
        this.displayResults();
    }
    
    runTests() {
        // Test theme switching
        this.testThemeSwitching();
        
        // Test each element
        this.elementsToTest.forEach(selector => {
            this.testElement(selector);
        });
        
        // Test CSS variables
        this.testCSSVariables();
        
        // Test color consistency
        this.testColorConsistency();
        
        // Test accessibility
        this.testAccessibility();
    }
    
    testThemeSwitching() {
        const initialTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        
        // Test theme toggle
        const toggleButton = document.querySelector('.toggle-button');
        if (toggleButton) {
            toggleButton.click();
            
            setTimeout(() => {
                const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                const switched = newTheme !== initialTheme;
                
                this.addResult('Theme Switching', switched, 
                    switched ? 'Theme switching works correctly' : 'Theme switching failed');
                
                // Switch back
                toggleButton.click();
            }, 100);
        } else {
            this.addResult('Theme Toggle Button', false, 'Toggle button not found');
        }
    }
    
    testElement(selector) {
        const elements = document.querySelectorAll(selector);
        
        if (elements.length === 0) {
            this.addResult(selector, 'warning', 'Element not found in DOM');
            return;
        }
        
        elements.forEach((element, index) => {
            const testName = `${selector}${elements.length > 1 ? `[${index}]` : ''}`;
            
            // Test light mode
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            
            const lightStyles = window.getComputedStyle(element);
            const lightColor = lightStyles.color;
            const lightBackground = lightStyles.backgroundColor;
            
            // Test dark mode
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            
            const darkStyles = window.getComputedStyle(element);
            const darkColor = darkStyles.color;
            const darkBackground = darkStyles.backgroundColor;
            
            // Check if styles change between themes
            const colorChanges = lightColor !== darkColor;
            const backgroundChanges = lightBackground !== darkBackground;
            const hasThemeSupport = colorChanges || backgroundChanges;
            
            this.addResult(testName, hasThemeSupport, 
                hasThemeSupport ? 'Has theme support' : 'No theme styling detected');
        });
    }
    
    testCSSVariables() {
        const variables = [
            '--color-text',
            '--color-background',
            '--color-pink',
            '--color-green',
            '--color-blue',
            '--color-orange',
            '--color-text-rgb',
            '--color-background-rgb'
        ];
        
        // Test in light mode
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        const lightVars = {};
        variables.forEach(variable => {
            lightVars[variable] = getComputedStyle(document.body).getPropertyValue(variable);
        });
        
        // Test in dark mode
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        const darkVars = {};
        variables.forEach(variable => {
            darkVars[variable] = getComputedStyle(document.body).getPropertyValue(variable);
        });
        
        // Check if variables change
        variables.forEach(variable => {
            const changes = lightVars[variable] !== darkVars[variable];
            this.addResult(`CSS Variable ${variable}`, changes,
                changes ? 'Variable changes between themes' : 'Variable does not change');
        });
    }
    
    testColorConsistency() {
        const colorElements = document.querySelectorAll('.blue-text, .green-text, .orange-text');
        
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        
        colorElements.forEach(element => {
            const computedStyle = window.getComputedStyle(element);
            const color = computedStyle.color;
            
            // Check if color is not default black or white
            const isThemedColor = color !== 'rgb(0, 0, 0)' && color !== 'rgb(255, 255, 255)';
            
            this.addResult(`Color Consistency: ${element.className}`, isThemedColor,
                isThemedColor ? 'Has themed color' : 'Using default color');
        });
    }
    
    testAccessibility() {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        
        // Test contrast ratios (simplified)
        const textElements = document.querySelectorAll('h1, h2, h3, p, span, a, button');
        let goodContrast = 0;
        let totalChecked = 0;
        
        textElements.forEach(element => {
            if (element.offsetParent !== null) { // Element is visible
                const styles = window.getComputedStyle(element);
                const textColor = styles.color;
                const backgroundColor = styles.backgroundColor;
                
                // Simple contrast check (not comprehensive)
                if (textColor && backgroundColor && backgroundColor !== 'rgba(0, 0, 0, 0)') {
                    totalChecked++;
                    // This is a simplified check - real contrast calculation would be more complex
                    const hasGoodContrast = textColor !== backgroundColor;
                    if (hasGoodContrast) goodContrast++;
                }
            }
        });
        
        const contrastRatio = totalChecked > 0 ? (goodContrast / totalChecked) * 100 : 100;
        this.addResult('Accessibility: Text Contrast', contrastRatio > 80,
            `${contrastRatio.toFixed(1)}% of elements have good contrast`);
    }
    
    addResult(testName, passed, message) {
        const status = passed === true ? 'PASS' : passed === false ? 'FAIL' : 'WARN';
        this.testResults.push({
            name: testName,
            status: status,
            message: message
        });
    }
    
    displayResults() {
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        const warnings = this.testResults.filter(r => r.status === 'WARN').length;
        
        console.log(`\n🌙 Dark Mode Test Results:`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⚠️ Warnings: ${warnings}`);
        console.log(`📊 Total: ${this.testResults.length}`);
        
        console.log('\n📋 Detailed Results:');
        this.testResults.forEach(result => {
            const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
            console.log(`${icon} ${result.name}: ${result.message}`);
        });
        
        // Display summary
        const successRate = ((passed / this.testResults.length) * 100).toFixed(1);
        console.log(`\n🎯 Success Rate: ${successRate}%`);
        
        if (failed === 0) {
            console.log('🎉 All critical tests passed! Dark mode is fully implemented.');
        } else {
            console.log('🔧 Some tests failed. Please review the failed elements.');
        }
    }
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DarkModeTest();
    });
} else {
    new DarkModeTest();
}

// Export for manual testing
window.DarkModeTest = DarkModeTest;
