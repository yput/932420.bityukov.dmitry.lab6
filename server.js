const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

const mockWeatherData = {
    moscow: { temp: 5, condition: "snow" },
    london: { temp: 10, condition: "rain" },
    newyork: { temp: 15, condition: "cloudy" },
    tokyo: { temp: 20, condition: "clear" },
    dubai: { temp: 35, condition: "clear" }
};

app.get('/api/weather/:city', (req, res) => {
    const cityKey = req.params.city.toLowerCase();
    const cityData = mockWeatherData[cityKey];

    if (!cityData) {
        return res.status(404).json({ error: "City not found" });
    }

    let temp = cityData.temp;
    let units = "C";

    if (req.query.units === 'imperial') {
        temp = Math.round((temp * 9 / 5) + 32);
        units = "F";
    }
    const response = {
        city: req.params.city.charAt(0).toUpperCase() + req.params.city.slice(1).toLowerCase(),
        temp: temp,
        units: units,
        condition: cityData.condition
    };

    res.json(response);
});
app.listen(PORT, () => {
    console.log(`Сервер успешно запущен!`);
    console.log(`Открой в браузере: http://localhost:${PORT}`);
});