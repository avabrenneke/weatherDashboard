const apiKey = "48a196e57dd05cb6e0a5a4111366b9c1";
var lat = "";
var lon = "";
    let today = $("#currentDay");
    let cityName = $("#cityName");
    let humidity = $("#cityHumidity");
    let temp = $("#cityTemp");
    let wind = $("#cityWind");
    let cityUV = $("#cityUv");
let searchBar = $("#search-city");
let searchBtn = $("#search-btn");

let searchHistory = [];

function storeCities(){
    localStorage.setItem("city", JSON.stringify(cities)); 
}
//Current Weather Function
function currentWeather(city, apiKey) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    // UV index call
    function currentUV(lat, lon, apiKey) {
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            //Attach UV parameters from Google
            cityUV.text("UV Index: " + response.value);
            if (response.value < 3) {
                cityUV.text("UV Index: " + response.value).attr("style", "background-color: green").append(" low");
            }
            else if (response.value >= 3 || response.value < 6) {
                cityUV.text("UV Index: " + response.value).attr("style", "background-color: yellow").append(" moderate");
            }
            else if (response.value >= 6 || response.value < 8) {
                cityUV.text("UV Index: " + response.value).attr("style", "background-color: orange").append(" high");
            }
            else if (response.value >= 8 || response.value < 11) {
                cityUV.text("UV Index: " + response.value).attr("style", "background-color: red").append(" very high");
            }
            else {
                cityUV.text("UV Index: " + response.value).attr("style", "background-color: violet").append(" extreme");
            }
        });
    };

    //Current Weather Call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        
            cityName.text(response.name);
            temp.text("Temperature: " + ((response.main.temp).toFixed(2) + "\xB0C"));
            humidity.text("Humidity: " + response.main.humidity + "%");
            wind.text("Wind Speed: " + response.wind.speed + " mph");

        //latitude and longitude
        lat = response.coord.lat;
        lon = response.coord.lon;
        //run the uv function
        currentUV(lat, lon, apiKey);
    })
};