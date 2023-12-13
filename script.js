const apiKey = '3fc8337cae35c29bacf6fe6f6fcdaaaa';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const mainElement = document.getElementById('main');
const descriptionElement = document.getElementById('description');


searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            mainElement.textContent = data.weather[0].main;
            descriptionElement.textContent = data.weather[0].description;

            updateBackgroundColor(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateBackgroundColor(weatherCondition) {
    const body = document.body;
    let backgroundImageUrl;

    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            backgroundImageUrl = 'clear-sky.jpg'; 
            break;
        case 'haze':
            backgroundImageUrl = 'haze-sky.jpg'; 
            break;
        case 'clouds':
            backgroundImageUrl = 'cloudy-sky.jpg'; 
            break;
        case 'rain':
            backgroundImageUrl = 'rainy-day.jpg'; 
            break;
        case 'thunderstorm':
            backgroundImageUrl = 'thunderstorm.jpg'; 
            break;
        case 'snow':
            backgroundImageUrl = 'snowy-day.jpg'; 
            break;
        default:
            backgroundImageUrl = 'default-background.jpg'; 
            break;
    }

    body.style.backgroundImage = `url('${backgroundImageUrl}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
}