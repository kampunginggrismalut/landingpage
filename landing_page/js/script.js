// Variabel global
let jadwalKelas = {};
let currentSlide = 0;
let totalSlides = 0;
let slidesContainer, prevBtn, nextBtn, dotsContainer;

// Memuat data jadwal dari file JSON
async function loadJadwalData() {
  try {
    const response = await fetch('data/jadwal.json');
    jadwalKelas = await response.json();
    console.log('Data jadwal berhasil dimuat', jadwalKelas);
  } catch (error) {
    console.error('Gagal memuat data jadwal:', error);
  }
}

// Memuat template popup dari file HTML
async function loadPopupTemplate() {
  try {
    const response = await fetch('schedule-popup.html');
    const template = await response.text();
    const modalContainer = document.getElementById('jadwal-modal');

    if (modalContainer) {
      modalContainer.innerHTML = template;
      initializeModalEvents();
    }
  } catch (error) {
    console.error('Gagal memuat template popup:', error);
  }
}

// Inisialisasi event modal
function initializeModalEvents() {
  const modal = document.getElementById('jadwal-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', hideModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        hideModal();
      }
    });
  }
}

// Inisialisasi dropdown desktop
function initializeDesktopDropdown() {
  const dropdownButton = document.querySelector('[data-dropdown-toggle="dropdownHover"]');
  const dropdownMenu = document.getElementById('dropdownHover');

  if (dropdownButton && dropdownMenu) {
    // Handler untuk hover (desktop)
    dropdownButton.addEventListener('mouseenter', function () {
      dropdownMenu.classList.remove('hidden');
    });

    dropdownButton.addEventListener('mouseleave', function () {
      setTimeout(() => {
        dropdownMenu.classList.add('hidden');
      }, 300);
    });

    dropdownMenu.addEventListener('mouseenter', function () {
      dropdownMenu.classList.remove('hidden');
    });

    dropdownMenu.addEventListener('mouseleave', function () {
      setTimeout(() => {
        dropdownMenu.classList.add('hidden');
      }, 300);
    });
  }
}

// Mobile menu functionality
function initializeMobileMenu() {
  // Toggle mobile menu
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburgerMenu && mobileMenu) {
    hamburgerMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Toggle student menu in mobile
  const mobileStudentBtn = document.getElementById('mobile-student-btn');
  const mobileStudentMenu = document.getElementById('mobile-student-menu');
  const mobileStudentIcon = document.getElementById('mobile-student-icon');

  if (mobileStudentBtn && mobileStudentMenu) {
    mobileStudentBtn.addEventListener('click', function () {
      mobileStudentMenu.classList.toggle('hidden');
      if (mobileStudentIcon) {
        mobileStudentIcon.classList.toggle('rotate-180');
      }
    });
  }

  // Toggle jadwal menu in mobile
  const mobileJadwalBtn = document.getElementById('mobile-jadwal-btn');
  const mobileJadwalMenu = document.getElementById('mobile-jadwal-menu');
  const mobileJadwalIcon = document.getElementById('mobile-jadwal-icon');

  if (mobileJadwalBtn && mobileJadwalMenu) {
    mobileJadwalBtn.addEventListener('click', function () {
      mobileJadwalMenu.classList.toggle('hidden');
      if (mobileJadwalIcon) {
        mobileJadwalIcon.classList.toggle('rotate-180');
      }
    });
  }
}

// Event listener untuk semua link jadwal kelas
function initializeJadwalLinks() {
  document.querySelectorAll('.jadwal-kelas').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const kelas = this.getAttribute('data-kelas');
      showJadwalModal(kelas);
    });
  });
  // Handler untuk mobile
  document.querySelectorAll('#mobile-jadwal-menu .jadwal-kelas').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const kelas = this.getAttribute('data-kelas');
      showJadwalModal(kelas);

      // Tutup menu mobile setelah memilih
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
}

// Fungsi untuk menampilkan modal jadwal
function showJadwalModal(kelas) {
  const modal = document.getElementById('jadwal-modal');
  const modalTitle = document.getElementById('modal-title');
  const scheduleContent = document.querySelector('#schedule-content > div');

  if (!modal || !modalTitle || !scheduleContent) {
    console.error('Elemen modal tidak ditemukan');
    // Coba muat ulang template jika modal belum dimuat
    loadPopupTemplate().then(() => {
      // Coba lagi setelah template dimuat
      setTimeout(() => showJadwalModal(kelas), 100);
    });
    return;
  }

  modalTitle.textContent = kelas.toUpperCase();
  scheduleContent.innerHTML = '';

  // Hanya menampilkan hari yang memiliki jadwal
  if (jadwalKelas[kelas]) {
    for (const [day, time] of Object.entries(jadwalKelas[kelas])) {
      const dayElement = document.createElement('div');
      dayElement.className = 'schedule-day p-3 text-center min-w-[100px]';

      const dayName = document.createElement('div');
      dayName.className = 'font-bold text-blue-700 mb-2';
      dayName.textContent = day.toUpperCase();

      // Perbaikan: split yang benar untuk memisahkan waktu dan periode
      const timeParts = time.split(' ');
      const timeValue = document.createElement('div');
      timeValue.className = 'text-xl font-semibold text-gray-800 mb-1';
      timeValue.textContent = timeParts[0]; // Jam

      const timePeriod = document.createElement('div');
      timePeriod.className = 'time-badge text-sm inline-block';
      timePeriod.textContent = timeParts.slice(1).join(' ');

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

  // Juga sembunyikan menu mobile jika terbuka
  // const mobileMenu = document.getElementById('mobile-menu');
  // if (mobileMenu) {
  //   mobileMenu.classList.add('hidden');
  // }
}

function hideModal() {
  const modal = document.getElementById('jadwal-modal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

// Fungsi Carousel
function initializeCarousel() {
  slidesContainer = document.getElementById('slides-container');
  prevBtn = document.getElementById('prev-btn');
  nextBtn = document.getElementById('next-btn');
  dotsContainer = document.getElementById('dots-container');

  const slides = document.querySelectorAll('[data-carousel] > div > div');
  totalSlides = slides.length;

  // Hanya inisialisasi carousel jika elemennya ada
  if (slidesContainer && prevBtn && nextBtn && dotsContainer && totalSlides > 0) {
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
  }
}

// Inisialisasi saat dokumen dimuat
document.addEventListener('DOMContentLoaded', async function () {
  // Inisialisasi Feather Icons (jika digunakan)
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  await loadJadwalData();
  await loadPopupTemplate();
  initializeMobileMenu();
  initializeJadwalLinks();
  initializeCarousel();
});