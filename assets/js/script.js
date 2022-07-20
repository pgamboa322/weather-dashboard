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
      city.addClass("btn btn-info mb-2");
      cityButtons.prepend(city);
    }

    //   console.log(citiesArray)
  }

  // fetch the api  call for current weather

  function fetchWeather(searchInput) {

    let API = "95d0033c578ce760785239d96ff3f30a";
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + API + "&units=imperial";

    $.ajax({
        url: currentWeather,
        method: "GET",
      }).then(function (response) {
        $("#currentCity").text(response.name);
        $("#currentTemp").text("Temp: " + response.main.temp + " &#176; F");
        $("#currentWind").text("Wind Speed: " + response.wind.speed + " mph");
        $("#currentHumidity").text("Humidity: " + response.main.humidity + "%");

        var uvCall = "https://api.openweathermap.org/data/2.5/uvi?appid=" + API + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;


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
            } else if (index.value > 9 && index.value <= 10) {
              $("#currentUV").addClass(".text-light");
              $("#currentUV").attr("style", "background-color: red");
            } 
          });

  });


}

  $("#search").click(function () {
    let searchInput = $("#city-input").val();
    citiesArray.push(searchInput);

    localStorage.setItem("city", JSON.stringify(citiesArray));

    displayCities();
  });

  // console.log(citiesArray)
});
