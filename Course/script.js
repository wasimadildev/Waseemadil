document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.5s ease';
                
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (!navLinks.classList.contains('mobile-active')) {
                navLinks.classList.add('mobile-active');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            } else {
                navLinks.classList.remove('mobile-active');
                navLinks.style.display = '';
            }
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('mobile-active')) {
                    navLinks.classList.remove('mobile-active');
                    navLinks.style.display = '';
                    hamburger.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // FAQ Toggle Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    if (icon.classList.contains('fa-minus')) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = item.querySelector('.faq-toggle i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-minus');
            } else {
                icon.classList.remove('fa-minus');
                icon.classList.add('fa-plus');
            }
        });
    });
    
    // Back to Top Button Functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show button when user scrolls down 500px
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when button is clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Enhanced Curriculum Animation System
    const curriculumSection = document.querySelector('#curriculum');
    const curriculumPhases = document.querySelectorAll('.curriculum-phase');
    const pathLine = document.querySelector('.path-line');
    
    // Add progress tracker to the path line
    if (pathLine) {
        pathLine.innerHTML = '<div class="path-progress"></div>';
        const pathProgress = document.querySelector('.path-progress');
        pathProgress.style.position = 'absolute';
        pathProgress.style.width = '100%';
        pathProgress.style.background = 'linear-gradient(to bottom, #4f46e5, #10b981)';
        pathProgress.style.borderRadius = '2px';
        pathProgress.style.height = '0%';
        pathProgress.style.transition = 'height 1.5s ease-out';
        pathProgress.style.zIndex = '1';
    }
    
    // Add animation classes and interactive elements to phases
    curriculumPhases.forEach((phase, index) => {
        // Add staggered animation classes
        phase.classList.add('animate-phase');
        phase.style.opacity = '0';
        phase.style.transform = 'translateX(-50px)';
        phase.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        phase.style.transitionDelay = `${index * 0.15}s`;
        
        // Add hover effect class
        phase.classList.add('phase-hover-effect');
        
        // Add pulsing effect to phase badge
        const phaseBadge = phase.querySelector('.phase-badge');
        if (phaseBadge) {
            phaseBadge.style.animation = 'pulse 2s infinite';
            phaseBadge.style.animationDelay = `${index * 0.5}s`;
        }
        
        // Add interactive elements to topic list
        const topicItems = phase.querySelectorAll('.topic-list li');
        topicItems.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.4s ease';
            item.style.transitionDelay = `${i * 0.05}s`;
            
            // Add check mark animation
            const checkIcon = item.querySelector('i');
            if (checkIcon) {
                checkIcon.style.transform = 'scale(0)';
                checkIcon.style.transition = 'transform 0.3s ease';
            }
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
                this.style.transform = 'translateX(5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = 'translateX(0)';
            });
        });
    });
    
    // Enhanced animation for project highlights
    const projectHighlights = document.querySelectorAll('.project-highlight');
    projectHighlights.forEach(highlight => {
        highlight.style.opacity = '0';
        highlight.style.transform = 'translateY(20px)';
        highlight.style.transition = 'all 0.5s ease';
        
        // Add glowing border effect
        highlight.style.position = 'relative';
        highlight.style.overflow = 'hidden';
        
        // Add shine effect element
        const shine = document.createElement('div');
        shine.classList.add('highlight-shine');
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
        shine.style.transform = 'translateX(-100%)';
        highlight.appendChild(shine);
        
        // Add shine animation trigger on mouseover
        highlight.addEventListener('mouseenter', function() {
            const shine = this.querySelector('.highlight-shine');
            shine.style.animation = 'shine 1.5s ease-in-out';
        });
        
        highlight.addEventListener('mouseleave', function() {
            const shine = this.querySelector('.highlight-shine');
            shine.style.animation = '';
        });
    });
    
    // Enhanced scroll animation function for curriculum
    function animateCurriculumOnScroll() {
        if (!curriculumSection) return;
        
        const sectionTop = curriculumSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Check if curriculum section is in view
        if (sectionTop < windowHeight - 100) {
            // Animate the path progress based on scroll position
            const pathProgress = document.querySelector('.path-progress');
            if (pathProgress) {
                const scrollPercentage = Math.min(
                    100, 
                    Math.max(0, 
                        (windowHeight - sectionTop) / (curriculumSection.offsetHeight) * 150
                    )
                );
                pathProgress.style.height = `${scrollPercentage}%`;
            }
            
            // Animate each phase when it comes into view
            curriculumPhases.forEach((phase, index) => {
                const phaseTop = phase.getBoundingClientRect().top;
                
                if (phaseTop < windowHeight - 100) {
                    // Animate the phase
                    phase.style.opacity = '1';
                    phase.style.transform = 'translateX(0)';
                    
                    // Animate each topic in the phase
                    const topicItems = phase.querySelectorAll('.topic-list li');
                    topicItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                            
                            // Animate check mark
                            const checkIcon = item.querySelector('i');
                            if (checkIcon) {
                                checkIcon.style.transform = 'scale(1)';
                            }
                        }, i * 50);
                    });
                    
                    // Animate project highlights
                    const projectHighlight = phase.querySelector('.project-highlight');
                    if (projectHighlight) {
                        setTimeout(() => {
                            projectHighlight.style.opacity = '1';
                            projectHighlight.style.transform = 'translateY(0)';
                        }, 300);
                    }
                }
            });
        }
    }
    
    // 3D tilt effect for phase cards
    function addTiltEffect() {
        const phaseDetails = document.querySelectorAll('.phase-details');
        
        phaseDetails.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                // Calculate rotation based on mouse position
                const rotateY = (mouseX / (cardRect.width / 2)) * 5; // Max 5 degrees
                const rotateX = -(mouseY / (cardRect.height / 2)) * 5; // Max 5 degrees
                
                // Apply the transform
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s ease';
            });
        });
    }
    
    // Run animation on page load and scroll
    if (curriculumPhases.length > 0) {
        window.addEventListener('load', function() {
            animateCurriculumOnScroll();
            addTiltEffect();
        });
        window.addEventListener('scroll', animateCurriculumOnScroll);
    }
    
    // Add number counter animation for stat numbers
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const targetNumber = stat.textContent;
            const duration = 2000; // 2 seconds
            const stepTime = 50; // update every 50ms
            let currentNumber = 0;
            
            // Remove any non-numeric characters (except for +)
            const numericValue = targetNumber.replace(/[^\d+]/g, '');
            const hasPlus = targetNumber.includes('+');
            
            // If it's a number, animate it
            if (!isNaN(parseInt(numericValue))) {
                const endNumber = parseInt(numericValue);
                const increment = endNumber / (duration / stepTime);
                
                stat.textContent = '0';
                
                const interval = setInterval(() => {
                    currentNumber += increment;
                    
                    if (currentNumber >= endNumber) {
                        clearInterval(interval);
                        stat.textContent = hasPlus ? `${endNumber}+` : endNumber;
                    } else {
                        stat.textContent = hasPlus ? `${Math.floor(currentNumber)}+` : Math.floor(currentNumber);
                    }
                }, stepTime);
            }
        });
    }
    
    // Animate feature cards and other elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('.feature-card, .instructor-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        // Trigger number animation when stats are in view
        const statsContainers = document.querySelectorAll('.hero-stats, .instructor-stats-container');
        
        statsContainers.forEach(container => {
            const position = container.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (position < windowHeight - 100 && !container.classList.contains('animated')) {
                container.classList.add('animated');
                animateNumbers();
            }
        });
    }
    
    // Set initial state for animations
    const animatedElements = document.querySelectorAll('.feature-card, .instructor-image');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS animations to style element
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.4); }
            70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(79, 70, 229, 0); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
        
        .curriculum-path {
            position: relative;
        }
        
        .phase-hover-effect:hover .phase-badge {
            animation: bounce 1s ease;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Enrollment button action
    const enrollButtons = document.querySelectorAll('.enroll-btn, .primary-btn');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Redirect to WhatsApp group
            window.open('https://chat.whatsapp.com/JtXBrxcXm2F3umeTtBONg7', '_blank');
        });
    });
    
    // "View Curriculum" button scrolls to curriculum section
    const viewCurriculumBtn = document.querySelector('.outline-btn');
    
    if (viewCurriculumBtn) {
        viewCurriculumBtn.addEventListener('click', function() {
            const curriculumSection = document.querySelector('#curriculum');
            if (curriculumSection) {
                window.scrollTo({
                    top: curriculumSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}); 