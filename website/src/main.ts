import '../style.css'

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const elementVisible = 150;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
};

// Initial check
revealOnScroll();

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Add simple parallax effect to background blobs
window.addEventListener('mousemove', (e) => {
  const blob1 = document.querySelector('.blob-1') as HTMLElement;
  const blob2 = document.querySelector('.blob-2') as HTMLElement;
  
  if (blob1 && blob2) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blob1.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    blob2.style.transform = `translate(${x * -30}px, ${y * -30}px)`;
  }
});
