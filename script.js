document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a, .hero-buttons a');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const closeLightbox = document.querySelector('.lightbox .close');
  const prevBtn = document.querySelector('.lightbox .prev');
  const nextBtn = document.querySelector('.lightbox .next');
  const backToTop = document.querySelector('.back-to-top');
  const form = document.getElementById('inquiryForm');
  const successMessage = document.querySelector('.form-success');
  const year = document.getElementById('year');
  let currentIndex = 0;

  const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

  const smoothScrollTo = target => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      smoothScrollTo(href);
      mobileMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hide', !match);
      });
    });
  });

  const openLightbox = index => {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightbox.classList.add('active');
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const index = Number(item.dataset.index);
      openLightbox(index);
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') lightbox.classList.remove('active');
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) return;
    if (!emailValid.test(email.value.trim())) {
      email.focus();
      return;
    }
    successMessage.style.display = 'block';
    form.reset();
    setTimeout(() => successMessage.style.display = 'none', 4000);
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  if (year) year.textContent = new Date().getFullYear();
});
