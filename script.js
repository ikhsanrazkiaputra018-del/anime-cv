// ========== PARTICLES BACKGROUND ==========
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particlesCount = 50;

    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;
        const left = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector('.navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navLinksAll = document.querySelectorAll('.nav-links a');

// Scroll event for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinksAll.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksAll.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== SCROLL REVEAL ANIMATION ==========
function revealOnScroll() {
    const elements = document.querySelectorAll('.about-card, .edu-item, .skill-category, .project-card, .contact-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for reveal elements
document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
});

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Trigger on load
window.addEventListener('load', () => {
    revealOnScroll();
    setTimeout(revealOnScroll, 200);
});

// ========== SMOOTH SCROLL FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== SKILL BARS ANIMATION ==========
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    skillFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 300);
    });
}

// Trigger skill bar animation when skills section is in view
const skillsSection = document.querySelector('.skills');
let skillBarsAnimated = false;

function checkSkillsSection() {
    if (!skillsSection || skillBarsAnimated) return;
    
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
        animateSkillBars();
        skillBarsAnimated = true;
    }
}

window.addEventListener('scroll', checkSkillsSection);
window.addEventListener('load', checkSkillsSection);

// ========== CONTACT FORM ANIMATION ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            const btn = this.querySelector('.btn');
            const originalText = btn.textContent;
            
            btn.textContent = '✨ Message Sent! ✨';
            btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 3000);
        }
    });

    // Input focus effects
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// ========== PARALLAX EFFECT ON MOUSE MOVE ==========
const heroAvatar = document.querySelector('.hero-avatar');
const floatItems = document.querySelectorAll('.float-item');

if (heroAvatar) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        
        floatItems.forEach((item, index) => {
            const speed = (index + 1) * 2;
            const moveX = x * speed * 0.5;
            const moveY = y * speed * 0.5;
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

// ========== TYPING EFFECT FOR GREETING ==========
function typeWriter() {
    const greeting = document.querySelector('.hero-greeting');
    if (!greeting) return;
    
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.visibility = 'visible';
    
    let charIndex = 0;
    
    function type() {
        if (charIndex < text.length) {
            greeting.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 500);
}

// Start typing effect after page loads
window.addEventListener('load', typeWriter);

// ========== COUNTER FOR STATS (if any were added) ==========
// Placeholder for future stats counters

// ========== RESIZE HANDLER ==========
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        revealOnScroll();
    }, 250);
});

// ========== CONSOLE EASTER EGG ==========
console.log('%c✦ Ikhsan Razkia Putra ✦', 
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #ff69b4, #9966ff); padding: 15px; border-radius: 10px; color: white;');
console.log('%cAnime Style CV - Made with 💖 & ✨ Anime Spirit', 
    'font-size: 14px; color: #b8b8ff;');

// ========== PREVENT DEFAULT BEHAVIOR FOR SCROLL INDICATOR ==========
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

console.log('✨ Website CV Anime Style - Ikhsan Razkia Putra ✨');