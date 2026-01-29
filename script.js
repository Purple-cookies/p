// Основной скрипт для сайта "День Спасибо"

document.addEventListener('DOMContentLoaded', function() {
    // Элементы навигации
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Навигация по разделам
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все разделы
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Показываем соответствующий раздел
            const targetId = this.id.replace('nav-', '') + '-section';
            document.getElementById(targetId).classList.add('active');
        });
    });
    
    // Обработчики для кнопок "Узнать больше"
    const infoButtons = document.querySelectorAll('.info-btn');
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            const infoElement = document.getElementById(`${section}-info`);
            
            // Переключаем видимость дополнительной информации
            if (infoElement.classList.contains('active')) {
                infoElement.classList.remove('active');
                this.textContent = this.textContent.replace('Скрыть', 'Узнать больше');
            } else {
                infoElement.classList.add('active');
                this.textContent = this.textContent.replace('Узнать больше', 'Скрыть');
                
                // Для кнопки "Как сказать спасибо на разных языках"
                if (section === 'languages') {
                    this.textContent = 'Скрыть языки';
                }
            }
        });
    });
    
    // Кнопка "Посмотреть страны-участницы"
    const worldMapBtn = document.getElementById('world-map-btn');
    if (worldMapBtn) {
        worldMapBtn.addEventListener('click', function() {
            const countriesInfo = document.getElementById('countries-info');
            countriesInfo.classList.toggle('active');
            
            if (countriesInfo.classList.contains('active')) {
                this.textContent = 'Скрыть список стран';
            } else {
                this.textContent = 'Посмотреть страны-участницы';
            }
        });
    }
    
    // Генератор цитат
    const quotes = [
        {
            text: "Благодарность — самая прекрасная форма вежливости.",
            author: "Жак Маритен"
        },
        {
            text: "Спасибо — это маленькое слово, которое может иметь большое значение.",
            author: "Неизвестный автор"
        },
        {
            text: "Благодарность превращает то, что мы имеем, в достаточно.",
            author: "Мелоди Битти"
        },
        {
            text: "Спасибо — это молитва, которую может произнести каждый.",
            author: "Неизвестный автор"
        },
        {
            text: "Благодарность — это не только величайшая из добродетелей, но и мать всех остальных.",
            author: "Цицерон"
        },
        {
            text: "Скажи спасибо тем, кто сделал тебе больно, они научили тебя быть сильнее.",
            author: "Неизвестный автор"
        }
    ];
    
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    
    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    }
    
    function updateQuote() {
        const quote = getRandomQuote();
        quoteText.textContent = `"${quote.text}"`;
        quoteAuthor.textContent = `— ${quote.author}`;
    }
    
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', updateQuote);
    }
    
    // Инициализация первой цитаты
    updateQuote();
    
    // Упражнение благодарности
    const saveGratitudeBtn = document.getElementById('save-gratitude');
    const gratitudeText = document.getElementById('gratitude-text');
    const gratitudeOutput = document.getElementById('gratitude-output');
    
    if (saveGratitudeBtn) {
        saveGratitudeBtn.addEventListener('click', function() {
            const text = gratitudeText.value.trim();
            
            if (text === '') {
                alert('Пожалуйста, напишите, за что вы благодарны!');
                return;
            }
            
            // Сохраняем в localStorage
            const today = new Date().toLocaleDateString('ru-RU');
            const gratitudeEntry = {
                date: today,
                text: text
            };
            
            // Получаем существующие записи
            let existingEntries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
            
            // Добавляем новую запись
            existingEntries.push(gratitudeEntry);
            
            // Сохраняем обратно
            localStorage.setItem('gratitudeEntries', JSON.stringify(existingEntries));
            
            // Показываем результат
            gratitudeOutput.innerHTML = `
                <h4><i class="fas fa-check-circle"></i> Ваша благодарность сохранена!</h4>
                <p><strong>Дата:</strong> ${today}</p>
                <p><strong>Ваша благодарность:</strong> ${text}</p>
                <p>Всего сохраненных записей: ${existingEntries.length}</p>
            `;
            
            gratitudeOutput.style.display = 'block';
            gratitudeText.value = '';
            
            // Прокручиваем к результату
            gratitudeOutput.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Кнопка "Сказать Спасибо создателям сайта"
    const thankYouBtn = document.getElementById('thank-you-btn');
    const thankYouMessage = document.getElementById('thank-you-message');
    
    if (thankYouBtn) {
        thankYouBtn.addEventListener('click', function() {
            thankYouMessage.innerHTML = `
                <h4><i class="fas fa-heart"></i> Спасибо за вашу благодарность!</h4>
                <p>Ваши добрые слова очень важны для нас. Мы рады, что вы цените наш труд.</p>
                <p>Помните: говоря "спасибо", мы делаем мир немного лучше!</p>
                <div class="heart-animation" style="font-size: 2rem; color: #ff6b6b; margin-top: 10px;">
                    <i class="fas fa-heartbeat"></i>
                </div>
            `;
            
            thankYouMessage.style.display = 'block';
            
            // Анимация сердечка
            const heart = thankYouMessage.querySelector('.fa-heartbeat');
            let scale = 1;
            const animation = setInterval(() => {
                scale = scale === 1 ? 1.2 : 1;
                heart.style.transform = `scale(${scale})`;
            }, 500);
            
            // Останавливаем анимацию через 3 секунды
            setTimeout(() => {
                clearInterval(animation);
                heart.style.transform = 'scale(1)';
            }, 3000);
            
            // Прокручиваем к сообщению
            thankYouMessage.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Инициализация: показываем первую секцию
    document.getElementById('history-section').classList.add('active');
    
    // Загрузка сохраненных записей благодарности
    function loadSavedGratitudes() {
        const savedEntries = JSON.parse(localStorage.getItem('gratitudeEntries')) || [];
        
        if (savedEntries.length > 0 && gratitudeOutput) {
            const latestEntry = savedEntries[savedEntries.length - 1];
            gratitudeOutput.innerHTML = `
                <h4><i class="fas fa-history"></i> Ваша последняя благодарность</h4>
                <p><strong>Дата:</strong> ${latestEntry.date}</p>
                <p><strong>Текст:</strong> ${latestEntry.text}</p>
                <p><em>Всего у вас ${savedEntries.length} сохраненных благодарностей</em></p>
            `;
            gratitudeOutput.style.display = 'block';
        }
    }
    
    // Загружаем сохраненные благодарности при загрузке страницы
    loadSavedGratitudes();
    
    // Добавляем небольшой эффект при наведении на карточки
    const cards = document.querySelectorAll('.language-card, .sidebar-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});