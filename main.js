document.querySelector('#formWeather').addEventListener('submit', getOpenWeatherMap);
const weatherApi = "884b6d1113f443099de83658230204";

async function getOpenWeatherMap(event) {
    const data = document.querySelector('#formWeather');
    const api = "f9db622d38b4c2f2686d22ca788d6573";
    const weatherApi = "884b6d1113f443099de83658230204";
    const weatherStackApi = "04ee8da4f6676b93bd427bb179b0a8f8";
    event.preventDefault();
    if (event.submitter.closest('.openWeatherLatLon')) {
        const lat = +data.lat.value;
        const lon = +data.lon.value;

        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api}`)
            .then((response) => response.json())
            .then((info) => {
                console.log(info);
                document.querySelector('.textareaOpenWeatherCity').hidden = false;
                document.querySelector('.textareaOpenWeatherCity').innerHTML = info.main.temp;
            });
    } else if (event.submitter.closest('.openWeather')) {
        const nameOpenWeatherCity = data.nameOpenWeatherCity.value;
        http://api.weatherapi.com/v1/current.json?key=884b6d1113f443099de83658230204&q=London&aqi=no
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nameOpenWeatherCity}&units=metric&&appid=${api}`)
                .then((response) => response.json())
                .then((info) => {
                    console.log(info);
                    document.querySelector('.textareaOpenWeatherCity').hidden = false;
                    document.querySelector('.textareaOpenWeatherCity').innerHTML = info.main.temp+'c';
                });
    } else if (event.submitter.closest('.weather')) {
        const nameWeatherCity = data.nameWeatherCity.value;
        http://api.weatherapi.com/v1/current.json?key=884b6d1113f443099de83658230204&q=London&aqi=no
            await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApi}&q=${nameWeatherCity}&aqi=no`)
                .then((response) => response.json())
                .then((info) => {
                    console.log(info);
                    document.querySelector('.weatherCity').hidden = false;
                    document.querySelector('.weatherCity').innerHTML = info.current.temp_c+'c';
                });
    } else if (event.submitter.closest('.weatherStack')) {

        const nameWeatherStackCity = data.nameWeatherStackCity.value;
        await fetch(`http://api.weatherstack.com/current?access_key=${weatherStackApi}&query=${nameWeatherStackCity}`)
            .then((response) => response.json())
            .then((info) => {
                console.log(info);
                document.querySelector('.weatherStackWeatherCity').hidden = false;
                document.querySelector('.weatherStackWeatherCity').innerHTML = info.current.temperature+'c';
            }).catch(data => {
                document.querySelector('.weatherStackWeatherCity').innerHTML = 'Oops';
            });
    }
}

document.querySelector('.selectFilter').addEventListener('change', function (event) {
    if (event.target.options) {
        console.log(document.querySelector('.card-header-title'));
        if (document.querySelector('.card-header-title')) {
            document.querySelector('.card').remove();
        }
        const listOptions = document.querySelectorAll('.selectFilter>option');
        console.log(event.target.options);
        const target = event.target.selectedIndex;
        const city = listOptions[target].innerText;

        async function infoArray() {
            const array = [];
            await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApi}&q=${city}&aqi=no`)
                .then((response) => response.json())
                .then((info) => {
                    array.push({key: 'Region:', info: info.location.region});
                    array.push({key: 'How does the temperature feel:', info: info.current.feelslike_c});
                    array.push({key: 'Wind gust:', info: info.current.gust_kph});
                    array.push({key: 'Humidity:', info: info.current.humidity});//влажность
                    array.push({key: 'Pressure millimeters:', info: info.current.pressure_in});//давление millimeters
                    array.push({key: 'Pressure in millibars:', info: info.current.pressure_mb});//давление millibars
                    array.push({key: 'Wind km per hour:', info: info.current.wind_kph});//ветер км в час
                    array.push({key: 'Loudiness in percent:', info: info.current.cloud});//облачность в процентах
                    array.push({key: 'Temperature:', info: info.current.temp_c});//temperature
                });
            document.querySelector('h1').insertAdjacentHTML('beforebegin', `<div class="card pointer card-list mt-3" style="max-width: 90vw; background: linear-gradient(green,white,red);"><div class="card-header-title is-half is-4" style="font-size: 22px;">City Italia: ${city}</div></div>`);
            array.forEach(el => {
                document.querySelector('.card-header-title').insertAdjacentHTML('beforeend', `<span className="card-header-title is-half is-4" style="margin-right:20px; font-size: 22px;">${el.key} ${el.info}</span>`)
            });
        }
        infoArray();
    }
});
// <span class="card-header-title is-half is-4">${array[0]}</span>
// <span class="card-header-title is-half is-4">${array[1]}</span>
// <span class="card-header-title is-half is-4">${array[2]}</span>
// <span class="card-header-title is-half is-4">${array[3]}</span>
// <span class="card-header-title is-half is-4">${array[4]}</span>
// <span class="card-header-title is-half is-4">${array[5]}</span>
// <span class="card-header-title is-half is-4">${array[6]}</span>
// <span class="card-header-title is-half is-4">${array[7]}</span>
// <span class="card-header-title is-half is-4">${array[8]}</span>



