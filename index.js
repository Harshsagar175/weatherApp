const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// Replace with the URL of your weather API
const apikey="573546db852e108762cb8c4cf9feb08f";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function fetchData(city) {
        const response = await fetch(apiUrl+city+`&appid=${apikey}`);
        const result = await response.json();
        console.log(result);
        if(response.status === 404){
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        }
        else{
            // Update the HTML elements with the fetched data
            document.getElementById("city").innerHTML = city;
            document.getElementById("temp").innerHTML = Math.round(result.main.temp) + "°C";
            document.getElementById("humidity").innerHTML = result.main.humidity + "%";
            document.getElementById("wind").innerHTML = result.wind.speed + " km/hr";
            changePic(result);
            document.querySelector(".error").style.display = "none";
        } 
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        fetchData(city);
    } else {
        console.error('Please enter a city.');
        
    }
});

// Handle Enter key press in the input field
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            fetchData(city);
        } else {
            console.error('Please enter a city.');
        }
    }
});

const changePic = (result) => {
    let weather = result.weather[0].main;
        if(weather == "Clouds"){
            document.getElementById("weather-icon").src = "images/clouds.png";
        }
        if(weather == "Clear"){
            document.getElementById("weather-icon").src = "images/clear.png";
        }
        if(weather == "Rain"){
            document.getElementById("weather-icon").src = "images/rain.png";
        }
        if(weather == "Drizzle"){
            document.getElementById("weather-icon").src = "images/drizzle.png";
        }
        if(weather == "Snow"){
            document.getElementById("weather-icon").src = "images/snow.png";
        }
        if(weather == "Mist"){
            document.getElementById("weather-icon").src = "images/mist.png";
        }
        document.querySelector(".weather").style.display = "block";
}
