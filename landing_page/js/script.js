// Variabel global
let jadwalKelas = {};
let currentSlide = 0;
let totalSlides = 0;
let slidesContainer, prevBtn, nextBtn, dotsContainer;

// Memuat data jadwal dari file JSON
async function loadJadwalData() {
  try {
    const response = await fetch('landing_page/data/jadwal.json');
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

  // Toggle tim dan tutor mobile
  // const mobileTimTutorBtn = document.getElementById('mobile-timtutor-btn');
  // const mobileTimTutorMenu = document.getElementById('mobile-timtutor-menu');
  // const mobileTimTutorIcon = document.getElementById('mobile-timtutor-icon');

  // if (mobileTimTutorBtn && mobileTimTutorMenu) {
  //   mobileTimTutorBtn.addEventListener('click', function () {
  //     mobileTimTutorMenu.classList.toggle('hidden');
  //     if (mobileTimTutorIcon) {
  //       mobileTimTutorIcon.classList.toggle('rotate-180');
  //     }
  //   });
  // }

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

async function loadClasslistTemplate() {
  try {
    const response = await fetch('schedule-classlist.html');
    const template = await response.text();
    const modalContainer = document.getElementById('jadwal-classlist-modal');

    if (modalContainer) {
      modalContainer.innerHTML = template;
      console.log("✅ schedule-classlist.html berhasil dimuat");
      initializeClassListPopup();
    }
  } catch (error) {
    console.error('❌ Gagal memuat template popup daftar kelas:', error);
  }
}


function initializeClassListPopup() {
  const openBtns = [
    document.getElementById('open-classlist'),
    document.getElementById('open-classlist-mobile')
  ];

  const modalWrapper = document.querySelector('#jadwal-classlist-modal .modal-wrapper');
  const closeBtn = document.getElementById('classlist-close-btn');

  // buka popup dari tombol desktop + mobile
  openBtns.forEach(btn => {
    if (btn && modalWrapper) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modalWrapper.classList.remove('hidden');
      });
    }
  });

  if (closeBtn && modalWrapper) {
    closeBtn.addEventListener('click', () => {
      modalWrapper.classList.add('hidden');
    });
  }

  // Klik item kelas
  document.querySelectorAll('.kelas-item').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const kelas = this.getAttribute('data-kelas');

      // Tutup popup daftar kelas
      modalWrapper.classList.add('hidden');

      // Buka popup jadwal
      showJadwalModal(kelas);
    });
  });
}

// Fungsi untuk menampilkan modal jadwal
function showJadwalModal(kelas) {
  console.log("Kelas diklik:", kelas);
  console.log("Data dari JSON:", jadwalKelas[kelas]);

  const modal = document.getElementById('jadwal-modal');
  const modalTitle = document.getElementById('modal-title');
  const namaTutor = document.getElementById('nama-tutor');
  const scheduleContent = document.getElementById('schedule-content');

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

  // Tampilkan nama tutor jika ada
  // if (jadwalKelas[kelas] && jadwalKelas[kelas].Tutor) {
  //   namaTutor.textContent = `Tutor: ${jadwalKelas[kelas].Tutor}`;
  // } else {
  //   namaTutor.textContent = '';
  // }

  // // Hanya menampilkan hari yang memiliki jadwal
  // if (jadwalKelas[kelas]) {
  //   for (const [day, time] of Object.entries(jadwalKelas[kelas])) {
  //     if (day === "Tutor") continue;

  //     const dayElement = document.createElement('div');
  //     dayElement.className = 'schedule-day p-3 text-center min-w-[100px]';

  //     const dayName = document.createElement('div');
  //     dayName.className = 'font-bold text-blue-700 mb-2';
  //     dayName.textContent = day.toUpperCase();

  //     // Perbaikan: split yang benar untuk memisahkan waktu dan periode
  //     const timeParts = time.split(' ');
  //     const timeValue = document.createElement('div');
  //     timeValue.className = 'text-xl font-semibold text-gray-800 mb-1';
  //     timeValue.textContent = timeParts[0]; // Jam

  //     const timePeriod = document.createElement('div');
  //     timePeriod.className = 'time-badge text-sm inline-block';
  //     timePeriod.textContent = timeParts.slice(1).join(' ');

  //     dayElement.appendChild(dayName);
  //     dayElement.appendChild(timeValue);
  //     dayElement.appendChild(timePeriod);
  //     scheduleContent.appendChild(dayElement);
  //   }
  // }

  if (jadwalKelas[kelas]) {
    const dataKelas = jadwalKelas[kelas];

    // --- Container utama jadwal ---
    const container = document.createElement('div');
    container.className = 'flex flex-col items-center justify-center text-center space-y-4';

    // --- Bagian Tutor & Pengawas ---
    const infoContainer = document.createElement('div');
    infoContainer.className = 'text-gray-700 text-base';

    if (dataKelas["Tutor"]) {
      const tutorElement = document.createElement('div');
      tutorElement.textContent = `Tutor: ${dataKelas["Tutor"]}`;
      infoContainer.appendChild(tutorElement);
    }

    if (dataKelas["Pengawas"]) {
      const pengawasElement = document.createElement('div');
      pengawasElement.textContent = `Pengawas: ${dataKelas["Pengawas"]}`;
      infoContainer.appendChild(pengawasElement);
    }

    container.appendChild(infoContainer);

    // --- Bagian Hari dan Jam ---
    const scheduleContainer = document.createElement('div');
    scheduleContainer.className = 'flex flex-wrap justify-center gap-6';

    for (const [day, time] of Object.entries(dataKelas)) {
      if (["Tutor", "Pengawas", "Lokasi"].includes(day)) continue;

      const dayElement = document.createElement('div');
      dayElement.className = 'schedule-day text-center';

      const dayName = document.createElement('div');
      dayName.className = 'font-bold text-blue-700 mb-2';
      dayName.textContent = day.toUpperCase();

      const timeParts = time.split(' ');
      const timeValue = document.createElement('div');
      timeValue.className = 'text-2xl font-semibold text-gray-800 mb-1';
      timeValue.textContent = timeParts[0]; // jam

      const timePeriod = document.createElement('div');
      timePeriod.className = 'text-sm text-gray-600 italic';
      timePeriod.textContent = `(${timeParts.slice(1).join(' ')})`;

      dayElement.appendChild(dayName);
      dayElement.appendChild(timeValue);
      dayElement.appendChild(timePeriod);
      scheduleContainer.appendChild(dayElement);
    }

    container.appendChild(scheduleContainer);

    // --- Bagian Lokasi Ujian ---
    if (dataKelas["Lokasi"]) {
      const lokasiElement = document.createElement('div');
      lokasiElement.className = 'text-gray-700 mt-2';
      lokasiElement.textContent = `Lokasi Ujian: ${dataKelas["Lokasi"]}`;
      container.appendChild(lokasiElement);
    }

    // Tambahkan semua ke kontainer utama tampilan
    scheduleContent.appendChild(container);
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
  await loadPopupTemplate();        // popup jadwal
  await loadClasslistTemplate();    // popup daftar kelas
  initializeMobileMenu();
  initializeCarousel();

});


