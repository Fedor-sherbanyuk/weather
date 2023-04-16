const api = 'f9db622d38b4c2f2686d22ca788d6573';
function getOpenWeatherMap(event) {
  const data = document.querySelector('#formWeather');

  const weatherApi = '884b6d1113f443099de83658230204';
  const weatherStackApi = '04ee8da4f6676b93bd427bb179b0a8f8';
  event.preventDefault();
  if (event.submitter.closest('.openWeatherLatLon')) {
    const lat = +data.lat.value;
    const lon = +data.lon.value;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`
    )
      .then((response) => response.json())
      .then((info) => {
        document.querySelector('.textareaOpenWeatherCity').hidden = false;
        document.querySelector('.textareaOpenWeatherCity').innerHTML =
          info.main.temp;
      });
  } else if (event.submitter.closest('.openWeather')) {
    const nameOpenWeatherCity = data.nameOpenWeatherCity.value;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameOpenWeatherCity}&units=metric&&appid=${api}`
    )
      .then((response) => response.json())
      .then((info) => {
        document.querySelector('.textareaOpenWeatherCity').hidden = false;
        document.querySelector(
          '.textareaOpenWeatherCity'
        ).innerHTML = `${info.main.temp}c`;
      });
  } else if (event.submitter.closest('.weather')) {
    const nameWeatherCity = data.nameWeatherCity.value;

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${weatherApi}&q=${nameWeatherCity}&aqi=no`
    )
      .then((response) => response.json())
      .then((info) => {
        document.querySelector('.weatherCity').hidden = false;
        document.querySelector(
          '.weatherCity'
        ).innerHTML = `${info.current.temp_c}c`;
      });
  } else if (event.submitter.closest('.weatherStack')) {
    const nameWeatherStackCity = data.nameWeatherStackCity.value;
    fetch(
      `http://api.weatherstack.com/current?access_key=${weatherStackApi}&query=${nameWeatherStackCity}`
    )
      .then((response) => response.json())
      .then((info) => {
        document.querySelector('.weatherStackWeatherCity').hidden = false;
        document.querySelector(
          '.weatherStackWeatherCity'
        ).innerHTML = `${info.current.temperature}c`;
      })
      .catch(() => {
        document.querySelector('.weatherStackWeatherCity').innerHTML = 'Oops';
      });
  }
}
document
  .querySelector('#formWeather')
  .addEventListener('submit', getOpenWeatherMap);

document.querySelector('.selectFilter').addEventListener('change', (event) => {
  if (event.target.options) {
    if (document.querySelector('.card-header-title')) {
      document.querySelector('.card').remove();
    }
    const listOptions = document.querySelectorAll('.selectFilter>option');
    const target = event.target.selectedIndex;
    const city = listOptions[target].innerText;

    (function infoArray() {
      const array = [];
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=${api}`
      )
        .then((response) => response.json())
        .then((info) => {
          array.push({
            key: 'How does the temperature feel:',
            info: info.main.feels_like,
          });
          array.push({ key: 'Wind gust:', info: info.wind.gust });
          array.push({ key: 'Humidity:', info: info.main.humidity }); // влажность
          array.push({
            key: 'Pressure millimeters:',
            info: info.main.pressure,
          }); // давление millimeters
          array.push({ key: 'Wind km per hour:', info: info.wind.speed }); // ветер км в час
          array.push({ key: 'Loudiness in percent:', info: info.clouds.all }); // облачность в процентах
          array.push({ key: 'Temperature:', info: info.main.temp }); // temperature
        });

      document
        .querySelector('h1')
        .insertAdjacentHTML(
          'beforebegin',
          `<div class="card pointer card-list mt-3" style="max-width: 90vw; background: linear-gradient(green,white,red);"><div class="card-header-title is-half is-4" style="font-size: 22px;">City Italia: ${city}</div></div>`
        );
      array.forEach((el) => {
        document
          .querySelector('.card-header-title')
          .insertAdjacentHTML(
            'beforeend',
            `<span className="card-header-title is-half is-4" style="margin-right:20px; font-size: 22px;">${el.key} ${el.info}</span>`
          );
      });
    })();
  }
});
