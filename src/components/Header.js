/**
 * Header component for the application
 */
class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          background-color: white;
          box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a237e;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-link {
          color: #37474f;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #1a237e;
        }
        .mobile-menu-button {
          display: none;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-menu-button {
            display: block;
          }
        }
      </style>
      <header>
        <div class="container">
          <a href="/" class="logo">Elevate Realty</a>
          
          <nav class="nav-links">
            <a href="/properties" class="nav-link">Properties</a>
            <a href="/market" class="nav-link">Market</a>
            <a href="/agents" class="nav-link">Agents</a>
            <a href="/about" class="nav-link">About</a>
            <a href="/contact" class="nav-link">Contact</a>
          </nav>
          
          <button id="mobile-menu-button" class="mobile-menu-button">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </header>
    `;
  }
}

// Define the custom element
customElements.define('app-header', Header);

export default Header;
