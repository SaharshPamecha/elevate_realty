// Import styles
import './styles/main.css';

// Import components
import './components/Header';

/**
 * Main application class
 */
class ElevateRealtyApp {
  constructor() {
    console.log('Elevate Realty application is starting...');
    this.initializeApp();
  }

  /**
   * Initialize the application
   */
  initializeApp() {
    // Wait for the DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM fully loaded and parsed');
      
      // Initialize components
      this.initializeMobileMenu();
      this.initializeSmoothScrolling();
      
      // Simulate loading content (remove in production)
      setTimeout(() => {
        this.hideLoader();
      }, 1500);
      
      // Add any other initialization code here
      this.initializeEventListeners();
    });
  }

  /**
   * Initialize mobile menu functionality
   */
  initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.querySelector('app-header');
    
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        const navLinks = mobileMenu.shadowRoot?.querySelector('.nav-links');
        if (navLinks) {
          navLinks.classList.toggle('hidden');
        }
      });
    }
  }

  /**
   * Initialize smooth scrolling for anchor links
   */
  initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href.startsWith('#')) {
          e.preventDefault();
          const targetId = href === '#' ? 'app' : href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  /**
   * Initialize global event listeners
   */
  initializeEventListeners() {
    // Add any global event listeners here
    console.log('Initializing event listeners...');
  }

  /**
   * Hide the loading screen and show the main content
   */
  hideLoader() {
    const loader = document.getElementById('loader');
    const app = document.getElementById('app');
    
    if (loader && app) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      app.style.opacity = '1';
      
      // Remove loader from DOM after transition
      setTimeout(() => {
        if (document.body.contains(loader)) {
          document.body.removeChild(loader);
        }
      }, 500);
    }
  }
}

// Initialize the application
const app = new ElevateRealtyApp();

// Export the app instance if needed in other modules
export default app;
