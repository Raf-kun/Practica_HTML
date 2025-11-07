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