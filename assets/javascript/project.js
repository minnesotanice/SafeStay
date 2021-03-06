
/**
 **********************************************************
 * Alternative Fuel Station Look-up API
 **********************************************************
 */
/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for Alt Fuel Station API based on form inputs
 */
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://developer.nrel.gov/api/alt-fuel-stations/v1/nearest.json";

  // add the api key parameter (the one we received when we registered)
  queryURL += "?api_key=vX65llVP5vNMB4aIlcdXvQsNn0UaBxPBlg1QWjj7";

  // grab text the user typed into the zipcode search input, add as parameter to url
  var searchTerm = $("#search-zipcode").val().trim();
  queryURL += "&location=" + searchTerm;

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");

  return queryURL;
}

function lettersOnly(input){
  var regex = /[^a-z]/gi;
  input.value = input.value.replace(regex, "");
  
}

function numbersOnly(input){
  var regex = /[^0-9]/g;
  input.value = input.value.replace(regex, "");
  
}

/**
 **********************************************************
 * Alternative Fuel Station
 **********************************************************
 */
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} AltFuelData - object containing Alt Fuel Station API data
 */
function updatePage(AltFuelData) {
  // get from the form the number of results to display
  // api doesn't have a "limit" parameter, so we have to do this ourselves
  var numStations = 5

  // var numStations = $("#station-count").val();

  // log the AltFuelData to console, where it will show up as an object
  console.log(AltFuelData);
  console.log("------------------------------------");

  // loop through and build elements for the defined number of stations
  for (var i = 0; i < numStations; i++) {

    // get specific station info for current index
    var station = AltFuelData.fuel_stations[i];

    // increase the stationCount (track station # - starting at 1)
    var stationCount = i + 1;

    // create the HTML well (section) and add the station content for each
    var $stationWell = $("<station>");
    $stationWell.addClass("well");
    $stationWell.attr("id", "station-well-" + stationCount);

    // add the newly created element to the DOM
    $("#well-section").append($stationWell);

    // if the station has a fuelType, log and append to $stationWell
    var fuelType = station.fuel_type_code;

    if (station.fuel_type_code) {
      console.log("------------------------------------");
      console.log(fuelType);
      console.log("------------------------------------");


      //add data into html table
      $("#well-section > tbody").append("<tr><td>" + fuelType + "</td><td>" + stationName + 
      "</td><td>" + street + "<br>" + city + "," + "&nbsp;" + state + "&nbsp;" + zip + "</td><td>" + "Modal Button Goes Here" + "</td></tr>");
    }

    // if the station has a station_name, log and append to $stationWell
    var stationName = station.station_name;

    if (station.station_name) {
      console.log(stationName);
      console.log("------------------------------------");

      $stationWell.append("<h5>" + station.station_name + "</h5>");
    }

    // log street, and append to document if exists
    var street = station.street_address;
    console.log(station.street_address);
    if (station.street_address) {
      $stationWell.append("<h5>" + street + "</h5>");
    }

    // log city, and append to document if exists
    var city = station.city;
    console.log(city);
    if (city) {
      $stationWell.append("<h5>" + station.city + "</h5>");
    }

    // log state, and append to document if exists
    var state = station.state;
    console.log(state);
    if (state) {
      $stationWell.append("<h5>" + station.state + "</h5>");
    }

    // log zip, and append to document if exists
    var zip = station.zip;
    console.log(zip);
    if (zip) {
      $stationWell.append("<h5>" + station.zip + "</h5>");
    }
  }
}

// function to empty out the stations (Possible item to add once we get it all working)
function clear() {
  $("#well-section").empty();
}



/**
 **********************************************************
 * Modal Windows
 **********************************************************
 */

// Click events for view location
$("#jsResults").on("click", ".jsImageButton", function () {
  // alert("clicked it");

  var imageUrlBase = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=";

  var imageUrlLocation = $(this).attr("data-location-image");

  var imageUrlKey = "&key=AIzaSyBjs2MJp6REK0q4qkuENY_D78R4jZVr4OI";


  // alt value for  image
  var imageAltParameter = $(this).attr("data-location-name");
  console.log("imageAltParameter is ", imageAltParameter);

  // src value for image
  var imageUrlFinal = imageUrlBase + imageUrlLocation + imageUrlKey;
  console.log("imageUrlFinal is ", imageUrlFinal);

  $("#jsImage").attr("src", imageUrlFinal);
  $("#jsImage").attr("alt", imageAltParameter);

  $("#jsCaption").text(imageAltParameter);

});



/**
 **********************************************************
 * Google Street View API
 **********************************************************
 */
function loadData(){
  var $address = $('#address');
  var street = $('#street').val();
  var city = $('#city').val();
  var address = city + ',' + state;

  $address.text("Address: " + address + "");

  var streetViewURL = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + address + '&key=AIzaSyBjs2MJp6REK0q4qkuENY_D78R4jZVr4OI';
  $.ajax({
      url: streetViewURL,
      method: "GET"
  })
  .then(function(response){
      
      // console.log(response);
      console.log(streetViewURL);

  $('#photo').attr("src" , streetViewURL);

  })

  return false;
}

$('#form-container').submit(loadData);

$(document).ready(function () {
  $('.modal').modal();
});



/**
 **********************************************************
 * Click Handlers
 **********************************************************
 */

// .on("click") function associated with the City/State Submit Button

$("#run-city-state").on("click", function (event) {
  // can't do this with two submit buttons
  // event.preventDefault();

  var city = $("#search-city").val();
  if (city===""){
    alert("please enter city name");
  }
  var state = $("#search-state option:checked").find(":selected").text();

  console.log("city is: ", city);
  console.log("state is:", state);

  $("#search-city").val("");
  //alerts for empty field
 
  $("#search-state option selected").val("");
  
});

$("#run-zip").on("click", function (event) {
  // can't do this with two submit buttons
  // event.preventDefault();

  var zipcode = $("#search-zipcode").val();
  if (zipcode===""){
    
    alert("please enter zipcode");
}
  console.log("zipcode is: ", zipcode);

  $("#search-zipcode").val("");
  
});
// .on("click") function associated with the Zipcode Submit Button
$("#run-zip").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();


  // build the query URL for the ajax request to the ALT Fuel API
  var queryURL = buildQueryURL();

  // make the AJAX request to the API - GETs the JSON data at the queryURL.
  // the data then gets passed as an argument to the updatePage function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(updatePage);
});
  