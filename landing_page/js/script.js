
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  feather.replace();

  // Mobile menu
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburgerMenu.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });

  // Student menu (mobile)
  const mobileStudentBtn = document.getElementById('mobile-student-btn');
  const mobileStudentMenu = document.getElementById('mobile-student-menu');
  const mobileStudentIcon = document.getElementById('mobile-student-icon');

  mobileStudentBtn.addEventListener('click', function () {
    mobileStudentMenu.classList.toggle('hidden');
    mobileStudentIcon.classList.toggle('rotate-180');
  });

  const mobileJadwalBtn = document.getElementById('mobile-jadwal-btn');
  const mobileJadwalMenu = document.getElementById('mobile-jadwal-menu');
  const mobileJadwalIcon = document.getElementById('mobile-jadwal-icon');

  if (mobileJadwalBtn) {
    mobileJadwalBtn.addEventListener('click', function () {
      mobileJadwalMenu.classList.toggle('hidden');
      mobileJadwalIcon.classList.toggle('rotate-180');
    })
  }
});

//Carousel
document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('slides-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('dots-container');

  let currentSlide = 0;
  const slides = document.querySelectorAll('[data-carousel] > div > div');
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full ${index === 0 ? 'bg-white' : 'bg-gray-400'}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Navigation functions
  function goToSlide(index) {
    currentSlide = index;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    document.querySelectorAll('#dots-container button').forEach((dot, i) => {
      dot.className = `w-3 h-3 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-gray-400'}`;
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Auto-play (optional)
  // setInterval(nextSlide, 5000);
});


