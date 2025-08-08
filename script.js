document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Dark/Light mode toggle
  const toggle = document.getElementById('mode-toggle');
  const body = document.body;
  
  // Check for saved user preference
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    body.classList.add(currentTheme);
    updateThemeVars(currentTheme);
    toggle.textContent = currentTheme === 'light-mode' ? '🌙' : '☀️';
  }

  toggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    const theme = body.classList.contains('light-mode') ? 'light-mode' : '';
    localStorage.setItem('theme', theme);
    updateThemeVars(theme);
    
    // Change toggle icon
    toggle.textContent = theme === 'light-mode' ? '🌙' : '☀️';
  });

  function updateThemeVars(theme) {
    if (theme === 'light-mode') {
      document.documentElement.style.setProperty('--bg', '#f9f9f9');
      document.documentElement.style.setProperty('--text', '#333');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--bg', '#0a0a0a');
      document.documentElement.style.setProperty('--text', '#f5f5f5');
      document.documentElement.style.setProperty('--card-bg', '#1a1a1a');
    }
  }

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  const links = document.querySelectorAll('a, button, .card, .skill-item, .service-card, .info-card');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.5,
      ease: 'power1.out'
    });
  });
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorFollower.classList.add('cursor-follower-active');
    });
    
    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorFollower.classList.remove('cursor-follower-active');
    });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate sections on scroll
  gsap.utils.toArray('.section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out'
    });
  });
  
  // Animate cards individually
  gsap.utils.toArray('.card, .service-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Typing animation
  const typingText = document.querySelector('.typing-text');
  const texts = ["Web Developer", "Problem Solver", "Tech Enthusiast", "ECE Student", "Coding Lover"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isEnd = true;
      isDeleting = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, 500);
    } else {
      const speed = isDeleting ? 100 : 150;
      setTimeout(type, speed);
    }
  }

  // Start typing animation after a delay
  setTimeout(type, 1000);

  // Initialize particles.js if available
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ff2e4d"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ff2e4d",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  }

  // Add scroll event for header shadow
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
  
  // Download CV button
  document.getElementById('download-resume').addEventListener('click', function(e) {
    e.preventDefault();
    // Replace with actual CV download link
    alert('Download functionality will be added when CV is ready!');
  });
  
  // Contact form submission
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically send the form data to a server
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
});
