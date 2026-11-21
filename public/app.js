document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    const resultBox = document.getElementById('weatherResult');

    if (!city) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = '<p class="error">Введите название города</p>';
        return;
    }

    try {
        const response = await fetch(`/api/weather/${city}?units=metric`);
        const data = await response.json();

        resultBox.style.display = 'block';
        
        if (!response.ok) {
            resultBox.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
            resultBox.innerHTML = `
                <h2>${data.city}</h2>
                <p>Температура: ${data.temp}°${data.units}</p>
                <p>Состояние: ${data.condition}</p>
            `;
        }
    } catch (err) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = '<p class="error">Ошибка сети</p>';
    }
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW зарегистрирован'))
            .catch(err => console.log('Ошибка SW:', err));
    });
}