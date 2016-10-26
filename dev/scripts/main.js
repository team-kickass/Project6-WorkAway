//empty object to store data
var placesApp = {};


// this is to get NomadList information
placesApp.getPlaces = function() {

	$.ajax({
		url: 'https://nomadlist.com/api/v2/list/cities',
		method: 'GET',
		dataType: 'json',
	})
	.then(function(placesData){
		placesApp.getInfo(placesData)
	
	}); //this is the end of the "then" function
}; //this is the end of the getPlaces function


//user selects 3 countries they want to visit
	//store each country variable

placesApp.getInfo = function(placesData) {
		allNomadScores = []; //this is the empty array for the nomadScore
		console.log(placesApp.country1);


//filter through the cities within each country user specifies
		var country1Cities = placesData.result.filter(function(city) {
			return city.info.country.name.toLowerCase() === placesApp.country1.toLowerCase();
		});

		var country2Cities = placesData.result.filter(function(city) {
			return city.info.country.name.toLowerCase() === placesApp.country2.toLowerCase();
		});

		var country3Cities = placesData.result.filter(function(city) {
			return city.info.country.name.toLowerCase() === placesApp.country3.toLowerCase();
		});

//find the top nomadScore'd city out of cities within country user specified and return that city 
		var topCity1 = _.max(country1Cities, function(nomadScore) {
			return nomadScore.scores.nomadScore;
		});

		var topCity2 = _.max(country2Cities, function(nomadScore){
			return nomadScore.scores.nomadScore;
		});

		var topCity3 = _.max(country3Cities, function(nomadScore){
			return nomadScore.scores.nomadScore;
		});


	//these are the variables for Country 1's top City
			var cityName1 = topCity1.info.city.name;
			var monthlyPrice1 = topCity1.cost.nomad.USD;
			var coworkingPrice1 = topCity1.cost.coworking.monthly.USD;
			var coffeePrice1 = topCity1.cost.coffee_in_cafe.USD;
			var image1 = topCity1.media.image[500]; //think we need to add the API url to start of this to make it display as image on page? 

	//these are the variables for Country 2's top city
			var cityName2 = topCity2.info.city.name;
			var monthlyPrice2 = topCity2.cost.nomad.USD;
			var coworkingPrice2 = topCity2.cost.coworking.monthly.USD;
			var coffeePrice2 = topCity2.cost.coffee_in_cafe.USD;
			var image2 = topCity2.media.image[500]; 

	//these are the variables for Country 2's top city
			var cityName3 = topCity3.info.city.name;
			var monthlyPrice3 = topCity3.cost.nomad.USD;
			var coworkingPrice3 = topCity3.cost.coworking.monthly.USD;
			var coffeePrice3 = topCity3.cost.coffee_in_cafe.USD;
			var image3 = topCity3.media.image[500]; 

};



placesApp.mrsubmit = function(){
	
	$('form').on('submit', function(e){
		e.preventDefault();

		placesApp.country1 = $('#country1').val();
		placesApp.country2 = $('#country2').val();
		placesApp.country3 = $('#country3').val();

		placesApp.getPlaces();

	});

};

// then take each city
	// & get photo, avg monthly price, avg co-working space price monthly, avg price of cup of coffee, best months to visit 

	// convert all price information to user's selected currency
// display all this information in user's selected currency, ranked by top-rated city out of 3 top ranked cities. Link each option to Nomad Listing? 



//this is the displayPlaces function - displays the information on the page
placesApp.displayPlaces = function(){
}; //this is the end of the displayPlaces function



//this is the init function
placesApp.init = function(){
	placesApp.mrsubmit();
}; //init function ends




//this is the doc ready
$(function(){
	placesApp.init();
}); //this ends the doc ready