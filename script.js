// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const html = document.documentElement;

function toggleTheme() {
    const currentTheme = html.dataset.theme;
    html.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
    themeToggle.innerHTML = html.dataset.theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    mobileThemeToggle.innerHTML = html.dataset.theme === 'light' ? '<i class="fas fa-moon"></i> Toggle Dark Mode' : '<i class="fas fa-sun"></i> Toggle Light Mode';
    localStorage.setItem('theme', html.dataset.theme);
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Load saved theme
if (localStorage.getItem('theme')) {
    html.dataset.theme = localStorage.getItem('theme');
    themeToggle.innerHTML = html.dataset.theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    mobileThemeToggle.innerHTML = html.dataset.theme === 'light' ? '<i class="fas fa-moon"></i> Toggle Dark Mode' : '<i class="fas fa-sun"></i> Toggle Light Mode';
}

// Parallax Effect
const parallaxImages = document.querySelectorAll('.parallax-img');
window.addEventListener('scroll', () => {
    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        const offset = rect.top + scrollPosition;
        const speed = 0.3;
        const yPos = (scrollPosition - offset) * speed;
        img.style.transform = `translateY(${yPos}px)`;
    });
});

// Intersection Observer for Animations
const animateElements = document.querySelectorAll('.skill-card, .project-card, .contact-form, [class*="animate__"]');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (target.classList.contains('skill-card')) {
                target.classList.add('animate__animated', 'animate__fadeInUp');
            } else if (target.classList.contains('project-card')) {
                target.classList.add('animate__animated', 'animate__fadeInUp');
            } else if (target.classList.contains('contact-form')) {
                target.classList.add('animate__animated', 'animate__fadeInRight');
            }
            observer.unobserve(target);
        }
    });
}, { threshold: 0.2 });

animateElements.forEach(el => observer.observe(el));

// Project Modal
const modal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal');
const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        slide.classList.toggle('hidden', i !== index);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    showSlide(0);
    currentSlide = 0;
    modal.focus();
}

function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
});

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

prevSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextSlideBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.dataset.slide);
        showSlide(currentSlide);
    });
});

// Keyboard Navigation
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    if (e.key === 'ArrowRight') {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        alert('Form submitted successfully! (Placeholder for actual submission logic)');
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});