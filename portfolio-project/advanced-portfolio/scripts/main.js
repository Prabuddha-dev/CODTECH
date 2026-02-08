// Main JavaScript with Advanced Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== CUSTOM CURSOR ==========
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out"
        });
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .magnetic, .nav-item, .project-card, .skill-item'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            gsap.to(cursor, { scale: 1.5, duration: 0.3 });
            gsap.to(follower, { scale: 1.2, duration: 0.3 });
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            gsap.to(cursor, { scale: 1, duration: 0.3 });
            gsap.to(follower, { scale: 1, duration: 0.3 });
        });
    });
    
    // ========== MAGNETIC BUTTONS ==========
    class MagneticButton {
        constructor(element) {
            this.element = element;
            this.bounding = element.getBoundingClientRect();
            this.strength = 50;
            
            element.addEventListener('mousemove', this.onMouseMove.bind(this));
            element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        }
        
        onMouseMove(e) {
            const x = e.clientX - this.bounding.left - this.bounding.width / 2;
            const y = e.clientY - this.bounding.top - this.bounding.height / 2;
            
            gsap.to(this.element, {
                x: (x / this.bounding.width) * this.strength,
                y: (y / this.bounding.height) * this.strength,
                duration: 0.6,
                ease: "power2.out"
            });
        }
        
        onMouseLeave() {
            gsap.to(this.element, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            });
        }
    }
    
    // Initialize magnetic buttons
    document.querySelectorAll('.magnetic').forEach(el => {
        new MagneticButton(el);
    });
    
    // ========== TYPING ANIMATION ==========
    const typingText = document.getElementById('typingText');
    const texts = [
        "Front-End Developer",
        "Android App Developer",
        "Tech Enthusiast",
        "Problem Solver",
        "Creative Thinker"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, 500);
        } else {
            setTimeout(typeText, isDeleting ? 50 : 100);
        }
    }
    
    setTimeout(typeText, 1000);
    
    // ========== SCROLL ANIMATIONS ==========
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero title animation
    gsap.from('.title-word', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top center',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
    });
    
    // Section reveals
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
    
    // Skill bars animation
    gsap.utils.toArray('.skill-item').forEach(item => {
        const level = item.getAttribute('data-level');
        const progress = item.querySelector('.skill-progress');
        const percent = item.querySelector('.skill-percent');
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(progress, {
                    width: `${level}%`,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        const width = Math.round(progress.style.width);
                        percent.textContent = `${width}%`;
                    }
                });
            }
        });
    });
    
    // Circular progress
    gsap.utils.toArray('.stat-circle').forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const fill = circle.querySelector('.circle-fill');
        const text = circle.querySelector('.percent');
        
        ScrollTrigger.create({
            trigger: circle,
            start: 'top 90%',
            onEnter: () => {
                const circumference = 2 * Math.PI * 54;
                const offset = circumference - (percent / 100) * circumference;
                
                gsap.to(fill, {
                    strokeDashoffset: offset,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: () => {
                        const progress = Math.round(((circumference - fill.style.strokeDashoffset) / circumference) * 100);
                        text.textContent = `${progress}%`;
                    }
                });
            }
        });
    });
    
    // ========== PROJECT CAROUSEL ==========
    const carousel = document.querySelector('.carousel-container');
    const prevBtn = document.querySelector('.carousel-nav .prev');
    const nextBtn = document.querySelector('.carousel-nav .next');
    
    if (carousel && prevBtn && nextBtn) {
        const cardWidth = 440; // 400px + 40px gap
        let currentPosition = 0;
        
        prevBtn.addEventListener('click', () => {
            currentPosition = Math.min(currentPosition + cardWidth, 0);
            gsap.to(carousel, {
                x: currentPosition,
                duration: 0.8,
                ease: "power2.out"
            });
        });
        
        nextBtn.addEventListener('click', () => {
            const maxScroll = -(carousel.scrollWidth - carousel.clientWidth);
            currentPosition = Math.max(currentPosition - cardWidth, maxScroll);
            gsap.to(carousel, {
                x: currentPosition,
                duration: 0.8,
                ease: "power2.out"
            });
        });
    }
    
    // ========== THEME TOGGLE ==========
    const themeSwitch = document.getElementById('themeSwitch');
    
    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                document.documentElement.style.setProperty('--dark', '#F5F5F5');
                document.documentElement.style.setProperty('--light', '#0A0A0F');
                document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.8)');
            } else {
                document.documentElement.style.setProperty('--dark', '#0A0A0F');
                document.documentElement.style.setProperty('--light', '#F5F5F5');
                document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.05)');
            }
        });
    }
    
    // ========== FORM SUBMISSION ==========
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('.btn-icon');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.style.opacity = '0';
            btnIcon.style.opacity = '0';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success
            btnLoader.style.display = 'none';
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = `
                    <span class="btn-text">Send Message</span>
                    <span class="btn-icon"><i class="fas fa-paper-plane"></i></span>
                    <div class="btn-loader">...</div>
                `;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                gsap.fromTo(submitBtn.querySelector('.btn-text'), 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
                gsap.fromTo(submitBtn.querySelector('.btn-icon'), 
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5 }
                );
            }, 3000);
        });
    }
    
    // ========== PAGE LOADER ==========
    const pageLoader = document.querySelector('.page-loader');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (pageLoader) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    gsap.to(pageLoader, {
                        opacity: 0,
                        duration: 0.8,
                        onComplete: () => {
                            pageLoader.style.display = 'none';
                            // Start animations after loader
                            gsap.from('.hero-title .title-word', {
                                y: 100,
                                opacity: 0,
                                duration: 1,
                                stagger: 0.1,
                                ease: "power3.out"
                            });
                        }
                    });
                }, 500);
            }
        }, 100);
    }
    
    // ========== BACK TO TOP ==========
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        });
    }
    
    // ========== NAVIGATION INDICATOR ==========
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    
    function updateNavIndicator() {
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && 
                window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
                
                // Update indicator position
                const itemRect = item.getBoundingClientRect();
                const navRect = document.querySelector('.nav-menu').getBoundingClientRect();
                
                if (navIndicator) {
                    gsap.to(navIndicator, {
                        left: itemRect.left - navRect.left,
                        width: itemRect.width,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateNavIndicator);
    updateNavIndicator(); // Initial call
    
    // ========== PARALLAX EFFECT ==========
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const rate = el.getAttribute('data-rate') || 0.5;
            const yPos = -(scrolled * rate);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    
    // ========== FLOATING ELEMENTS ==========
    const floatElements = document.querySelectorAll('.float-element');
    
    floatElements.forEach((el, index) => {
        // Randomize initial positions slightly
        gsap.set(el, {
            x: gsap.utils.random(-20, 20),
            y: gsap.utils.random(-20, 20),
            rotation: gsap.utils.random(-10, 10)
        });
        
        // Create floating animation
        gsap.to(el, {
            x: `+=${gsap.utils.random(-30, 30)}`,
            y: `+=${gsap.utils.random(-30, 30)}`,
            rotation: `+=${gsap.utils.random(-15, 15)}`,
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
        });
    });
    
    // ========== HOVER SOUND EFFECTS ==========
    const interactiveSoundElements = document.querySelectorAll('.cta-btn, .view-btn, .nav-item');
    
    interactiveSoundElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Create subtle hover sound effect (visual)
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            el.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========== LAZY LOADING IMAGES ==========
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
});