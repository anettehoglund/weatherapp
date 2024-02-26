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

let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", newSearchCity);

searchCityInput ("Stockholm");