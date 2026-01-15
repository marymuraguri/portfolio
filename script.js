// ======= PUBLIC KEY (EmailJS) =======
const EMAILJS_PUBLIC_KEY = "Sr4PLOq-XnehQCvvn";

// ======= Theme Toggle =======
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// ======= Smooth Scroll =======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ======= Skill Bars Animation on Scroll =======
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-bar span');

function animateSkills() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos) {
        skillBars.forEach(bar => {
            bar.style.width = bar.style.width; // Trigger CSS animation
        });
        window.removeEventListener('scroll', animateSkills); // Only animate once
    }
}

window.addEventListener('scroll', animateSkills);

// ======= Fade-In Sections =======
const sections = document.querySelectorAll('section');

function fadeInSections() {
    sections.forEach(section => {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if (sectionPos < screenPos) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
            section.style.transition = 'all 0.8s ease-out';
        }
    });
}

window.addEventListener('scroll', fadeInSections);

// ======= DOM Ready =======
document.addEventListener('DOMContentLoaded', () => {

    // Initial fade setup
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
    });
    fadeInSections();

    // ======= EmailJS Contact Form =======
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded');
        return;
    }

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop default GET submission

        emailjs.sendForm(
            'service_rhqujig',  // Your EmailJS service ID
            'template_r1itmnu',  // Your EmailJS template ID
            this
        ).then(() => {
            alert('Message sent successfully');
            form.reset(); // Clear the form after sending
        }, (error) => {
            console.error('EmailJS Error:', error);
            alert('Message failed. Please try again.');
        });
    });
});
