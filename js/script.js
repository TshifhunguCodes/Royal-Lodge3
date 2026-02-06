// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const letters = document.querySelectorAll('.logo-letter');
    
    // Animate letters sequentially
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.animation = 'letterReveal 0.8s forwards';
        }, index * 300);
    });
    
    // Remove preloader after animation
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Start hero animations
        animateHero();
        startSlideShow();
    }, 1500);
});

// Hero Animations
function animateHero() {
    const titleLines = document.querySelectorAll('.title-line');
    const subtitle = document.querySelector('.hero-subtitle');
    const buttons = document.querySelector('.hero-buttons');
    
    titleLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = 'slideUp 1s forwards';
        }, index * 300);
    });
    
    setTimeout(() => {
        subtitle.style.animation = 'fadeUp 1s forwards';
    }, 900);
    
    setTimeout(() => {
        buttons.style.animation = 'fadeUp 1s forwards';
    }, 1200);
    
    // Animate stats counter
    animateStats();
}

// Hero Slideshow
function startSlideShow() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Start slideshow
    setInterval(nextSlide, 5000);
}

// Animate Stats Counter
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate detail items in location section
                if (entry.target.classList.contains('location-info')) {
                    const detailItems = entry.target.querySelectorAll('.detail-item');
                    detailItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 200);
                    });
                }
                
                // Animate about features
                if (entry.target.classList.contains('about-text')) {
                    const features = entry.target.querySelectorAll('.about-feature');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.style.opacity = '1';
                            feature.style.transform = 'translateY(0)';
                        }, index * 300);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Observe about features
    document.querySelectorAll('.about-feature').forEach(feature => {
        observer.observe(feature);
    });
    
    // Observe location details
    document.querySelectorAll('.detail-item').forEach(item => {
        observer.observe(item);
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    lastScroll = currentScroll;
});

// Form Submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = bookingForm.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Processing...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i><span>Reservation Sent!</span>';
            submitBtn.style.background = '#4CAF50';
            
            // Reset form
            setTimeout(() => {
                bookingForm.reset();
                submitBtn.innerHTML = `<span>${originalText}</span><i class="fas fa-paper-plane"></i>`;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Parallax Effect
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Parallax for room cards
        const roomCards = document.querySelectorAll('.room-card');
        roomCards.forEach((card, index) => {
            const speed = 0.1 * (index + 1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    
    // Add animation classes
    document.querySelectorAll('.about-feature, .detail-item').forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Room Card Hover Effect Enhancement
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.zIndex = '1';
    });
});

// Text animation on scroll
const textAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const words = text.textContent.split(' ');
            text.innerHTML = '';
            
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + ' ';
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                
                text.appendChild(span);
                
                setTimeout(() => {
                    span.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            textAnimationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe section headers
document.querySelectorAll('.section-title').forEach(title => {
    textAnimationObserver.observe(title);
});