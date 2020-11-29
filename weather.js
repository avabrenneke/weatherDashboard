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