// //Toggle class active
// const navbarNav = document.querySelector(".navbar-nav");

// // ketika klik hamburger menu tampilkan side bar
// document.querySelector("#hamburger-menu").onclick = () => {
//   navbarNav.classList.toggle("active");
// };

// // klik di luar side bar untuk menutup nav
// const hamburger = document.querySelector("#hamburger-menu");
// document.addEventListener("click", function (e) {
//   if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
//     navbarNav.classList.remove("active");
//   }
// });

// // SLIDESHOW
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides((slideIndex += n));
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides((slideIndex = n));
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = slides.length;
//   }
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   dots[slideIndex - 1].className += " active";
// }
feather.replace();

// Mobile Menu Toggle
document.getElementById('hamburger-menu').addEventListener('click', function () {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-menu');

  if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
    mobileMenu.classList.add('hidden');
  }
});

// Dropdown student untuk mobile
const studentBtn = document.getElementById("mobile-student-btn");
const studentMenu = document.getElementById("mobile-student-menu");
const studentIcon = document.getElementById("mobile-student-icon");

if (studentBtn) {
  studentBtn.addEventListener("click", () => {
    studentMenu.classList.toggle("hidden");
    studentIcon.classList.toggle("rotate-180"); // animasi panah
  });
}

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

