document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ =====
    const cards = document.querySelectorAll('.fact-card');
    const finalQuote = document.querySelector('.final-quote');
    const scrollBtn = document.getElementById('scrollTopBtn');

    // Функция проверки видимости элемента
    function isElementInViewport(el, offset = 100) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - offset;
    }

    // Функция активации карточек
    function activateCards() {
        cards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('visible')) {
                card.classList.add('visible');
            }
        });

        // Показываем цитату, когда последняя карточка видна
        const lastCard = cards[cards.length - 1];
        if (lastCard && isElementInViewport(lastCard, 50) && !finalQuote.classList.contains('visible')) {
            finalQuote.classList.add('visible');
        }
    }

    // Запускаем при загрузке (некоторые карточки уже видны)
    setTimeout(activateCards, 300);

    // Запускаем при скролле
    window.addEventListener('scroll', function() {
        activateCards();
        toggleScrollButton();
    });

    // Также при изменении размера окна
    window.addEventListener('resize', activateCards);

    // ===== 2. КНОПКА НАВЕРХ (появляется после скролла) =====
    function toggleScrollButton() {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== 3. ПАРАЛЛАКС-ЭФФЕКТ ДЛЯ ФОНОВЫХ КРУГОВ =====
    const circles = document.querySelectorAll('.bg-circle');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        circles.forEach((circle, index) => {
            const speed = 0.03 + (index * 0.02);
            circle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ===== 4. ПРИВЕТСТВИЕ =====
    console.log('🦊 Сайт с лисьими фактами для Рины!');
    console.log('💖 С днём рождения!');

    // ===== 5. НЕБОЛЬШОЙ СЮРПРИЗ — ПОЯВЛЕНИЕ ЭМОДЗИ ПРИ КЛИКЕ =====
    document.querySelectorAll('.fact-card').forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Создаём эмодзи в месте клика
            const emojis = ['🦊', '✨', '💖', '🌟', '🌸', '🦊', '❤️', '🎀'];
            const emoji = document.createElement('span');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = (e.clientX - 20) + 'px';
            emoji.style.top = (e.clientY - 20) + 'px';
            emoji.style.fontSize = '2.5rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '9999';
            emoji.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
            emoji.style.opacity = '1';
            document.body.appendChild(emoji);

            // Анимация разлёта
            requestAnimationFrame(() => {
                emoji.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${-150 - Math.random() * 100}px) scale(1.8) rotate(${(Math.random() - 0.5) * 60}deg)`;
                emoji.style.opacity = '0';
            });

            // Удаляем через секунду
            setTimeout(() => {
                emoji.remove();
            }, 1500);
        });
    });

});