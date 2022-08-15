// .ready makes it not load until something is inputted
$(document).ready(function () {
  
    // create an array for cities to be held
  let citiesArray = localStorage.getItem("city");

  //
  if (citiesArray === null) {
    citiesArray = [];
  } else {
    citiesArray = JSON.parse(citiesArray);
  }
  // have the search history area be empty
  function displayCities() {
    let cityButtons = $("#cityButtons");
    cityButtons.empty();

    // every entered city from cities array to city button area
    for (let i = 0; i < citiesArray.length; i++) {
    let city = $("<btn>").text(citiesArray[i]);
      city.addClass("btn btn-info mb-2 btn-history");
      cityButtons.prepend(city);
    }

  }

  // fetch the api call for current weather

  function fetchWeather(searchInput) {

    let API = "95d0033c578ce760785239d96ff3f30a";
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + API + "&units=imperial";

    //call for current weather
    $.ajax({
        url: weatherURL,
        method: "GET",
      }).then(function (response) {
        $("#currentCity").text(response.name);
        $("#currentTemp").text("Temp: " + response.main.temp + " F");
        $("#currentWind").text("Wind Speed: " + response.wind.speed + " mph");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");
        // $("#currentIcon").attr("src", "http://openweathermap.org/img/wn/" + response.list.weather[0].icon + "@2x.png");

        var uvCall = "https://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;


        // call for uv color
        $.ajax({
            url: uvCall,
            method: "GET",
          }).then(function (index) {
            $("#currentUV").text("UV Index: " + index.value);
    
            // if else to change color based on uv index value
            if (index.value <= 5) {
              $("#currentUV").addClass(".text-light");
              $("#currentUV").attr("style", "background-color: green");
            } else if (index.value > 5 && index.value <= 8) {
              $("#currentUV").addClass(".text-light");
              $("#currentUV").attr("style", "background-color: yellow");
            } else if (index.value > 9 && index.value <= 13) {
              $("#currentUV").addClass(".text-light");
              $("#currentUV").attr("style", "background-color: red");
            } 
        });
  });

// call for 5 day weather 
let weekWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + API + "&units=imperial";
console.log(weekWeather)

//call to five day forecast
$.ajax({
  url: weekWeather,
  method: "GET"
  }).then(function (weekRes) {
  console.log(weekRes);

  let list = weekRes.list
  console.log(list);
  $("#fiveDaySection").empty()

  //loop for five day forecast variables into cards
  for (let i = 0; i < list.length; i += 8) {

      let forecastCol = $("<div class='col text-center align-items-center'>");
      let date = $("<h4 class='card-title'>").text(list[i].dt_txt.split(" ")[0]);
      let humidity = $("<p class='card-subtitle'>").text("Humidity: " + list[i].main.humidity + " %");
      let temperature = $("<p class='card-subtitle'>").html("Temp: " + list[i].main.temp + " &#176; F");
      let windSpeed = $("<p class='card-subtitle'>").html("Wind Speed: " + list[i].wind.speed + " mph");
      let img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png");

      forecastCol.append(date);
      forecastCol.append(temperature);
      forecastCol.append(humidity);
      forecastCol.append(img);
      forecastCol.append(windSpeed)
      $("#fiveDaySection").append(forecastCol);

  }
})

}
    // click for city search
  $("#search").click(function () {
    let searchInput = $("#city-input").val();
    citiesArray.push(searchInput);
    fetchWeather(searchInput);

    // cities in local storage
    localStorage.setItem("city", JSON.stringify(citiesArray));

    console.log(citiesArray)

    displayCities();
  });

  // show search history in buttons

  $(document).on("click", ".btn-history", function () {
    let searchInput = $(this).text();
    fetchWeather(searchInput);
  });

  displayCities();
  
});
