function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'petal';
            
            // Случайная позиция по горизонтали
            petal.style.left = Math.random() * 100 + '%';
            
            // Случайный размер
            const size = Math.random() * 15 + 10;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            
            // Случайная длительность анимации (скорость падения)
            const duration = Math.random() * 5 + 5;
            petal.style.animationDuration = duration + 's';
            
            // Случайная задержка начала
            // petal.style.animationDelay = Math.random() * 5 + 's';
            
            // Случайный цвет лепестка
            const colors = [
                'radial-gradient(ellipse at center, #ff69b4 0%, #ff1493 100%)',
                'radial-gradient(ellipse at center, #ffb6c1 0%, #ff69b4 100%)',
                'radial-gradient(ellipse at center, #ffc0cb 0%, #ffb6c1 100%)',
                'radial-gradient(ellipse at center, #ff85c1 0%, #ff1493 100%)'
            ];
            petal.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            document.body.appendChild(petal);
            
            // Удаление лепестка после завершения анимации
            setTimeout(() => {
                petal.remove();
            }, (duration + 5) * 1000);
        }

        // Создание начальных лепестков
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createPetal(), i * 200);
        }

        // Постоянное добавление новых лепестков
        setInterval(createPetal, 300);