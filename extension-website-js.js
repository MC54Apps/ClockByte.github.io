// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Accounting for header height
                behavior: 'smooth'
            });
        });
    });
    
    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-links a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    });
    
    // Add CSS for active class
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: var(--primary-color);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
});

// Animate elements on scroll
const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .testimonial-card, .faq-item');

// Create Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Add CSS for animations
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .feature-card, .step, .testimonial-card, .faq-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .feature-card.visible, .step.visible, .testimonial-card.visible, .faq-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyle);

// Observe each element
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Chrome Web Store badge hover effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#3367d6'; // Darker blue on hover
    });
    
    ctaButton.addEventListener('mouseout', function() {
        this.style.backgroundColor = 'var(--primary-color)'; // Back to original color
    });
}
