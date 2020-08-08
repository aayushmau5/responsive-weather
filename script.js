const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const warning = document.querySelector(".warning");
const bar = document.querySelectorAll(".bar");
const loading = document.querySelector(".loading__anim");
const locationValue = document.querySelector(".location");
const temp = document.querySelector(".temp");
const feel = document.querySelector(".feel");
const max_temp = document.querySelector(".max-temp");
const min_temp = document.querySelector(".min-temp");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind-speed");
const pressure = document.querySelector(".pressure");
const container = document.querySelector(".container");

function getInput(e) {
  e.preventDefault();
  const query = searchInput.value;
  if (query === "") return;
  searchInput.value = "";
  locationValue.innerText = query;
  getData(query);
}

function getData(query) {
  container.style.display = "grid";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=1107429ef67f4ff90050a129c01b5219`;
  loading.style.display = "block";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == "404") {
        warning.style.display = "block";
        loading.style.display = "none";
        container.style.display = "none";
      } else {
        humidity.innerText = data.main.humidity;
        pressure.innerText = data.main.pressure;
        temp.innerText = (data.main.temp - 273).toFixed(2);
        max_temp.innerText = Math.ceil(data.main.temp_max - 273);
        min_temp.innerText = Math.floor(data.main.temp_min - 273);
        wind_speed.innerText = data.wind.speed;
        feel.innerText = data.weather[0].description;
        loading.style.display = "none";
        warning.style.display = "none";

        bar.forEach((card) => {
          card.style.opacity = "100";
          card.style.transform = "translateY(0)";
        });
      }
    })
    .catch((err) => console.log(err));
}

searchBtn.addEventListener("click", getInput);
searchInput.addEventListener("keyup", () => {
  bar.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
  });
});
