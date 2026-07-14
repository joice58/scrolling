// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Variables for managing the slider state
let currentIndex = 0;
let isAnimating = false;
const slides = gsap.utils.toArray('.slide');

// Set initial states for elements
gsap.set(".slide[data-index='01']", { yPercent: 0, scale: 1, opacity: 1 });
gsap.set(".slide[data-index='02']", { yPercent: 100, scale: 1, opacity: 1 });
gsap.set(".slide[data-index='03']", { yPercent: 100, scale: 1, opacity: 1 });

// Categories staggered entrance defaults
slides.forEach((slide, idx) => {
  if (idx > 0) {
    gsap.set(slide.querySelector('.category'), { y: 40, opacity: 0 });
    gsap.set(slide.querySelector('h2'), { y: 60, opacity: 0 });
    gsap.set(slide.querySelector('.slide-desc'), { y: 80, opacity: 0 });
    gsap.set(slide.querySelector('.btn-learn'), { y: 100, opacity: 0 });
  } else {
    gsap.set(slide.querySelector('.category'), { y: 0, opacity: 1 });
    gsap.set(slide.querySelector('h2'), { y: 0, opacity: 1 });
    gsap.set(slide.querySelector('.slide-desc'), { y: 0, opacity: 1 });
    gsap.set(slide.querySelector('.btn-learn'), { y: 0, opacity: 1 });
  }
});

// Function to handle programmatic transitions
const goToSlide = (index) => {
  if (index < 0 || index >= slides.length || isAnimating) return;
  isAnimating = true;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[index];
  const direction = index > currentIndex ? "down" : "up";

  const tl = gsap.timeline({
    onComplete: () => {
      isAnimating = false;
      currentIndex = index;
    }
  });

  if (direction === "down") {
    // Current slide moves up slightly, scales down and fades out (3D perspective stack)
    tl.to(currentSlide, { yPercent: -15, scale: 0.93, opacity: 0.7, duration: 1.2, ease: "power2.inOut" }, 0);
    
    tl.to(currentSlide.querySelector('.category'), { y: -30, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('h2'), { y: -50, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('.slide-desc'), { y: -70, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('.btn-learn'), { y: -90, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);

    // Next slide enters from bottom at full scale
    tl.fromTo(nextSlide, { yPercent: 100, scale: 1, opacity: 1 }, { yPercent: 0, duration: 1.2, ease: "power2.inOut" }, 0);
    tl.fromTo(nextSlide.querySelector('.category'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
    tl.fromTo(nextSlide.querySelector('h2'), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.25);
    tl.fromTo(nextSlide.querySelector('.slide-desc'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3);
    tl.fromTo(nextSlide.querySelector('.btn-learn'), { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.35);
  } else {
    // Current slide moves down out of view
    tl.to(currentSlide, { yPercent: 100, duration: 1.2, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('.category'), { y: 40, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('h2'), { y: 60, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('.slide-desc'), { y: 80, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);
    tl.to(currentSlide.querySelector('.btn-learn'), { y: 100, opacity: 0, duration: 0.8, ease: "power2.inOut" }, 0);

    // Next slide returns from -15% back to 0%, scaling back up to normal
    tl.to(nextSlide, { yPercent: 0, scale: 1, opacity: 1, duration: 1.2, ease: "power2.inOut" }, 0);
    
    tl.to(nextSlide.querySelector('.category'), { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.2);
    tl.to(nextSlide.querySelector('h2'), { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.25);
    tl.to(nextSlide.querySelector('.slide-desc'), { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3);
    tl.to(nextSlide.querySelector('.btn-learn'), { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.35);
  }
};

// Setup ScrollTrigger Observer to catch scroll/touch gestures
const initScrollObserver = () => {
  ScrollTrigger.observe({
    target: window,
    type: "wheel,touch",
    wheelSpeed: 1,
    onUp: () => {
      goToSlide(currentIndex - 1);
    },
    onDown: () => {
      goToSlide(currentIndex + 1);
    },
    tolerance: 10,
    preventDefault: true
  });
};

// Run initialization on DOM load
window.addEventListener('DOMContentLoaded', () => {
  initScrollObserver();
});
