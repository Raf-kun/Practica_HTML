const headers = document.querySelectorAll('.timeline-menu h2');
const texts = document.querySelectorAll('.timeline-text');

headers.forEach(header => {
    header.addEventListener('click', () => {
        // Снимаем активность со всех заголовков
        headers.forEach(h => h.classList.remove('active'));
        header.classList.add('active');

        // Показываем соответствующий текст, скрываем остальные
        const targetId = header.dataset.target;
        texts.forEach(t => {
            if(t.id === targetId) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });
    });
});

// Опционально: показываем первый блок при загрузке
headers[0].classList.add('active');
texts[0].classList.add('active');