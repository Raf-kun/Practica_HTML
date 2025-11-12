// Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Анимация при прокрутке
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.tech-card, .city-card, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });

        // Auto-scroll для секции городов
        const citiesContainer = document.querySelector('.cities-container');
        let scrollDirection = 1;
        let autoScrollInterval;

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (citiesContainer) {
                    citiesContainer.scrollLeft += scrollDirection * 2;
                    
                    if (citiesContainer.scrollLeft >= citiesContainer.scrollWidth - citiesContainer.clientWidth) {
                        scrollDirection = -1;
                    } else if (citiesContainer.scrollLeft <= 0) {
                        scrollDirection = 1;
                    }
                }
            }, 30);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        if (citiesContainer) {
            citiesContainer.addEventListener('mouseenter', stopAutoScroll);
        }