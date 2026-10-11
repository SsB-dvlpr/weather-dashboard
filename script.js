const inputCity = document.getElementById("inputCity");
const btnSearch = document.getElementById("btnSearch");
const weatherResult = document.getElementById("weatherResult");
const inputSpan = document.getElementById("inputSpan");
const historyList = document.getElementById("history");
const btnClear = document.getElementById("btnClear");
const placeName = document.getElementById("placeName");
const tempValue = document.getElementById("tempValue");
const windValue = document.getElementById("windValue");
async function citySearch() {
  try {
    const cityName = inputCity.value.trim();
    if (cityName === "") {
      inputSpan.textContent = "hata lütfen bir şehir ismi giriniz";
      weatherResult.textContent = "";
      return;
    }
    weatherResult.textContent = "Yükleniyor...";
    btnSearch.disabled = true;
    inputSpan.textContent = "";
    const url =
      "https://geocoding-api.open-meteo.com/v1/search?name=" +
      cityName +
      "&count=1";
    const response = await fetch(url);
    if (!response.ok) {
      weatherResult.textContent = "HATA " + response.status;
      resetCard();
      return;
    }
    const data = await response.json();

    if (!data.results) {
      inputSpan.textContent = "Şehir bulunamadı";
      weatherResult.textContent = "";
      resetCard();
      return;
    }

    const lat = data.results[0].latitude;
    const lon = data.results[0].longitude;
    const foundName = data.results[0].name;
    const country = data.results[0].country;
    const weatherURL =
      "https://api.open-meteo.com/v1/forecast?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current=temperature_2m,wind_speed_10m";
    const weatherResponse = await fetch(weatherURL);
    if (!weatherResponse.ok) {
      weatherResult.textContent = "HATA " + weatherResponse.status;
      resetCard();
      return;
    }

    const weatherData = await weatherResponse.json();
    const temperature = weatherData.current.temperature_2m;
    const wind = weatherData.current.wind_speed_10m;
    const unitTemp = weatherData.current_units.temperature_2m;
    const unitWind = weatherData.current_units.wind_speed_10m;

    placeName.textContent = foundName + ", " + country;
    tempValue.textContent = temperature + " " + unitTemp;
    windValue.textContent = "Rüzgar: " + wind + " " + unitWind;
    weatherResult.textContent = "";

    const past = JSON.parse(localStorage.getItem("gecmis")) || [];
    if (!past.includes(foundName)) {
      past.push(foundName);
    }
    if (past.length > 5) {
      past.shift();
    }
    localStorage.setItem("gecmis", JSON.stringify(past));
    showHistory();
  } catch (error) {
    weatherResult.textContent = "bağlantı hatası internetnizi kontrol edin ";
    resetCard();
    console.error(error);
  } finally {
    btnSearch.disabled = false;
  }
}
function resetCard() {
  placeName.textContent = "--";
  tempValue.textContent = "--";
  windValue.textContent = "Rüzgar: --";
}
function showHistory() {
  const past = JSON.parse(localStorage.getItem("gecmis")) || [];
  historyList.textContent = "";

  past.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.className =
      "cursor-pointer rounded-lg bg-slate-800 px-3 py-2 hover:bg-slate-700";
    li.addEventListener("click", () => {
      inputCity.value = city;
      citySearch();
    });
    historyList.appendChild(li);
  });
}

btnSearch.addEventListener("click", citySearch);

btnClear.addEventListener("click", () => {
  if (localStorage.getItem("gecmis") !== null) {
    localStorage.removeItem("gecmis");
    inputSpan.textContent = "Liste temizlendi";
  } else {
    inputSpan.textContent = "Liste zaten boş";
  }
  showHistory();
});
showHistory();

