const date = document.querySelector('#date');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const tempImg = document.querySelector('#temp-img');
const description = document.querySelector('#description');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const apiKey = "0548a209a007cc37892fa399f5e11246";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let dateObj = new Date();
let month = monthNames[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();




const app = document.querySelector('.app');

const getWeather = async () => {
    date.textContent = `${month} ${day}, ${year}`;
    try {
        const cityName = document.getElementById('search-bar-input').value;    
        const weatherDataFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`, {
            headers: {
                Accept: "application/json"
              }
        });  
    
        const weatherData = await weatherDataFetch.json();
        document.querySelector("#valid").style.display = "block";   
        city.textContent = `${weatherData.name}`;
        description.textContent = `${weatherData.weather[0].main}`
        tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"/>`;
        temp.innerHTML = `<h2>${Math.round(weatherData.main.temp)}°C</h2>`;    
        tempMax.textContent = `${weatherData.main.temp_max}°C`;
        tempMin.textContent = `${weatherData.main.temp_min}°C`;
    }
    catch(error) {
        city.textContent = "Invalid city"
        document.querySelector("#valid").style.display = "none";
    }
}