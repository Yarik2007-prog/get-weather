"use strict";

const spanTemp = document.querySelector(".temp");
const spanWind = document.querySelector(".wind");
const spanHum = document.querySelector(".hum");
const radioCityName = document.querySelector("#city-name-radio");
const radioCityID = document.querySelector("#city-id-radio");
const cityNameText = document.querySelector("#city-name");
const cityIDText = document.querySelector("#city-id");
const weatherButton = document.querySelector(".weather");
const cancelButton = document.querySelector(".cancel");

function updateInputs() {
    cityNameText.disabled = radioCityID.checked;
    cityIDText.disabled = radioCityName.checked;
}

radioCityName.addEventListener("change", updateInputs);
radioCityID.addEventListener("change", updateInputs);

weatherButton.addEventListener("click", (event) => {
    event.preventDefault();
    const param = {
        url: "https://api.openweathermap.org/data/2.5",
        appid: "0e6d1d3bff8e0a32e113767624f5060e",
        cityName: cityNameText.value,
        cityID: cityIDText.value,
    };

    let url;

    if (radioCityName.checked) {
        url = `${param.url}/weather?q=${param.cityName}&appid=${param.appid}&units=metric`;
    } else {
        url = `${param.url}/weather?id=${param.cityID}&appid=${param.appid}&units=metric`;
    }

    fetch(url)
        .then((weather) => {
            if (!weather.ok) throw new Error("Error");
            return weather.json();
        })
        .then((data) => {
            spanTemp.textContent = `${data.main.temp} °C`;
            spanWind.textContent = `${data.wind.speed} m/s`;
            spanHum.textContent = `${data.main.humidity} %`;
        })
        .catch((error) => {
            console.log(error);
        });
});

cancelButton.addEventListener("click", () => {
    spanTemp.textContent = "";
    spanWind.textContent = "";
    spanHum.textContent = "";

    cityNameText.value = "";
    cityIDText.value = "";

    radioCityName.checked = true;

    updateInputs();
});
