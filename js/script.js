// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const scrollToTop = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const navItems = document.querySelectorAll('.nav-links a');

// Mobile navigation toggle with improved functionality
if (hamburger) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Prevent scrolling when menu is open
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on links
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset hamburger icon
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset hamburger icon
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Handle resize events for responsive behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset hamburger icon
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Change header background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide scroll-to-top button
    if (window.scrollY > 500) {
        scrollToTop.classList.add('active');
    } else {
        scrollToTop.classList.remove('active');
    }
});

// Scroll to section when nav link is clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '#!') {
            return;
        }
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            
            window.scrollTo({
                top: offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.dataset.filter;
        
        // Filter projects
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.dataset.category === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Handle contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // You would typically send this data to a server
        // For this demo, we'll just log it and show a success message
        console.log({
            name,
            email,
            subject,
            message
        });
        
        // Show success message (in a real app, you'd wait for the server response)
        alert('Message sent successfully!');
        
        // Reset form
        contactForm.reset();
    });
}

// Animate skills on scroll
const skillItems = document.querySelectorAll('.skill-item');
const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

// Set up Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Add CSS class for skill animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation delay to skill items
    skillItems.forEach((item, index) => {
        item.style.animationDelay = `${0.1 * index}s`;
    });
});

// Preloader (optional)
window.addEventListener('load', () => {
    // When the page finishes loading, you can add animations
    document.body.classList.add('loaded');
});

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
                    document.body.classList.add('loaded');
                }, 500);
            }, 800);
        }
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
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
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
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
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
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
    
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // You would typically send this data to a server
            // For this demo, we'll just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Show success message (in a real app, you'd wait for the server response)
            alert('Message sent successfully!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
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
    
    // Animate curriculum phases on scroll
    animateCurriculumOnScroll();
    
    // Add tilt effect to project cards
    addTiltEffect();
    
    // Animate stats numbers
    animateNumbers();
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Function to animate curriculum phases when scrolled into view
    function animateCurriculumOnScroll() {
        const curriculumPhases = document.querySelectorAll('.curriculum-phase');
        
        if (curriculumPhases.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the curriculum phase
                    entry.target.classList.add('animated');
                    
                    // Animate topic list items with staggered delay
                    const topicItems = entry.target.querySelectorAll('.topic-list li');
                    topicItems.forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('animated');
                            
                            // Get the technology icon and add advanced animations
                            const techIcon = item.querySelector('i');
                            if (techIcon) {
                                // Create a glowing effect
                                techIcon.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                                
                                // Apply a subtle animation based on index
                                item.style.animation = `skill-wave 3s ease-in-out ${i * 0.1}s infinite`;
                                
                                // Add interactive hover effects
                                item.addEventListener('mouseenter', () => {
                                    techIcon.style.transform = 'scale(1.3) rotate(10deg)';
                                    techIcon.style.color = '#6366f1';
                                    techIcon.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.5)';
                                    item.style.backgroundColor = 'white';
                                    item.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                    item.style.boxShadow = '0 10px 25px rgba(99, 102, 241, 0.15)';
                                });
                                
                                item.addEventListener('mouseleave', () => {
                                    techIcon.style.transform = 'scale(1) rotate(0deg)';
                                    techIcon.style.color = '';
                                    techIcon.style.textShadow = '';
                                    item.style.backgroundColor = '';
                                    item.style.borderColor = '';
                                    item.style.boxShadow = '';
                                });
                            }
                        }, i * 100); // Staggered delay for each item
                    });
                    
                    // Animate the phase badge with a bounce effect
                    const phaseBadge = entry.target.querySelector('.phase-badge');
                    if (phaseBadge) {
                        phaseBadge.style.animation = 'bounce 0.5s ease-in-out 0.3s';
                        setTimeout(() => {
                            phaseBadge.style.animation = 'pulse 2s infinite';
                        }, 800);
                    }
                    
                    // Add a 3D tilt effect to phase details card on mouse movement
                    const phaseDetails = entry.target.querySelector('.phase-details');
                    if (phaseDetails) {
                        phaseDetails.addEventListener('mousemove', function(e) {
                            const rect = this.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            
                            const tiltX = (y - centerY) / 20;
                            const tiltY = (centerX - x) / 20;
                            
                            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
                        });
                        
                        phaseDetails.addEventListener('mouseleave', function() {
                            this.style.transform = '';
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        curriculumPhases.forEach(phase => {
            observer.observe(phase);
        });
        
        // Add a progressive animation to the path line
        const pathLine = document.querySelector('.path-line');
        if (pathLine) {
            const pathObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Create and add a pseudo-element for animation
                        const style = document.createElement('style');
                        style.innerHTML = `
                            .path-line::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 0%;
                                background: linear-gradient(to bottom, #4f46e5, #818cf8);
                                border-radius: 2px;
                                animation: pathGrow 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                            }
                            
                            @keyframes pathGrow {
                                from { height: 0%; }
                                to { height: 100%; }
                            }
                            
                            @keyframes bounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-10px); }
                            }
                        `;
                        document.head.appendChild(style);
                        
                        // Add a particle effect along the path
                        createPathParticles(pathLine);
                        
                        pathObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            pathObserver.observe(pathLine);
        }
        
        // Create floating particles along the path line
        function createPathParticles(pathLine) {
            const particleCount = 5;
            const colors = ['#4f46e5', '#6366f1', '#818cf8'];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('path-particle');
                
                // Style the particle
                particle.style.position = 'absolute';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.left = '0';
                particle.style.top = (20 + (i * 20)) + '%';
                particle.style.transform = 'translateX(-50%)';
                particle.style.boxShadow = '0 0 10px rgba(99, 102, 241, 0.5)';
                particle.style.zIndex = '3';
                
                // Add animation
                particle.style.animation = `floatParticle ${3 + i}s ease-in-out ${i * 0.5}s infinite`;
                
                // Add the particle to the DOM
                pathLine.appendChild(particle);
            }
            
            // Add keyframes for the particle animation
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateX(-50%) translateY(-20px);
                        opacity: 0.5;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Add tilt effect to project cards
    function addTiltEffect() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const tiltX = (y - centerY) / 20;
                const tiltY = (centerX - x) / 20;
                
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
    }
    
    // Animate stat numbers
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statNumbers.length) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetValue = parseInt(target.textContent);
                    
                    let startValue = 0;
                    let duration = 2000;
                    
                    let counter = setInterval(() => {
                        if (targetValue > 100) {
                            startValue += 10;
                        } else {
                            startValue += 1;
                        }
                        
                        target.textContent = startValue + (target.textContent.includes('+') ? '+' : '');
                        
                        if (startValue >= targetValue) {
                            clearInterval(counter);
                            target.textContent = targetValue + (target.textContent.includes('+') ? '+' : '');
                        }
                    }, duration / targetValue);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Initialize scroll animations for various elements
    function animateOnScroll() {
        const fadeElements = document.querySelectorAll('.hero-content, .hero-image-container, .hero-stats, .project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Initialize the tech particles after the DOM has fully loaded
    createTechParticles();
    
    // Initialize about section animations
    animateAboutSection();
});

// Function to create interactive tech particles background effect
function createTechParticles() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    // Create canvas for particles
    const canvas = document.createElement('canvas');
    canvas.classList.add('tech-particles-canvas');
    aboutSection.appendChild(canvas);
    
    // Position the canvas
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    const ctx = canvas.getContext('2d');
    
    // Resize canvas to match section size
    function resizeCanvas() {
        canvas.width = aboutSection.offsetWidth;
        canvas.height = aboutSection.offsetHeight;
    }
    
    // Create particles
    const particles = [];
    const particleCount = 40;
    const colors = ['#4f46e5', '#3b82f6', '#059669', '#6366f1'];
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.alpha = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Bounce off edges
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
            
            if (this.y > canvas.height || this.y < 0) {
                this.speedY = -this.speedY;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Initialize particles
    function init() {
        resizeCanvas();
        particles.length = 0;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between nearby particles
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 0.3;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.globalAlpha = 0.2 * (1 - distance / 100);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Handle mouse interaction
    let mouseX = null;
    let mouseY = null;
    
    aboutSection.addEventListener('mousemove', (e) => {
        const rect = aboutSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Push particles away from cursor
        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
                const angle = Math.atan2(dy, dx);
                const force = (80 - distance) / 800;
                
                particle.speedX += Math.cos(angle) * force;
                particle.speedY += Math.sin(angle) * force;
                
                // Add some dampening to prevent excessive speeds
                particle.speedX *= 0.98;
                particle.speedY *= 0.98;
            }
        });
    });
    
    aboutSection.addEventListener('mouseleave', () => {
        mouseX = null;
        mouseY = null;
    });
    
    // Handle resize
    window.addEventListener('resize', init);
    
    // Start animation
    init();
    animate();
}

// Function to animate the about section with modern effects
function animateAboutSection() {
    // Animate the tech stack orbit
    const techIcons = document.querySelectorAll('.tech-stack-orbit .tech-icon');
    
    techIcons.forEach((icon) => {
        icon.addEventListener('mouseenter', () => {
            const iconEl = icon.querySelector('i');
            iconEl.style.transform = 'scale(1.3)';
            iconEl.style.color = '#6366f1';
            iconEl.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.8)';
        });
        
        icon.addEventListener('mouseleave', () => {
            const iconEl = icon.querySelector('i');
            iconEl.style.transform = '';
            iconEl.style.color = '';
            iconEl.style.textShadow = '';
        });
    });
    
    // Make orbit path pulsating
    const orbitPath = document.querySelector('.orbit-path');
    if (orbitPath) {
        orbitPath.style.animation = 'orbit-pulse 6s infinite ease-in-out';
    }
    
    // Add animations for technical experience section
    const techCategories = document.querySelectorAll('.tech-category');
    techCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            category.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
        
        // Animate tech list items within each category
        const techItems = category.querySelectorAll('.tech-list li');
        techItems.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 600 + (index * 150) + (i * 100));
        });
        
        // Add subtle hover effect for category icon
        const icon = category.querySelector('.category-icon');
        if (icon) {
            // Random floating animation
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            icon.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        }
    });
    
    // Animate stats items
    const statEntries = document.querySelectorAll('.stat-entry');
    statEntries.forEach((entry, index) => {
        entry.style.opacity = '0';
        entry.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            entry.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            entry.style.opacity = '1';
            entry.style.transform = 'translateY(0)';
            
            // Animate the number counting up
            const valueEl = entry.querySelector('.stat-number');
            if (valueEl) {
                const targetValue = valueEl.textContent;
                const numericValue = parseInt(targetValue);
                
                if (!isNaN(numericValue)) {
                    animateCounter(valueEl, 0, targetValue);
                }
            }
        }, 300 + (index * 100));
    });
    
    // Add floating effect to stats
    statEntries.forEach((entry) => {
        let delay = Math.random() * 2;
        entry.style.animation = `float ${2 + Math.random()}s ease-in-out ${delay}s infinite`;
    });
    
    // Add mouse hover effect for stats
    const statsDisplay = document.querySelector('.stats-display');
    if (statsDisplay) {
        statsDisplay.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            statsDisplay.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        statsDisplay.addEventListener('mouseleave', function() {
            statsDisplay.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
    
    // Animate connect items
    const connectItems = document.querySelectorAll('.connect-item');
    connectItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1200 + (index * 150));
    });
    
    // Animate social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 1500 + (index * 100));
        
        // Add magnetic button effect
        link.addEventListener('mousemove', function(e) {
            const position = this.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        link.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
    
    // Helper function to animate counter
    function animateCounter(element, start, end) {
        let current = start;
        const increment = end > 1000 ? 50 : end > 100 ? 5 : 1;
        const duration = 1500; // Animation duration in ms
        const endValue = parseInt(end);
        const steps = Math.ceil(endValue / increment);
        const stepTime = duration / steps;
        
        const timer = setInterval(function() {
            current += increment;
            if (current > endValue) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = current + (end.includes('+') ? '+' : '');
            }
        }, stepTime);
    }
}

// Function to create modern magnetic button effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .experience-card, .stat-card');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const distanceX = x - centerX;
            const distanceY = y - centerY;
            
            this.style.transform = `translate(${distanceX / 10}px, ${distanceY / 10}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.5s ease';
        });
    });
    
    // Add CSS for modern UI elements
    addModernUIStyles();
}

// Function to inject modern UI styles
function addModernUIStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        /* Modern UI Styles for 2025 */
        
        /* Custom cursor */
        .custom-cursor {
            position: fixed;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid rgba(79, 70, 229, 0.3);
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, border-color 0.3s;
            mix-blend-mode: difference;
        }
        
        .cursor-dot {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 8px;
            height: 8px;
            background-color: #4f46e5;
            border-radius: 50%;
            transition: width 0.3s, height 0.3s, background-color 0.3s;
        }
        
        .cursor-expanded {
            width: 60px;
            height: 60px;
            border-color: rgba(79, 70, 229, 0.5);
        }
        
        .cursor-expanded .cursor-dot {
            width: 12px;
            height: 12px;
            background-color: #6366f1;
        }
        
        /* Theme switcher */
        .theme-switcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #ffffff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .theme-switcher:hover {
            transform: scale(1.1);
        }
        
        .switcher-icon {
            position: relative;
            width: 24px;
            height: 24px;
        }
        
        .switcher-icon i {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 24px;
            transition: opacity 0.3s, transform 0.5s;
        }
        
        .switcher-icon .fa-sun {
            opacity: 1;
            transform: rotate(0deg);
            color: #f59e0b;
        }
        
        .switcher-icon .fa-moon {
            opacity: 0;
            transform: rotate(90deg);
            color: #4f46e5;
        }
        
        .theme-switcher.dark .switcher-icon .fa-sun {
            opacity: 0;
            transform: rotate(-90deg);
        }
        
        .theme-switcher.dark .switcher-icon .fa-moon {
            opacity: 1;
            transform: rotate(0deg);
        }
        
        /* Dark theme */
        body.dark-theme {
            background-color: #0f172a;
            color: #e2e8f0;
        }
        
        body.dark-theme header {
            background-color: rgba(15, 23, 42, 0.95);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        body.dark-theme .logo h1 {
            color: #e2e8f0;
        }
        
        body.dark-theme .nav-links a {
            color: #e2e8f0;
        }
        
        body.dark-theme .nav-links a.active {
            color: #6366f1;
        }
        
        body.dark-theme .section-header h2 {
            color: #e2e8f0;
        }
        
        body.dark-theme .btn.primary-btn {
            background-color: #4f46e5;
            color: #e2e8f0;
        }
        
        body.dark-theme .btn.secondary-btn {
            border-color: #4f46e5;
            color: #4f46e5;
        }
        
        body.dark-theme .experience-card,
        body.dark-theme .project-card,
        body.dark-theme .stat-card,
        body.dark-theme .contact-card {
            background-color: #1e293b;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        /* Modern scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.05);
        }
        
        ::-webkit-scrollbar-thumb {
            background-color: rgba(79, 70, 229, 0.5);
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(79, 70, 229, 0.7);
        }
        
        /* Modern navbar */
        .scroll-progress {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 3px;
            width: 0%;
            background: linear-gradient(to right, #4f46e5, #6366f1);
            z-index: 1000;
            transition: width 0.2s ease;
        }
        
        .highlight-link {
            position: relative;
            color: #4f46e5 !important;
            font-weight: 600;
        }
        
        .pulse-indicator {
            position: absolute;
            top: -2px;
            right: -10px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #4f46e5;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(0.8);
                box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
            }
            70% {
                transform: scale(1.2);
                box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
            }
            100% {
                transform: scale(0.8);
                box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
            }
        }
        
        .link-clicked {
            animation: link-pulse 0.5s ease forwards;
        }
        
        @keyframes link-pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        /* Modern form styles */
        .form-group {
            position: relative;
            margin-bottom: 25px;
        }
        
        .form-group label {
            position: absolute;
            top: 15px;
            left: 15px;
            color: #6b7280;
            font-size: 16px;
            transition: all 0.3s ease;
            pointer-events: none;
        }
        
        .form-group label.active {
            top: -10px;
            left: 10px;
            font-size: 12px;
            color: #4f46e5;
            background-color: #ffffff;
            padding: 0 5px;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
            outline: none;
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ef4444;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
        }
        
        .error-message {
            color: #ef4444;
            font-size: 12px;
            margin-top: 5px;
            display: block;
        }
        
        .shake {
            animation: shake 0.5s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translateX(-5px);
            }
            20%, 40%, 60%, 80% {
                transform: translateX(5px);
            }
        }
        
        .success-message {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
        }
        
        .success-message.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-icon {
            font-size: 50px;
            color: #10b981;
            margin-bottom: 20px;
            animation: success-icon 1s ease forwards;
        }
        
        @keyframes success-icon {
            0% {
                transform: scale(0);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        /* Modern animation keyframes */
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        
        @keyframes tech-icon-float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes tech-icon-glow {
            0%, 100% {
                filter: drop-shadow(0 0 5px rgba(79, 70, 229, 0.5));
            }
            50% {
                filter: drop-shadow(0 0 15px rgba(79, 70, 229, 0.8));
            }
        }
        
        /* No scroll when mobile menu is open */
        body.no-scroll {
            overflow: hidden;
        }
        
        /* Reveal animation for hero content */
        .hero-content {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .hero-content.reveal-animation {
            animation: reveal 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        
        @keyframes reveal {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(styleElement);
}

// Apply modern UI enhancements when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create a modern navigation bar with blur effect and enhanced interactions
    modernizeNavbar();
    
    // Add modern theme switcher
    addThemeSwitcher();
    
    // Add custom cursor effect for modern UI
    addCustomCursor();
    
    // Initialize the tech particles
    createTechParticles();
    
    // Initialize about section animations
    animateAboutSection();
    
    // Animate curriculum phases on scroll
    animateCurriculumOnScroll();
    
    // Add tilt effect to project cards
    addTiltEffect();
    
    // Animate stats numbers
    animateNumbers();
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Initialize magnetic buttons effect
    initMagneticButtons();
    
    // Add 3D parallax effect to hero section
    addHeroParallax();
    
    // Add uniform animations to all sections
    addUniformAnimations();
    
    // Enhance dark mode functionality
    enhanceDarkMode();
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        hidePreloader();
    });
});

// Function to add uniform animations to all sections for consistent feel
function addUniformAnimations() {
    // Apply animations to all sections
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach(section => {
        // Add subtle entrance animation for each section
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }, 100);
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
    
    // Add hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('button, .btn, .project-card, .experience-card, .tech-icon, .social-contact-links a');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Don't override existing transforms for elements that already have hover effects
            if (!this.classList.contains('tech-icon') && 
                !this.classList.contains('project-card') && 
                !this.classList.contains('experience-card') &&
                !this.classList.contains('social-contact-links')) {
                this.style.transform = 'translateY(-5px) scale(1.03)';
            }
            
            this.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('tech-icon') && 
                !this.classList.contains('project-card') && 
                !this.classList.contains('experience-card') &&
                !this.classList.contains('social-contact-links')) {
                this.style.transform = '';
            }
            this.style.boxShadow = '';
        });
    });
}

// Function to enhance dark mode functionality for the entire website
function enhanceDarkMode() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateDarkModeStyles(true);
    }
    
    // Add more complete dark mode styling
    const darkModeStyles = document.createElement('style');
    darkModeStyles.id = 'dark-mode-styles';
    darkModeStyles.textContent = `
        body.dark-theme {
            background-color: #0f172a;
            color: #e2e8f0;
        }
        
        body.dark-theme header {
            background-color: rgba(15, 23, 42, 0.95) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
        }
        
        body.dark-theme .logo h1,
        body.dark-theme h1,
        body.dark-theme h2,
        body.dark-theme h3 {
            color: #e2e8f0;
        }
        
        body.dark-theme .nav-links a {
            color: #e2e8f0;
        }
        
        body.dark-theme .nav-links a.active,
        body.dark-theme .highlight,
        body.dark-theme .highlight-text {
            color: #6366f1 !important;
        }
        
        body.dark-theme .section-header h2 span,
        body.dark-theme .highlight span {
            color: #6366f1;
        }
        
        body.dark-theme .btn.primary-btn {
            background-color: #4f46e5;
            color: #e2e8f0;
        }
        
        body.dark-theme .btn.secondary-btn {
            border-color: #4f46e5;
            color: #4f46e5;
        }
        
        body.dark-theme .hero-shape {
            background: rgba(79, 70, 229, 0.1);
        }
        
        body.dark-theme .code-snippet {
            background-color: #1e293b;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        
        body.dark-theme code {
            color: #e2e8f0;
        }
        
        body.dark-theme .keyword {
            color: #ec4899;
        }
        
        body.dark-theme .string {
            color: #10b981;
        }
        
        body.dark-theme .tag {
            color: #6366f1;
        }
        
        body.dark-theme .function {
            color: #f59e0b;
        }
        
        body.dark-theme .experience-card,
        body.dark-theme .project-card,
        body.dark-theme .stat-card,
        body.dark-theme .contact-card,
        body.dark-theme .instructor-card,
        body.dark-theme .curriculum-phase,
        body.dark-theme .skill-category {
            background-color: #1e293b;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        body.dark-theme .tech-badge {
            background-color: #2d3748;
            color: #6366f1;
        }
        
        body.dark-theme .phase-badge {
            background-color: #6366f1;
            color: #e2e8f0;
        }
        
        body.dark-theme .path-line {
            background-color: rgba(99, 102, 241, 0.3);
        }
        
        body.dark-theme .filter-btn {
            background-color: #1e293b;
            color: #e2e8f0;
        }
        
        body.dark-theme .filter-btn.active {
            background-color: #6366f1;
            color: #e2e8f0;
        }
        
        body.dark-theme .form-group input,
        body.dark-theme .form-group textarea {
            background-color: #1e293b;
            border-color: #2d3748;
            color: #e2e8f0;
        }
        
        body.dark-theme .form-group label {
            color: #94a3b8;
        }
        
        body.dark-theme .form-group label.active {
            background-color: #1e293b;
            color: #6366f1;
        }
        
        body.dark-theme .tech-particles-canvas {
            opacity: 0.7;
        }
        
        body.dark-theme footer {
            background-color: #1e293b;
            color: #e2e8f0;
        }
        
        body.dark-theme .scroll-to-top {
            background-color: #1e293b;
            color: #6366f1;
        }
        
        body.dark-theme .hamburger .bar {
            background-color: #e2e8f0;
        }
    `;
    
    document.head.appendChild(darkModeStyles);
    
    // Add dark mode toggle function that's more robust
    document.addEventListener('click', function(e) {
        const themeSwitcher = e.target.closest('.theme-switcher');
        if (themeSwitcher) {
            document.body.classList.toggle('dark-theme');
            themeSwitcher.classList.toggle('dark');
            
            // Save preference
            const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
            
            // Update styles for specific components
            updateDarkModeStyles(document.body.classList.contains('dark-theme'));
        }
    });
}

// Function to update specific elements for dark mode
function updateDarkModeStyles(isDark) {
    // Apply specific styles based on dark mode state
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.classList.toggle('dark', isDark);
    }
    
    // Update canvas particles for dark mode
    const canvas = document.querySelector('.tech-particles-canvas');
    if (canvas) {
        canvas.style.opacity = isDark ? '0.7' : '1';
    }
    
    // Update code snippet colors for dark mode
    const codeSnippet = document.querySelector('.code-snippet');
    if (codeSnippet) {
        codeSnippet.style.backgroundColor = isDark ? '#1e293b' : '';
    }
    
    // Add dark mode transitions for smooth theme change
    document.body.style.transition = 'background-color 0.5s, color 0.5s';
    
    // Update all cards for dark mode
    const cards = document.querySelectorAll('.project-card, .experience-card, .stat-card, .contact-card');
    cards.forEach(card => {
        card.style.transition = 'background-color 0.5s, box-shadow 0.5s, transform 0.3s';
    });
}

// Initial animations and setup
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader once page is fully loaded
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Start animations once preloader is gone
            setTimeout(() => {
                // Animate tech stack orbit and about section
                animateAboutSection();
                
                // Start animated section observers
                animateCurriculumOnScroll();
                
                // Create tech particles background
                createTechParticles();
                
                // Initialize other animations
                initMagneticButtons();
                addModernUIStyles();
            }, 500);
        }, 1000);
    }
});

// Project Card animations and interactions
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Initialize animations and hover effects
    projectCards.forEach(card => {
        // Apply 3D tilt effect on mousemove
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });
        
        // Reset transform on mouseout
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Reapply hover elevation after transition completes
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
            }, 600);
        });
        
        // Add hover animation to project buttons
        const projectButtons = card.querySelectorAll('.project-links a');
        projectButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    });
}

// Project filter functionality with smooth animations
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listener to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects with smooth animations
            projectCards.forEach(card => {
                // Get card category
                const category = card.getAttribute('data-category');
                
                // Reset animation
                card.style.animation = 'none';
                
                // Check if card should be shown
                if (filterValue === 'all' || category === filterValue) {
                    // Show card with animation
                    setTimeout(() => {
                        card.style.display = 'flex';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        
                        // Force reflow
                        void card.offsetWidth;
                        
                        // Add animation
                        card.style.animation = 'fade-in-up 0.6s forwards';
                    }, 50);
                } else {
                    // Hide card with animation
                    card.style.animation = 'fade-out 0.3s forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Add pulsing glow effect to "View All Projects" button
function initViewAllButton() {
    const viewAllButton = document.querySelector('.projects-more .btn');
    if (viewAllButton) {
        viewAllButton.addEventListener('mouseenter', () => {
            viewAllButton.style.boxShadow = '0 15px 30px rgba(79, 70, 229, 0.4)';
        });
        
        viewAllButton.addEventListener('mouseleave', () => {
            viewAllButton.style.boxShadow = '';
        });
    }
}

// Apply random subtle animations to project techs
function animateProjectTechs() {
    const techBadges = document.querySelectorAll('.project-tech span');
    
    techBadges.forEach(badge => {
        // Apply random animation delay for subtle movement
        const delay = Math.random() * 2;
        badge.style.animationDelay = `${delay}s`;
        
        // Add subtle floating animation
        badge.style.animation = 'tech-icon-float 3s ease-in-out infinite';
    });
}

// Initialize all project section features
function initProjectsSection() {
    initProjectCards();
    initProjectFilters();
    initViewAllButton();
    animateProjectTechs();
    
    // Add fade-in animation to cards when they enter viewport
    const projectsSection = document.querySelector('.projects');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 150);
                });
                
                // Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (projectsSection) {
        observer.observe(projectsSection);
    }
}

// Add keyframe for fade-out animation
function addStylesheet() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-out {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize form interactions and animations
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    const contactSuccess = document.getElementById('contactSuccess');
    const contactError = document.getElementById('contactError');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Add subtle staggered animation to contact items on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Apply initial styles and add to observer
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(item);
    });
    
    // Add floating label effect
    formInputs.forEach(input => {
        // Check if input has value on page load
        if (input.value.trim() !== '') {
            input.nextElementSibling.style.opacity = '1';
        }
        
        // Show/hide floating label on focus/blur
        input.addEventListener('focus', () => {
            input.nextElementSibling.style.opacity = '1';
        });
        
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.nextElementSibling.style.opacity = '0';
            }
        });
        
        // Handle input change
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.nextElementSibling.style.opacity = '1';
            } else {
                input.nextElementSibling.style.opacity = '0';
            }
        });
    });
    
    // Add validation and submission handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showError('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Show success message
                contactSuccess.style.display = 'block';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    contactSuccess.style.display = 'none';
                }, 5000);
                
                // Reset floating labels
                formInputs.forEach(input => {
                    input.nextElementSibling.style.opacity = '0';
                });
                
            }, 2000);
        });
    }
    
    // Function to show error message
    function showError(message) {
        contactError.textContent = message;
        contactError.style.display = 'block';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
            contactError.style.display = 'none';
        }, 5000);
    }
    
    // Add magnetic effect to social icons
    const socialLinks = document.querySelectorAll('.contact-social a');
    socialLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const strength = 10;
            
            link.style.transform = `translate(${x / strength}px, ${y / strength}px) scale(1.1)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
            link.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
    
    // Add subtle animation to contact form on scroll
    const formElement = document.querySelector('.contact-form');
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                formObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (formElement) {
        formElement.style.opacity = '0';
        formElement.style.transform = 'translateY(30px)';
        formElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        formObserver.observe(formElement);
    }
    
    // Add animation to CTA section
    const cta = document.querySelector('.cta');
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                ctaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (cta) {
        cta.style.opacity = '0';
        cta.style.transform = 'translateY(30px)';
        cta.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        ctaObserver.observe(cta);
    }
}

// Initialize newsletter form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would typically send this to your server/API
            // For demo, we'll just show a success message
            emailInput.value = '';
            alert('Thank you for subscribing to our newsletter!');
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Call after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize preloader
    initPreloader();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll to sections
    initScrollToSections();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize project features and filters
    initProjectsSection();
    
    // Add dynamic keyframes
    addStylesheet();
    
    // Initialize contact form interactions and animations
    initContactForm();
    
    // Initialize newsletter form in footer
    initNewsletterForm();
    
    // Animate About section
    animateAboutSection();
    
    // Update copyright year automatically
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});

// Initialize mobile menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.querySelector('body');

    if (hamburger && navLinks) {
        // Toggle mobile menu on hamburger click
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when mobile menu is open
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close menu when a nav link is clicked
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
                
                // Add special handling for external links like course link
                if (item.getAttribute('target') === '_blank') {
                    // For external links with target="_blank", we don't need to prevent the default behavior
                    return;
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
} 