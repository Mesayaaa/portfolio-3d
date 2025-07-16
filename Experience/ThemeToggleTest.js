/**
 * Theme Toggle Test
 * Tests scroll position preservation during theme changes
 */
class ThemeToggleTest {
    constructor() {
        this.testResults = [];
        this.originalScrollY = 0;
        this.init();
    }

    init() {
        console.log('🎯 Starting Theme Toggle Test...');
        
        // Wait for page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.runTests();
            });
        } else {
            this.runTests();
        }
    }

    runTests() {
        // Test 1: Button click doesn't scroll to top
        this.testButtonClick();
        
        // Test 2: Theme change preserves scroll position
        this.testThemeChangeScrollPreservation();
        
        // Test 3: Keyboard shortcut preserves position
        this.testKeyboardShortcut();
        
        // Display results
        setTimeout(() => {
            this.displayResults();
        }, 1000);
    }

    testButtonClick() {
        const toggleButton = document.querySelector('.toggle-button');
        if (!toggleButton) {
            this.addResult('Button Click Test', 'FAIL', 'Toggle button not found');
            return;
        }

        // Scroll to middle of page
        window.scrollTo(0, 500);
        
        setTimeout(() => {
            const scrollBefore = window.pageYOffset;
            
            // Click the button
            toggleButton.click();
            
            setTimeout(() => {
                const scrollAfter = window.pageYOffset;
                const positionPreserved = Math.abs(scrollAfter - scrollBefore) < 10;
                
                this.addResult('Button Click Test', 
                    positionPreserved ? 'PASS' : 'FAIL',
                    `Scroll before: ${scrollBefore}, after: ${scrollAfter}`);
            }, 100);
        }, 100);
    }

    testThemeChangeScrollPreservation() {
        // Scroll to specific position
        window.scrollTo(0, 800);
        
        setTimeout(() => {
            const scrollBefore = window.pageYOffset;
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            
            // Toggle theme programmatically
            if (window.toggleTheme) {
                window.toggleTheme();
            }
            
            setTimeout(() => {
                const scrollAfter = window.pageYOffset;
                const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                const themeChanged = currentTheme !== newTheme;
                const positionPreserved = Math.abs(scrollAfter - scrollBefore) < 10;
                
                this.addResult('Theme Change Test', 
                    (themeChanged && positionPreserved) ? 'PASS' : 'FAIL',
                    `Theme changed: ${themeChanged}, Position preserved: ${positionPreserved}`);
            }, 200);
        }, 200);
    }

    testKeyboardShortcut() {
        // Scroll to specific position
        window.scrollTo(0, 1200);
        
        setTimeout(() => {
            const scrollBefore = window.pageYOffset;
            
            // Simulate keyboard shortcut
            const event = new KeyboardEvent('keydown', {
                key: 'T',
                ctrlKey: true,
                shiftKey: true,
                bubbles: true
            });
            
            document.dispatchEvent(event);
            
            setTimeout(() => {
                const scrollAfter = window.pageYOffset;
                const positionPreserved = Math.abs(scrollAfter - scrollBefore) < 10;
                
                this.addResult('Keyboard Shortcut Test', 
                    positionPreserved ? 'PASS' : 'FAIL',
                    `Scroll before: ${scrollBefore}, after: ${scrollAfter}`);
            }, 200);
        }, 300);
    }

    addResult(testName, status, message) {
        this.testResults.push({
            name: testName,
            status: status,
            message: message
        });
    }

    displayResults() {
        const passed = this.testResults.filter(r => r.status === 'PASS').length;
        const failed = this.testResults.filter(r => r.status === 'FAIL').length;
        
        console.log(`\n🎯 Theme Toggle Test Results:`);
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📊 Total: ${this.testResults.length}`);
        
        console.log('\n📋 Detailed Results:');
        this.testResults.forEach(result => {
            const icon = result.status === 'PASS' ? '✅' : '❌';
            console.log(`${icon} ${result.name}: ${result.message}`);
        });
        
        if (failed === 0) {
            console.log('🎉 All tests passed! Theme toggle preserves scroll position.');
        } else {
            console.log('🔧 Some tests failed. Scroll position may jump during theme toggle.');
        }
    }
}

// Auto-run tests when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ThemeToggleTest();
    });
} else {
    new ThemeToggleTest();
}

// Export for manual testing
window.ThemeToggleTest = ThemeToggleTest;
