// JavaScript Document

/*

TemplateMo 596 Electric Xtra

https://templatemo.com/tm-596-electric-xtra

*/

document.addEventListener('DOMContentLoaded', function() {
    // --- Floating particles (Existing code) ---
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return; // Exit if container not found
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            
            // Randomly assign orange or blue color
            if (Math.random() > 0.5) {
                // Using a custom property for consistency, though direct background also works
                particle.style.setProperty('--particle-color', '#00B2FF'); 
                // The actual background is set by .particle::before in CSS, if it uses --particle-color
                // If not, ensure the CSS correctly applies the color based on some other attribute or directly
            } else {
                 particle.style.setProperty('--particle-color', '#FF5E00');
            }
            
            particlesContainer.appendChild(particle);
        }
    }
    createParticles(); // Call on DOMContentLoaded

    // --- Mobile menu toggle (Existing code) ---
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Active navigation highlighting (Existing code) ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                const currentNav = document.querySelector(`.nav-link[href="#${section.id}"]`);
                if (currentNav) currentNav.classList.add('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        updateActiveNav();
    });

    // Initial active nav update
    updateActiveNav();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu after clicking a link if it's open
            if (navLinks && menuToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // --- Feature tabs functionality (Existing code) ---
    const tabs = document.querySelectorAll('.tab-item');
    const panels = document.querySelectorAll('.content-panel');

    if (tabs.length > 0 && panels.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                
                // Remove active class from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding panel
                tab.classList.add('active');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
        // Set the first tab as active by default if none are
        if (!document.querySelector('.tab-item.active')) {
            tabs[0].classList.add('active');
            const firstPanelId = tabs[0].getAttribute('data-tab');
            const firstPanel = document.getElementById(firstPanelId);
            if (firstPanel) {
                firstPanel.classList.add('active');
            }
        }
    }

    // --- Form submission (Existing code) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Message sent! We\'ll get back to you soon.');
            this.reset();
        });
    }


    // --- Text rotation with character animation (Existing code) ---
    const textSets = document.querySelectorAll('.text-rotator .text-set');
    let currentIndex = 0;
    let isAnimating = false;

    function wrapTextInSpans(element) {
        const text = element.textContent;
        element.innerHTML = text.split('').map((char, i) => 
            `<span class="char" style="animation-delay: ${i * 0.05}s">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
    }

    function animateTextIn(textSet) {
        const glitchText = textSet.querySelector('.glitch-text');
        const subtitle = textSet.querySelector('.subtitle');
        
        if (glitchText) {
            wrapTextInSpans(glitchText);
            glitchText.setAttribute('data-text', glitchText.textContent);
        }
        
        if (subtitle) {
            setTimeout(() => {
                subtitle.classList.add('visible');
            }, 800);
        }
    }

    function animateTextOut(textSet) {
        const chars = textSet.querySelectorAll('.char');
        const subtitle = textSet.querySelector('.subtitle');
        
        chars.forEach((char, i) => {
            char.style.animationDelay = `${i * 0.02}s`;
            char.classList.add('out');
        });
        
        if (subtitle) {
            subtitle.classList.remove('visible');
        }
    }

    function rotateText() {
        if (isAnimating || textSets.length < 2) return;
        isAnimating = true;

        const currentSet = textSets[currentIndex];
        const nextIndex = (currentIndex + 1) % textSets.length;
        const nextSet = textSets[nextIndex];

        animateTextOut(currentSet);

        setTimeout(() => {
            currentSet.classList.remove('active');
            nextSet.classList.add('active');
            // Remove 'out' class from new chars to prepare for 'in' animation
            nextSet.querySelectorAll('.char').forEach(char => char.classList.remove('out'));
            animateTextIn(nextSet);
            
            currentIndex = nextIndex;
            isAnimating = false;
        }, 600);
    }

    if (textSets.length > 0) {
        // Initialize first text set
        textSets[0].classList.add('active');
        animateTextIn(textSets[0]);

        // Start rotation after initial display
        setTimeout(() => {
            if (textSets.length > 1) { // Only rotate if there's more than one text set
                setInterval(rotateText, 5000); // Change every 5 seconds
            }
        }, 4000);

        // Add random glitch effect
        setInterval(() => {
            const activeGlitchText = document.querySelector('.text-set.active .glitch-text');
            if (activeGlitchText && Math.random() > 0.95) { // 5% chance to glitch
                activeGlitchText.style.animation = 'none';
                setTimeout(() => {
                    activeGlitchText.style.animation = ''; // Reapply original glitch animation
                }, 200);
            }
        }, 3000);
    }

    // --- FAQ Accordion Logic (Kumpirmadong gumagana) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // Ang <p class="faq-answer"> element
            
            // Toggle ang 'active' class sa question para paikutin ang arrow
            question.classList.toggle('active');

            // Toggle ang 'open' class para sa sagot at i-manage ang max-height
            if (answer.classList.contains('open')) {
                answer.style.maxHeight = null; // I-collapse ito
                answer.classList.remove('open');
            } else {
                // Isara ang ibang bukas na sagot kung gusto mo lang ng isa na bukas sa isang pagkakataon
                document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
                    openAnswer.style.maxHeight = null;
                    openAnswer.classList.remove('open');
                    // Tanggalin din ang 'active' mula sa kaukulang tanong
                    openAnswer.previousElementSibling.classList.remove('active');
                });

                // Palawakin ang kinlik na sagot
                answer.style.maxHeight = answer.scrollHeight + 'px'; // Itakda ang max-height sa aktwal na scrollHeight nito
                answer.classList.add('open');
            }
        });
    });
});

// --- Function to play video (Existing code, ensure your video elements have these IDs) ---
function playVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        video.style.display = 'block';
        video.play();
    }
}