
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
    });
  }

  // Fungsi modal untuk pop up
  const modal = document.getElementById('jadwal-modal');
  const modalTitle = document.getElementById('modal-title');
  const scheduleContent = document.querySelector('#schedule-content > div');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.jadwal-kelas').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const kelas = this.getAttribute('data-kelas');
      showJadwalModal(kelas);
    });
  });

  modalCloseBtn.addEventListener('click', hideModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      hideModal();
    }
  });

  // Fungsi untuk menamppilkan modal jadwal
  function showJadwalModal(kelas) {
    modalTitle.textContent = kelas.toUpperCase();
    scheduleContent.innerHTML = '';

    // cukup tampilkan hari yang memiliki jadwal
    if (jadwalKelas[kelas]) {
      for (const [day, time] of Object.entries(jadwalKelas[kelas])) {

        const dayElement = document.createElement('div');
        dayElement.className = 'schedule-day p-3 text-center';

        const dayName = document.createElement('div');
        dayName.className = 'font-bold text-blue-700 mb-2';
        dayName.textContent = day.toUpperCase();

        const timeParts = time.split('');
        const timeValue = document.createElement('div');
        timeValue.className = 'text-xl font-semibold text-gray-800 mb-1';
        timeValue.textContent = timeParts[0];

        const timePeriod = document.createElement('div');
        timePeriod.className = 'time-badge text-sm inline-block';
        timePeriod.textContent = timeParts[1];

        dayElement.appendChild(dayName);
        dayElement.appendChild(timeValue);
        dayElement.appendChild(timePeriod);
        scheduleContent.appendChild(dayElement);
      }
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);

    mobileMenu.classList.add('hidden');
  }

  function hideModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
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


