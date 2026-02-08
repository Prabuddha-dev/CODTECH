// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 2. Animate Stats Counting
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if(current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // 3. Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('fade-in-up');
                
                // If it's stats section, trigger counting
                if(entry.target.id === 'about') {
                    animateStats();
                }
                
                // If it's skill cards, animate progress bars
                if(entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if(progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 300);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('section, .skill-card, .project-card, .stat-card, .experience-card').forEach(el => {
        observer.observe(el);
    });
    
    // 4. Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            if(document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                document.documentElement.style.setProperty('--dark', '#F5F5F5');
                document.documentElement.style.setProperty('--light', '#1A1A2E');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                document.documentElement.style.setProperty('--dark', '#1A1A2E');
                document.documentElement.style.setProperty('--light', '#F5F5F5');
            }
        });
    }
    
    // 5. Image Pop Effect on Hover (Enhanced)
    document.querySelectorAll('.profile-photo, .project-photo').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.parentElement.classList.add('image-pop');
            
            // Add extra glow effect
            const glow = document.createElement('div');
            glow.className = 'temp-glow';
            glow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(108, 99, 255, 0.3), transparent 70%);
                z-index: 1;
                pointer-events: none;
            `;
            this.parentElement.appendChild(glow);
        });
        
        img.addEventListener('mouseleave', function() {
            this.parentElement.classList.remove('image-pop');
            const glow = this.parentElement.querySelector('.temp-glow');
            if(glow) glow.remove();
        });
    });
    
    // 6. Form Submission
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Message sent successfully! I\'ll get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // 7. Navbar Background on Scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.9)';
        }
    });
    
    // 8. Typewriter Effect for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if(heroTitle && heroTitle.classList.contains('animate-typing')) {
        // Reset animation for repeat viewing
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    heroTitle.style.animation = 'none';
                    setTimeout(() => {
                        heroTitle.style.animation = 'typing 3.5s steps(40, end), blink 0.75s step-end infinite';
                    }, 100);
                }
            });
        });
        observer.observe(heroTitle);
    }
    
    // 9. Initialize AOS-like animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-animate]');
        
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            el.classList.add('fade-in-up');
        });
    }
    
    initScrollAnimations();
});

// 10. Parallax Effect for Background Circles
window.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX * 20 * speed) - (10 * speed);
        const y = (mouseY * 20 * speed) - (10 * speed);
        
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// 11. Add Ripple Effect to Buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: 100px;
            height: 100px;
            top: ${y - 50}px;
            left: ${x - 50}px;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to styles
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);