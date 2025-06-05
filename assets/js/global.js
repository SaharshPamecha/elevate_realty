/**
 * Elevate Realty - Global JavaScript
 * Shared functionality across all pages
 */

// Global state management
window.ElevateRealty = {
    isInitialized: false,
    currentUser: null,
    favorites: [],
    
    // Initialize the application
    init: function() {
        if (this.isInitialized) return;
        
        this.initMobileMenu();
        this.initMobileNavigation();
        this.initAuthSystem();
        this.initInquiryModal();
        this.initFavoriteSystem();
        this.initErrorHandling();
        this.lazyLoading.init(); // Initialize lazy loading
        
        this.isInitialized = true;
        console.log('Elevate Realty initialized successfully');
    },

    // Mobile Menu Management
    initMobileMenu: function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                
                // Update aria attributes for accessibility
                const isExpanded = !mobileMenu.classList.contains('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    },

    // Mobile Navigation System
    initMobileNavigation: function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    // Show menu
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('animate-slideDown');
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    `;
                } else {
                    // Hide menu
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('animate-slideDown');
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    `;
                }
            });

            // Close mobile menu when clicking on links
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('animate-slideDown');
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    `;
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('animate-slideDown');
                    mobileMenuBtn.innerHTML = `
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    `;
                }
            });
        }
    },

    // Authentication System
    initAuthSystem: function() {
        this.updateAuthLinks();
        
        // Listen for storage changes (for multi-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === 'isUserLoggedIn' || e.key === 'loggedInUserEmail') {
                this.updateAuthLinks();
                this.updateFavoriteButtonStates();
            }
        });
    },

    handleLogout: function() {
        // Clear all user data
        localStorage.removeItem('isUserLoggedIn');
        localStorage.removeItem('loggedInUserEmail');
        localStorage.removeItem('loggedInUserName');
        
        // Clear favorites cache
        this.favorites = [];
        
        // Show success message
        this.showNotification('You have been logged out successfully.', 'success');
        
        // Update UI
        this.updateAuthLinks();
        this.updateFavoriteButtonStates();
        
        // Redirect if on protected page
        if (window.location.pathname.includes('user_profile.html')) {
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        }
    },

    updateAuthLinks: function() {
        const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        const userAuthDesktopLinks = document.getElementById('userAuthDesktopLinks');
        const userAuthMobileLinks = document.getElementById('userAuthMobileLinks');
        const currentPage = window.location.pathname;

        let desktopLinksHTML = '';
        let mobileLinksHTML = '';

        if (isLoggedIn) {
            const userName = localStorage.getItem('loggedInUserName') || 'User';
            const profileActiveClass = currentPage.includes('user_profile.html') 
                ? 'text-primary font-medium border-b-2 border-primary pb-1' 
                : 'text-text-secondary hover:text-primary transition-smooth';
            
            desktopLinksHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-sm text-text-secondary">Welcome, ${userName}</span>
                    <a href="user_profile.html" class="text-sm ${profileActiveClass}">My Profile</a>
                    <button id="logoutBtnDesktop" class="btn-secondary-outline text-sm px-3 py-1.5">Logout</button>
                </div>
            `;
            mobileLinksHTML = `
                <div class="px-3 py-2 border-b border-primary-200">
                    <span class="text-sm text-text-secondary">Welcome, ${userName}</span>
                </div>
                <a href="user_profile.html" class="block px-3 py-2 ${profileActiveClass.replace('pb-1', '')}">My Profile</a>
                <button id="logoutBtnMobile" class="btn-secondary-outline text-sm px-4 py-2 w-full text-left mt-2">Logout</button>
            `;
        } else {
            const loginActiveClass = currentPage.includes('login.html') 
                ? 'text-primary font-medium border-b-2 border-primary pb-1' 
                : 'text-text-secondary hover:text-primary transition-smooth';
            
            desktopLinksHTML = `
                <a href="login.html" class="text-sm ${loginActiveClass}">Login</a>
                <a href="signup.html" class="btn-primary text-sm px-4 py-2">Sign Up</a>
            `;
            mobileLinksHTML = `
                <a href="login.html" class="block px-3 py-2 ${loginActiveClass.replace('pb-1', '')}">Login</a>
                <a href="signup.html" class="block px-3 py-2 mt-1 btn-primary text-center">Sign Up</a>
            `;
        }

        if (userAuthDesktopLinks) userAuthDesktopLinks.innerHTML = desktopLinksHTML;
        if (userAuthMobileLinks) userAuthMobileLinks.innerHTML = mobileLinksHTML;

        // Attach logout event listeners
        if (isLoggedIn) {
            const logoutBtnDesktop = document.getElementById('logoutBtnDesktop');
            const logoutBtnMobile = document.getElementById('logoutBtnMobile');
            
            if (logoutBtnDesktop) {
                logoutBtnDesktop.addEventListener('click', () => this.handleLogout());
            }
            if (logoutBtnMobile) {
                logoutBtnMobile.addEventListener('click', () => this.handleLogout());
            }
        }
    },

    // Generic Inquiry Modal System
    initInquiryModal: function() {
        const modal = document.getElementById('genericInquiryModal');
        const modalContent = document.getElementById('genericInquiryModalContent');
        const serviceNameInput = document.getElementById('inquiryServiceName');
        const closeBtn = document.getElementById('closeGenericInquiryModalBtn');
        const form = document.getElementById('genericInquiryForm');
        const openButtons = document.querySelectorAll('.open-inquiry-modal-btn');

        if (!modal) return;

        // Open modal function
        const openModal = (serviceType) => {
            if (serviceNameInput) serviceNameInput.value = serviceType;
            
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            
            setTimeout(() => {
                modal.classList.remove('opacity-0');
                if (modalContent) {
                    modalContent.classList.remove('scale-95', 'opacity-0');
                    modalContent.classList.add('scale-100', 'opacity-100');
                }
            }, 10);
        };

        // Close modal function
        const closeModal = () => {
            if (modalContent) {
                modalContent.classList.remove('scale-100', 'opacity-100');
                modalContent.classList.add('scale-95', 'opacity-0');
            }
            modal.classList.add('opacity-0');
            
            setTimeout(() => {
                modal.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scroll
            }, 300);
        };

        // Event listeners
        openButtons.forEach(button => {
            button.addEventListener('click', () => {
                const serviceType = button.dataset.serviceType || 'General Inquiry';
                openModal(serviceType);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });

        // Enhanced inquiry form validation
        const inquiryValidationConfig = {
            inquiryUserName: ['required', 'minLength:2', 'maxLength:100'],
            inquiryUserEmail: ['required', 'email'],
            inquiryUserPhone: ['phone'],
            inquiryUserMessage: ['required', 'minLength:10', 'maxLength:1000']
        };

        // Setup real-time validation for inquiry form
        this.formValidation.setupRealTimeValidation(form, inquiryValidationConfig);

        // Handle inquiry form submission with validation
        this.formValidation.handleFormSubmission(
            form,
            async (formData) => {
                const inquiryData = {
                    serviceRequested: formData.get('inquiryServiceName'),
                    name: formData.get('inquiryUserName'),
                    email: formData.get('inquiryUserEmail'),
                    phone: formData.get('inquiryUserPhone'),
                    message: formData.get('inquiryUserMessage'),
                    timestamp: new Date().toISOString()
                };
                
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                console.log('Enhanced Inquiry Submitted:', inquiryData);
                
                this.showNotification('Your inquiry has been submitted successfully! We\'ll contact you within 24 hours.', 'success');
                form.reset();
                closeModal();
            },
            inquiryValidationConfig
        );
    },

    // Favorite Properties System
    initFavoriteSystem: function() {
        this.updateFavoriteButtonStates();
        this.attachFavoriteListeners();
    },

    getFavorites: function() {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (!userEmail) return [];
        
        const favoritesKey = `favorites_${userEmail}`;
        const favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
        this.favorites = favorites; // Cache for performance
        return favorites;
    },

    saveFavorites: function(favorites) {
        const userEmail = localStorage.getItem('loggedInUserEmail');
        if (!userEmail) return false;
        
        const favoritesKey = `favorites_${userEmail}`;
        localStorage.setItem(favoritesKey, JSON.stringify(favorites));
        this.favorites = favorites; // Update cache
        return true;
    },

    toggleFavorite: function(propertyId, buttonElement) {
        const isLoggedIn = localStorage.getItem('isUserLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            this.showNotification('Please log in to save favorites.', 'warning');
            return false;
        }

        let favorites = this.getFavorites();
        const isCurrentlyFavorited = favorites.includes(propertyId);
        
        if (isCurrentlyFavorited) {
            favorites = favorites.filter(id => id !== propertyId);
            this.showNotification('Property removed from favorites.', 'info');
        } else {
            favorites.push(propertyId);
            this.showNotification('Property added to favorites!', 'success');
        }
        
        this.saveFavorites(favorites);
        this.updateFavoriteButtonState(buttonElement, !isCurrentlyFavorited);
        
        return true;
    },

    updateFavoriteButtonState: function(button, isFavorited) {
        const heartIcon = button.querySelector('.property-favorite-icon');
        const buttonText = button.querySelector('.button-text');
        
        if (isFavorited) {
            // Favorited state
            if (heartIcon) {
                heartIcon.classList.remove('text-gray-400');
                heartIcon.classList.add('text-red-500');
                heartIcon.style.fill = 'currentColor';
            }
            if (buttonText) buttonText.textContent = 'Saved to Favorites';
            button.title = 'Remove from Favorites';
            button.classList.add('favorited');
        } else {
            // Unfavorited state
            if (heartIcon) {
                heartIcon.classList.remove('text-red-500');
                heartIcon.classList.add('text-gray-400');
                heartIcon.style.fill = 'none';
            }
            if (buttonText) buttonText.textContent = 'Save to Favorites';
            button.title = 'Add to Favorites';
            button.classList.remove('favorited');
        }
    },

    updateFavoriteButtonStates: function() {
        const favorites = this.getFavorites();
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(button => {
            const propertyId = button.dataset.propertyId;
            const isFavorited = favorites.includes(propertyId);
            this.updateFavoriteButtonState(button, isFavorited);
        });
    },

    attachFavoriteListeners: function() {
        const favoriteButtons = document.querySelectorAll('.favorite-btn');
        
        favoriteButtons.forEach(button => {
            // Remove existing listeners to prevent duplicates
            button.removeEventListener('click', this.handleFavoriteClick);
            button.addEventListener('click', this.handleFavoriteClick.bind(this));
        });
    },

    handleFavoriteClick: function(e) {
        e.stopPropagation();
        const button = e.currentTarget;
        const propertyId = button.dataset.propertyId;
        
        if (propertyId) {
            this.toggleFavorite(propertyId, button);
        }
    },

    // Notification System
    showNotification: function(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-[100] p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full opacity-0`;
        
        // Set type-specific styles
        const typeStyles = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-black',
            info: 'bg-blue-500 text-white'
        };
        
        notification.className += ` ${typeStyles[type] || typeStyles.info}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full', 'opacity-0');
        }, 10);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    },

    // Error Handling
    initErrorHandling: function() {
        // Global error handler
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.showNotification('An unexpected error occurred. Please refresh the page.', 'error');
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showNotification('A network error occurred. Please check your connection.', 'error');
        });
    },

    // Utility Functions
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Enhanced Form Validation System
    formValidation: {
        // Validation rules
        rules: {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            phone: (value) => /^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, '')),
            minLength: (value, min) => value.length >= min,
            maxLength: (value, max) => value.length <= max,
            numeric: (value) => /^\d+$/.test(value),
            alphanumeric: (value) => /^[a-zA-Z0-9]+$/.test(value),
            url: (value) => /^https?:\/\/.+\..+/.test(value),
            strongPassword: (value) => {
                // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            }
        },

        // Error messages
        messages: {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number',
            minLength: 'Must be at least {min} characters long',
            maxLength: 'Must be no more than {max} characters long',
            numeric: 'Please enter numbers only',
            alphanumeric: 'Please enter letters and numbers only',
            url: 'Please enter a valid URL',
            strongPassword: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
        },

        // Validate single field
        validateField: function(field, rules) {
            const value = field.value.trim();
            const errors = [];

            for (const rule of rules) {
                const [ruleName, ...params] = rule.split(':');
                
                if (ruleName === 'required' && !this.rules.required(value)) {
                    errors.push(this.messages.required);
                } else if (value && this.rules[ruleName]) {
                    if (params.length > 0) {
                        const param = parseInt(params[0]);
                        if (!this.rules[ruleName](value, param)) {
                            errors.push(this.messages[ruleName].replace(`{${ruleName.replace(/[A-Z]/g, m => m.toLowerCase())}}`, param));
                        }
                    } else if (!this.rules[ruleName](value)) {
                        errors.push(this.messages[ruleName]);
                    }
                }
            }

            return errors;
        },

        // Show field error
        showFieldError: function(field, errors) {
            this.clearFieldError(field);
            
            if (errors.length > 0) {
                field.classList.add('border-red-500', 'bg-red-50');
                field.classList.remove('border-gray-300');
                
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error text-red-500 text-sm mt-1';
                errorDiv.textContent = errors[0];
                
                field.parentNode.appendChild(errorDiv);
                return false;
            }
            
            field.classList.add('border-green-500', 'bg-green-50');
            field.classList.remove('border-gray-300', 'border-red-500');
            return true;
        },

        // Clear field error
        clearFieldError: function(field) {
            field.classList.remove('border-red-500', 'bg-red-50', 'border-green-500', 'bg-green-50');
            field.classList.add('border-gray-300');
            
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        },

        // Validate entire form
        validateForm: function(form, validationConfig) {
            let isValid = true;
            const errors = {};

            for (const [fieldName, rules] of Object.entries(validationConfig)) {
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    const fieldErrors = this.validateField(field, rules);
                    const fieldValid = this.showFieldError(field, fieldErrors);
                    
                    if (!fieldValid) {
                        isValid = false;
                        errors[fieldName] = fieldErrors;
                    }
                }
            }

            return { isValid, errors };
        },

        // Setup real-time validation
        setupRealTimeValidation: function(form, validationConfig) {
            for (const [fieldName, rules] of Object.entries(validationConfig)) {
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    // Validate on blur
                    field.addEventListener('blur', () => {
                        const errors = this.validateField(field, rules);
                        this.showFieldError(field, errors);
                    });

                    // Clear errors on focus
                    field.addEventListener('focus', () => {
                        this.clearFieldError(field);
                    });

                    // Real-time validation for certain fields
                    if (rules.includes('email') || rules.includes('phone')) {
                        field.addEventListener('input', window.ElevateRealty.debounce(() => {
                            if (field.value.trim()) {
                                const errors = this.validateField(field, rules);
                                this.showFieldError(field, errors);
                            }
                        }, 500));
                    }
                }
            }
        },

        // Enhanced form submission with loading states
        handleFormSubmission: function(form, submitCallback, validationConfig = {}) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : '';

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Show loading state
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `
                        <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    `;
                }

                try {
                    // Validate form if config provided
                    if (Object.keys(validationConfig).length > 0) {
                        const validation = this.validateForm(form, validationConfig);
                        if (!validation.isValid) {
                            throw new Error('Please correct the errors above');
                        }
                    }

                    // Call the submit callback
                    await submitCallback(new FormData(form));
                    
                } catch (error) {
                    window.ElevateRealty.showNotification(error.message, 'error');
                } finally {
                    // Reset button state
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    }
                }
            });
        }
    },
    
    // Lazy Loading System for Images
    lazyLoading: {
        observer: null,
        
        init: function() {
            // Check if Intersection Observer is supported
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                }, {
                    rootMargin: '50px 0px', // Start loading 50px before image comes into view
                    threshold: 0.01
                });

                // Find all lazy images and observe them
                this.setupLazyImages();
            } else {
                // Fallback for browsers without Intersection Observer
                this.loadAllImages();
            }
        },

        setupLazyImages: function() {
            const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
            
            lazyImages.forEach(img => {
                // Add lazy loading attributes if not present
                if (!img.hasAttribute('data-src') && img.src) {
                    img.setAttribute('data-src', img.src);
                    img.src = this.createPlaceholder(img.width || 400, img.height || 300);
                }
                
                // Add loading class
                img.classList.add('lazy-loading');
                
                // Observe the image
                this.observer.observe(img);
            });
        },

        loadImage: function(img) {
            const src = img.getAttribute('data-src');
            if (!src) return;

            // Create a new image to preload
            const imageLoader = new Image();
            
            imageLoader.onload = () => {
                // Image loaded successfully
                img.src = src;
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-loaded');
                
                // Add fade-in animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                // Trigger fade-in
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 10);
                
                // Remove data-src attribute
                img.removeAttribute('data-src');
            };
            
            imageLoader.onerror = () => {
                // Handle error - show placeholder or error image
                img.src = this.createErrorPlaceholder(img.width || 400, img.height || 300);
                img.classList.remove('lazy-loading');
                img.classList.add('lazy-error');
            };
            
            // Start loading
            imageLoader.src = src;
        },

        createPlaceholder: function(width, height) {
            // Create a simple SVG placeholder
            const svg = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f3f4f6"/>
                    <rect x="20%" y="40%" width="60%" height="20%" fill="#e5e7eb" rx="4"/>
                    <circle cx="30%" cy="25%" r="8%" fill="#e5e7eb"/>
                    <text x="50%" y="70%" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">Loading...</text>
                </svg>
            `;
            return `data:image/svg+xml;base64,${btoa(svg)}`;
        },

        createErrorPlaceholder: function(width, height) {
            const svg = `
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#fef2f2"/>
                    <rect x="20%" y="40%" width="60%" height="20%" fill="#fecaca" rx="4"/>
                    <circle cx="30%" cy="25%" r="8%" fill="#fecaca"/>
                    <text x="50%" y="70%" text-anchor="middle" fill="#ef4444" font-family="Arial, sans-serif" font-size="12">Image not available</text>
                </svg>
            `;
            return `data:image/svg+xml;base64,${btoa(svg)}`;
        },

        loadAllImages: function() {
            // Fallback: load all images immediately
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
            });
        },

        // Method to manually trigger lazy loading for dynamically added images
        observeNewImages: function(container) {
            if (!this.observer) return;
            
            const newImages = container.querySelectorAll('img[data-src]');
            newImages.forEach(img => {
                img.classList.add('lazy-loading');
                this.observer.observe(img);
            });
        }
    },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.ElevateRealty.init();
});

// Make key functions globally accessible for backward compatibility
window.handleLogout = () => window.ElevateRealty.handleLogout();
window.getFavorites = () => window.ElevateRealty.getFavorites();
window.saveFavorites = (favorites) => window.ElevateRealty.saveFavorites(favorites);
