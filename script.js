const cityId = document.getElementById('cityName');
const weatherField = document.getElementById('weatherField')
let cityHtml = '' ;

const getWeatherReport = (event) => {
  if (event.target.innerHTML === 'Submit' && cityId.value !== '') {
    const cityName = cityId.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ cityName }&units=metric&appid=2b82452e27e0a8770dfca1c4740cb52e`)
      .then(res=> res.json())
      .then(data => {
        if(data && data.main && data.name && data.sys && data.wind) {
          cityHtml = `<div class="city">
                          <span class="city">${ data.name }</span>&nbsp;<span class="country">${ data.sys.country }</span>
                        </div>
                        <div>
                          <span class="temp">${ data.main.temp }&nbsp;</span><span>&#8451;</span>
                        </div>
                        <div class="mintemp">
                          <span class="minTemp">Min Temp: ${ data.main.temp_min }</span>
                          <span class="maxTemp">Max Temp: ${ data.main.temp_max }</span>
                        </div>
                        <div class="humidity">Humidity: ${ data.main.humidity }</div>`
                        
        } else {
          weatherField.innerHTML = `<div>City Not Found!!</div>`
        }
        weatherField.classList.remove('remove');
        weatherField.innerHTML = cityHtml;
      }).catch(err => {
        console.error(err);
      });
    cityId.value = '';
  }
}