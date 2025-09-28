document.addEventListener('DOMContentLoaded', function() {
            const tooltip = document.getElementById('tooltip');
            const ttTitle = document.getElementById('tt-title');
            const ttDesc = document.getElementById('tt-desc');
            const infoContent = document.getElementById('info-content');
            
            // Все интерактивные элементы на карте
            const interactiveElements = document.querySelectorAll('.region, .city');
            
            // Функция показа подсказки
            function showTooltip(event, element) {
                const name = element.getAttribute('data-name');
                const feature = element.getAttribute('data-feature');
                
                ttTitle.textContent = name;
                ttDesc.textContent = feature;
                
                tooltip.style.opacity = '1';
                tooltip.style.left = (event.pageX + 10) + 'px';
                tooltip.style.top = (event.pageY + 10) + 'px';
            }
            
            // Функция скрытия подсказки
            function hideTooltip() {
                tooltip.style.opacity = '0';
            }
            
            // Функция показа информации
            function showInfo(element) {
                const name = element.getAttribute('data-name');
                const feature = element.getAttribute('data-feature');
                const desc = element.getAttribute('data-desc') || 'Описание недоступно.';
                
                infoContent.innerHTML = `
                    <h4>${name}</h4>
                    <p><strong>Особенности:</strong> ${feature}</p>
                    <p>${desc}</p>
                `;
                
                // Сброс выделения у всех элементов
                interactiveElements.forEach(el => el.classList.remove('selected'));
                
                // Добавление выделения к выбранному элементу
                element.classList.add('selected');
            }
            
            // Добавление обработчиков событий для всех интерактивных элементов
            interactiveElements.forEach(element => {
                // События для мыши
                element.addEventListener('mouseenter', (e) => showTooltip(e, element));
                element.addEventListener('mousemove', (e) => {
                    tooltip.style.left = (e.pageX + 10) + 'px';
                    tooltip.style.top = (e.pageY + 10) + 'px';
                });
                element.addEventListener('mouseleave', hideTooltip);
                
                // События для клика
                element.addEventListener('click', () => showInfo(element));
                
                // События для клавиатуры
                element.addEventListener('focus', (e) => showTooltip(e, element));
                element.addEventListener('blur', hideTooltip);
                element.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        showInfo(element);
                    }
                });
            });
        });
