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
const errorDialog = document.querySelector('.dialog');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (searchInput.value) {
    getWeatherData(searchInput.value);
    searchInput.value = '';
  }
});

searchInput.addEventListener('keypress', (e) => {
  if (searchInput.value && e.key === 'Enter') {
    getWeatherData(searchInput.value);
    searchInput.value = '';
  }
});

// * Fetch the data from the input received

// * Function that gets the actual data from the weather service ✅

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
      errorDialog.show();
      setTimeout(() => {
        errorDialog.close();
      }, 2500);
      // alert('Do the search again');
    });
};

// * Update the UI

const getWeatherBackgroundImage = (weather) => {
  switch (weather) {
    case 'Clouds':
      return 'cloudy.webp';
    case 'Clear':
      return 'sunny.webp';
    case 'Thunderstorm':
      return 'thunderstorms.webp';
    case 'Drizzle':
      return 'drizzle.webp';
    case 'Rain':
      return 'rain.webp';
    case 'Snow':
      return 'snow.webp';
    case 'Mist':
      return 'mist.webp';
    case 'Fog':
      return 'mist.webp';
    case 'Dust':
      return 'sandstorms.webp';
    case 'Sand':
      return 'sandstorms.webp';
    case 'Haze':
      return 'haze.webp';
    case 'Smoke':
      return 'smoke.webp';
    case 'Ash':
      return 'ash.webp';
    case 'Squall':
      return 'squall.webp';
    case 'Tornado':
      return 'tornado.webp';
    default:
      return 'sandstorms.webp';
  }
};

//Returns the emoji for the weather data received 😆
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

// * Update the values gotten from the query 🔥
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
    `url(./assets/img/${getWeatherBackgroundImage(weather)}),` + bgGradient;

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
