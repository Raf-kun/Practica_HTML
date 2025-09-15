        // Простая анимация появления элементов при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach(el => {
        el.style.opacity = '1';
    });
});

        // Параллакс эффект для фона
document.addEventListener('mousemove', function(e) {
    const banner = document.querySelector('.banner');
    const x = (window.innerWidth - e.pageX * 2) / 90;
    const y = (window.innerHeight - e.pageY * 2) / 90;
            
    banner.style.backgroundPosition = `${x}px ${y}px`;
});

        // Обработчики для кнопок
document.querySelector('.btn-primary').addEventListener('click', function() {
    alert('Открываем раздел с традициями Китая');
});

document.querySelector('.btn-secondary').addEventListener('click', function() {
    alert('Переходим к дополнительным материалам');
});
