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
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
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
            const width = bar.style.width; // Already set in HTML inline
            bar.style.width = width;
        });
        window.removeEventListener('scroll', animateSkills); // Animate only once
    }
}

window.addEventListener('scroll', animateSkills);

// ======= Optional: Simple Fade-In for Sections =======
const sections = document.querySelectorAll('section');

function fadeInSections() {
    sections.forEach(section => {
        const sectionPos = section.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;

        if(sectionPos < screenPos) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
            section.style.transition = 'all 0.8s ease-out';
        }
    });
}

window.addEventListener('scroll', fadeInSections);

// ======= Initial Setup =======
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for sections
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
    });

    // Trigger fade-in for visible sections
    fadeInSections();
});

// ======= EmailJS Contact Form Handler =======
// ======= EmailJS Contact Form =======
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        emailjs.sendForm(
            'service_rhqujig',       // Your Service ID
            'template_r1itmnu',      // Your Template ID
            form,                    // The form element
            'Sr4PLOq-XnehQCvvn'      // Your Public Key
        )
        .then(() => {
            alert('Message sent successfully!');
            form.reset();
        }, (error) => {
            alert('Failed to send message. Please try again.');
            console.error(error);
        });
    });
});
