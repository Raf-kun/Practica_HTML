document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const reviewInput = document.getElementById('reviewInput');
    const submitButton = document.getElementById('submitReview');
    const reviewMessage = document.getElementById('reviewMessage');
    const reviewsContainer = document.createElement('div'); // Контейнер для отзывов
    reviewsContainer.id = 'reviewsContainer';
    document.querySelector('.review-section').appendChild(reviewsContainer);

    // Загрузка отзывов при загрузке страницы
    loadReviews();

    // Обработчик отправки отзыва
    submitButton.addEventListener('click', async function() {
        const reviewText = reviewInput.value.trim();
        
        if (!reviewText) {
            reviewMessage.textContent = 'Пожалуйста, введите отзыв!';
            reviewMessage.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('/reviews/submit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'), // Для CSRF защиты
                },
                body: JSON.stringify({ review: reviewText }),
            });

            const data = await response.json();
            
            if (data.status === 'success') {
                reviewMessage.textContent = 'Отзыв успешно отправлен!';
                reviewMessage.style.color = 'green';
                reviewInput.value = '';
                loadReviews(); // Обновляем список отзывов
            } else {
                reviewMessage.textContent = 'Ошибка: ' + data.message;
                reviewMessage.style.color = 'red';
            }
        } catch (error) {
            reviewMessage.textContent = 'Ошибка соединения: ' + error.message;
            reviewMessage.style.color = 'red';
        }
    });

    // Функция загрузки отзывов
    async function loadReviews() {
        try {
            const response = await fetch('/reviews/get/');
            const data = await response.json();
            
            reviewsContainer.innerHTML = '<h3>Последние отзывы:</h3>';
            
            if (data.reviews.length > 0) {
                const ul = document.createElement('ul');
                ul.style.listStyleType = 'none';
                ul.style.padding = '0';
                
                data.reviews.forEach(review => {
                    const li = document.createElement('li');
                    li.style.marginBottom = '10px';
                    li.style.padding = '10px';
                    li.style.backgroundColor = '#f8f9fa';
                    li.style.borderRadius = '5px';
                    
                    li.innerHTML = `
                        <p><strong>${review.text}</strong></p>
                        <small style="color: #6c757d;">${review.date}</small>
                    `;
                    ul.appendChild(li);
                });
                
                reviewsContainer.appendChild(ul);
            } else {
                reviewsContainer.innerHTML += '<p>Пока нет отзывов. Будьте первым!</p>';
            }
        } catch (error) {
            console.error('Ошибка загрузки отзывов:', error);
        }
    }

    // Функция для получения CSRF-токена (если используете CSRF защиту)
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
