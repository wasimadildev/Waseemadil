// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const scrollToTopBtn = document.getElementById('scrollToTop');
const preloader = document.querySelector('.preloader');
const chatWidgetBtn = document.querySelector('.chat-widget-button');
const projectCards = document.querySelectorAll('.project-card');
const resourceCards = document.querySelectorAll('.resource-card');

// On DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and effects
    initPreloader();
    initScrollEffects();
    initHeroAnimations();
    initProjectCards();
    initResourceCards();
});

// Preloader
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.add('loaded');
        }, 500);
    });
}

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll Effects
function initScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top button click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Hero Animations
function initHeroAnimations() {
    const heroShapes = document.querySelectorAll('.hero-shapes .shape');
    
    // Animate hero shapes
    heroShapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.2}s`;
        shape.style.animation = 'floatAnimation 6s infinite ease-in-out';
    });
    
    // Animate headline gradient
    const gradientText = document.querySelector('.gradient-text');
    if (gradientText) {
        gradientText.style.backgroundSize = '200% auto';
        gradientText.style.animation = 'gradientMove 5s infinite linear';
    }
}

// Project Cards Animation
function initProjectCards() {
    // Use Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each project card
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.project-image').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-image').style.transform = 'scale(1)';
        });
    });
}

// Resource Cards Animation
function initResourceCards() {
    // Use Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each resource card
    resourceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Icon pulse animation
    resourceCards.forEach(card => {
        const icon = card.querySelector('.resource-icon');
        icon.style.animation = 'pulse 2s infinite ease-in-out';
    });
}

// Chat Widget Toggle
if (chatWidgetBtn) {
    chatWidgetBtn.addEventListener('click', () => {
        // Here you would show/hide your chat interface
        alert('Chat functionality coming soon!');
    });
}

// Add CSS animation keyframes for gradient animation
if (!document.getElementById('animationStyles')) {
    const styleTag = document.createElement('style');
    styleTag.id = 'animationStyles';
    styleTag.textContent = `
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(styleTag);
}

// Handle project card animations
document.addEventListener('scroll', () => {
    projectCards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
        }
    });
    
    resourceCards.forEach(card => {
        if (isElementInViewport(card) && !card.classList.contains('animated')) {
            card.classList.add('animated');
        }
    });
});

// Helper: Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// CSS class for animated elements
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .project-card.animated,
        .resource-card.animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .project-image {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}); 