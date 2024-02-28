function refreshTemp(response){
    let currentTemperature = document.querySelector("#current-temp");
    let temperature = response.data.temperature.current;
    let newCity = document.querySelector("#weatherapp-city");
        let cityDetail = document.querySelector("#details");
        let cityHumidity = document.querySelector("#humidity");
        let cityWind = document.querySelector("#wind");
        let cityTime = document.querySelector("#time");
        let date = new Date(response.data.time * 1000);
        let emoji = document.querySelector("#emoji");

    
    newCity.innerHTML = response.data.city;
    currentTemperature.innerHTML = Math.round(temperature);
    emoji.innerHTML = `<img src = "${response.data.condition.icon_url}" class= "weather-emoji"/>`;
        cityHumidity.innerHTML = `${response.data.temperature.humidity}%`;
        cityDetail.innerHTML = response.data.condition.description;
        cityWind.innerHTML = `${response.data.wind.speed}km/h`;
        cityTime.innerHTML = formatDate(date);

    getForecast(response.data.city);
}

function formatDate(date){
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hour}:${minutes}`;
}

function searchCityInput (newCity){
    let apiKey = "8f100a03dbef7b07767405e3a2t1o8ce";
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=metric`;
      axios.get(apiUrl).then(refreshTemp);
}

function newSearchCity (event) {
    event.preventDefault ();
    let searchFormInput = document.querySelector("#searchform-input");


    searchCityInput(searchFormInput.value);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

function getForecast(city){
let apiKey = "8f100a03dbef7b07767405e3a2t1o8ce";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
    console.log(response.data);
let forecast = document.querySelector("#forecast");

let forecastHtml = "";

response.data.daily.forEach(function(day, index){
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weatherForecast">
        <div class="forecastDay">${formatDay(day.time)}</div>
        <div>
            <img src="${day.condition.icon_url}" class="forecastEmoji"></div>
            <div class="forecastTemp">
                <span class="forecastTempMax"><strong>${Math.round(
                  day.temperature.maximum
                )}° </strong></span>
                <span class="forecastTempMini">${Math.round(
                  day.temperature.minimum
                )}°</span>
            </div>
    </div>`;
    }
});
forecast.innerHTML = forecastHtml;
}



let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", newSearchCity);

searchCityInput ("Stockholm");