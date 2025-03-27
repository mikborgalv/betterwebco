document.addEventListener('DOMContentLoaded', function() {
    // Load hero image
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
      heroBg.onload = function() {
        this.classList.add('loaded');
      };
      
      // If image is cached
      if (heroBg.complete) {
        heroBg.classList.add('loaded');
      }
    }
    
    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('.animate__animated');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
          entry.target.classList.add(entry.target.dataset.animation);
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => observer.observe(el));
  });