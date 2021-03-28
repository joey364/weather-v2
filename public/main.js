import { flags } from './flags.js';

const openWeather = {
  key: 'fa60348fb221f95615234d52ce4d0ce6',
  url: 'https://api.openweathermap.org/data/2.5/',
};

// * Build the date
const dateBuilder = (d) => {
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  let date = d.getDate();

  return `${day}, ${date} ${month}, ${year}`;
};

document.querySelector('.date').textContent = dateBuilder(new Date());

// * Get reference to the right elements to update

const appElement = document.querySelector('.app');
const searchInput = document.querySelector('.search-bar__input');
const submitButton = document.querySelector('.search-bar__submit');
const erroerDialog = document.querySelector('.dialog');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  getWeatherData(searchInput.value);
  searchInput.value = '';
});

searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeatherData(searchInput.value);
    searchInput.value = '';
  }
});

// * Fetch the data from the input recieved

// * Funtion that gets the actual data from the weather service ✅

const getWeatherData = (query) => {
  fetch(
    `${openWeather.url}weather?q=${query}&units=metric&APPID=${openWeather.key}`
  )
    .then((response) => response.json())
    .then((data) => {
      let countryCode = data.sys.country;
      let city = data.name;
      let temp = Math.round(data.main.temp);
      let condition = data.weather[0].id;
      let weather = data.weather[0].main;
      let description = data.weather[0].description;

      let Weather = {
        countryCode,
        city,
        temp,
        condition,
        weather,
        description,
      };

      updateWeather(
        Weather.countryCode,
        Weather.city,
        Weather.temp,
        Weather.condition,
        Weather.weather,
        Weather.description
      );
    })

    .catch((error) => {
      console.log(error);
      erroerDialog.show()
      setTimeout(() => {
       erroerDialog.close(); 
      }, 2500);
      // alert('Do the search again');
    });
};

// * Update the UI

const getWeatherBackgroundImage = (weather) => {
  switch (weather) {
    case 'Clouds':
      return 'cloudy.jpg';
    case 'Clear':
      return 'sunny.jpg';
    case 'Thunderstorm':
      return 'thunderstorms.jpg';
    case 'Drizzle':
      return 'drizzle.jpg';
    case 'Rain':
      return 'rain.jpg';
    case 'Snow':
      return 'snow.jpg';
    case 'Mist':
      return 'mist.jpg';
    case 'Dust':
      return 'sandstorms.jpg';
    case 'Sand':
      return 'sandstorms.jpg';
    case 'Haze':
      return 'haze.jpg';
    case 'Smoke':
      return 'smoke.jpg';
    case 'Ash':
      return 'ash.jpg';
    case 'Squall':
      return 'squall.jpg';
    case 'Tornado':
      return 'tornado.jpg';
    default:
      return 'sandstorms.jpg';
  }
};

//Returns the emoji for the weather data recieved 😆
const getIcon = (condition) => {
  if (condition < 300) {
    return '🌩';
  } else if (condition < 400) {
    return '🌧';
  } else if (condition < 600) {
    return '☔️';
  } else if (condition < 700) {
    return '☃️';
  } else if (condition < 800) {
    return '🌫';
  } else if (condition == 800) {
    return '☀️';
  } else if (condition <= 804) {
    return '☁️';
  } else {
    return '🤷‍';
  }
};

// * Returns the emoji for country contained in the search query

const getEmoji = (countryCode) => {
  return flags[`${countryCode.toUpperCase()}`].emoji;
};

// * Update the values gotton from the query 🔥
const updateWeather = (
  countryCode,
  city,
  temp,
  condition,
  weather,
  description
) => {
  const bgGradient = `linear-gradient(
      to top,
      rgba(0,0,0, 0.8) 0,
      rgba(0,0,0, 0) 30%,
      rgba(0,0,0, 0) 60%,
      rgba(0,0,0, 0.8) 100%
    )`;

  appElement.style.background =
    `url(./assets/img/${getWeatherBackgroundImage(weather)}),` +
    bgGradient;

  appElement.style.backgroundBlendMode = 'multiply';

  document.querySelector(
    '.location'
  ).textContent = `${city}, ${countryCode}  ${getEmoji(countryCode)}`;
  document.querySelector('.temp').textContent = `${temp}°C ${getIcon(
    condition
  )}`;
  document.querySelector('.desc').textContent = description;
};

// * On page load get the weather for Accra 🚀
window.addEventListener('load', (e) => {
  e.preventDefault();
  getWeatherData('accra');
});
