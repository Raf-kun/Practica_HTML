// Эффект параллакса для фона
  // window.addEventListener('scroll', () => {
  //   const scroll = window.scrollY;
  //   document.body.style.backgroundPositionY = `${scroll * 0.5}px`; // скорость движения фона
  // });

  // Анимация появления при скролле
  const elements = document.querySelectorAll('.fade-in');

  function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerBottom) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Запускаем при загрузке


const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    toTopBtn.classList.remove('hidden');
  } else {
    toTopBtn.classList.add('hidden');
  }
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});