function newSearchCity (event) {
    event.preventDefault ();
    let searchFormInput = document.querySelector("#searchform-input");
    
    let newCity = document.querySelector("#weatherapp-city");
    newCity.innerHTML = searchFormInput.value;
}

let searchForm = document.querySelector("#searchform");
searchForm.addEventListener("submit", newSearchCity);