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
    //   let city = $("<li>").text(citiesArray[i]);
    //   city.addClass("list-group-item");
    let city = $("<btn>").text(citiesArray[i]);
      city.addClass("btn btn-info mb-2");
      cityButtons.prepend(city);
    }

    //   console.log(citiesArray)
  }

  $("#search").click(function () {
    let searchInput = $("#city-input").val();
    citiesArray.push(searchInput);

    localStorage.setItem("city", JSON.stringify(citiesArray));

    displayCities();
  });

  // console.log(citiesArray)
});
