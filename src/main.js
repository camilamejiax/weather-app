function formatDate() {
  let now = new Date();
  //day
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  //hour
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  // minutes
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let time = document.querySelector("#time-display");
  time.innerHTML = `${day}, ${hour}:${minutes}`;
}
formatDate();

function searchEngine(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity").value;
  searchCity(cityInput);
}

let form = document.querySelector("#searchBar");
form.addEventListener("submit", searchEngine);

function displayWeatherCondition(response) {
  document.querySelector("#newCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(cityInput) {
  let apiKey = "7474fc14b19a5b425bb49dcabc42f77b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchCurrentLocation(position) {
  let apiKey = "7474fc14b19a5b425bb49dcabc42f77b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);