function refreshTemp(response){
    let currentTemperature = document.querySelector("#current-temp");
    let temperature = response.data.temperature.current;
        let newCity = document.querySelector("#weatherapp-city");
    
    newCity.innerHTML = response.data.city;
    currentTemperature.innerHTML = Math.round(temperature);
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