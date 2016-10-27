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
		// allNomadScores = []; //this is the empty array for the nomadScore
		// console.log(placesApp.country1);


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
			var nomadURL1 = topCity1.info.city.url;
			var cityName1 = topCity1.info.city.name;
			var monthlyPrice1 = topCity1.cost.nomad.USD;
			var coworkingPrice1 = topCity1.cost.coworking.monthly.USD;
			var coffeePrice1 = topCity1.cost.coffee_in_cafe.USD;
			var image1 = topCity1.media.image[500]; //think we need to add the API url to start of this to make it display as image on page? 
			placesApp.country1 = placesApp.displayPlaces(nomadURL1, cityName1, monthlyPrice1, coworkingPrice1, coffeePrice1, image1);

// console.log(cityName1,currencyApp.times(monthlyPrice1), currencyApp.times(coworkingPrice1), currencyApp.times(coffeePrice1), image1);
	//these are the variables for Country 2's top city
			var nomadURL2 = topCity2.info.city.url;
			var cityName2 = topCity2.info.city.name;
			var monthlyPrice2 = topCity2.cost.nomad.USD;
			var coworkingPrice2 = topCity2.cost.coworking.monthly.USD;
			var coffeePrice2 = topCity2.cost.coffee_in_cafe.USD;
			var image2 = topCity2.media.image[500]; 
			
			placesApp.country2 = placesApp.displayPlaces(nomadURL2, cityName2, monthlyPrice2, coworkingPrice2, coffeePrice2, image2);
// console.log(cityName2, currencyApp.times(monthlyPrice2), currencyApp.times(coworkingPrice2), currencyApp.times(coffeePrice2), image2);
	//these are the variables for Country 2's top city
			var nomadURL3 = topCity3.info.city.url;
			var cityName3 = topCity3.info.city.name;
			var monthlyPrice3 = topCity3.cost.nomad.USD;
			var coworkingPrice3 = topCity3.cost.coworking.monthly.USD;
			var coffeePrice3 = topCity3.cost.coffee_in_cafe.USD;
			var image3 = topCity3.media.image[500]; 

			placesApp.country3 = placesApp.displayPlaces(nomadURL3, cityName3, monthlyPrice3, coworkingPrice3, coffeePrice3, image3);
// console.log(cityName3, currencyApp.times(monthlyPrice3), currencyApp.times(coworkingPrice3), currencyApp.times(coffeePrice3), image3);

};



placesApp.mrsubmit = function(){
	
	$('form').on('submit', function(e){
		e.preventDefault();

		placesApp.country1 = placesApp.countryArray[0];
		placesApp.country2 = placesApp.countryArray[1];
		placesApp.country3 = placesApp.countryArray[2];

		placesApp.getPlaces();

		

		currencyApp.userInput = $('#currency').val();
		console.log(currencyApp.userInput);
		currencyApp.getCode();
	});

};

// then take each city
	// & get photo, avg monthly price, avg co-working space price monthly, avg price of cup of coffee, best months to visit 

	// convert all price information to user's selected currency
// display all this information in user's selected currency, ranked by top-rated city out of 3 top ranked cities. Link each option to Nomad Listing? 


 
//this is the displayPlaces function - displays the information on the page
placesApp.displayPlaces = function(nomadURL, cityName, monthlyPrice, coworkingPrice, coffeePrice, image){
	var $countryBox = $('<article>').addClass('countryBox');
	var $imgBox = $('<div>').addClass('imgBox');
	var $cityImage = $('<img>').attr({
		src: 'https://nomadlist.com' + image,
	});
	var $contentBox =  $('<div>').addClass('contentBox')
	var $link = $('<a>').attr({
		href: 'https://nomadlist.com' + nomadURL,
		target: "_blank"
	});
	var $cityName = $('<h2>').text(cityName);
	var $monthlyPrice = $('<p>').text('Monthly Living Cost: ' + currencyApp.times(monthlyPrice));
	var $coworkingPrice = $('<p>').text('Monthly CoWorking Cost: ' + currencyApp.times(coworkingPrice));
	var $coffeePrice = $('<p>').text('Price of Coffee:' + currencyApp.times(coffeePrice));

	$link.append($cityName);
	$imgBox.append($cityImage);
	$contentBox.append($link,$monthlyPrice,$coworkingPrice,$coffeePrice);
	$countryBox.append($imgBox, $contentBox);
	$('#cityData').append($countryBox);

//placesApp.country1, placesApp.country2, placesApp.country3
}; //this is the end of the displayPlaces function




//this is the init function
placesApp.init = function(){
	placesApp.mrsubmit();
}; //init function ends




////////////////////////////////////////////////////////////////

var currencyApiKey = '9896895338c0fda481213ecbf853dcd7'

var currencyApp = {};
//get the people's country input (drop-down)

// currencyApp.userInput = "United Arab Emirates Dirham"; //change to userinput value

//get the 3-digit code
currencyApp.getCode = function(){
	$.ajax({
		url: 'http://apilayer.net/api/list',
		method: 'GET',
		dataType: 'json',
		data:{
			access_key: currencyApiKey
		}
	}).then(function(dropDown){
		var countryList = dropDown.currencies;
		console.log(countryList);
		Object.keys(countryList).forEach(function(key, keyIndex) {
		  // console.log("index:",keyIndex,"key:",key,"value:", countryList[key]);
		  if (countryList[key] === currencyApp.userInput){
		  	currencyApp.countryCode = key
		  };
		});

		// console.log(currencyApp.countryCode);
		currencyApp.getRate(currencyApp.countryCode);
	});
};


//convert using the exchange rate -NEED to run 3x for all selected countries or just use to get the currency rate and covert it ourselves
currencyApp.getRate = function(userInput) {
	$.ajax({
		url: 'http://apilayer.net/api/live', 
		method: 'GET',
		dataType: 'json',
		data: {
			access_key: currencyApiKey,
			currencies: userInput, 
		}
	}).then(function(rate){
		var currencyRate = rate.quotes;
		// console.log(currencyRate);
		currencyApp.rateNumber = Object.keys(currencyRate).map(function(key){return currencyRate[key]});
		console.log(currencyApp.rateNumber);

	});
};

//create function for getting right currency value
currencyApp.times = function(amount){
	if (currencyApp.countryCode === 'KRW') {
		return '₩' + (currencyApp.rateNumber * amount).toFixed(0);
	} else if (currencyApp.countryCode === 'JPY') {
		return '¥' + (currencyApp.rateNumber * amount).toFixed(0);
	} else if (currencyApp.countryCode === 'EUR') {
		return '€' + (currencyApp.rateNumber * amount).toFixed(2);
	} else if (currencyApp.countryCode === 'GBP') {
		return '£' + (currencyApp.rateNumber * amount).toFixed(2);
	} else if (currencyApp.countryCode === 'CHF') {
		return 'Fr' + (currencyApp.rateNumber * amount).toFixed(2);
	} else if (currencyApp.countryCode === 'CNY') {
		return '元' + (currencyApp.rateNumber * amount).toFixed(2);
	} else if (currencyApp.countryCode === 'SEK') {
		return 'Kr' + (currencyApp.rateNumber * amount).toFixed(2);
	} else if (currencyApp.countryCode === 'RUB') {
		return '₽' + (currencyApp.rateNumber * amount).toFixed(2);
	} else {
		return '$' + (currencyApp.rateNumber * amount).toFixed(2);
	};
};



$(function(){
	placesApp.init();
	placesApp.countryArray = [];
	var selectedCountry = undefined;
	  jQuery('#vmap').vectorMap({
	    map: 'world_en',
	    backgroundColor: 'transparent',
	    borderColor: '#fff',
	    borderOpacity: 0.25,
	    borderWidth: 1,
	    color: '#E4572E',
	    enableZoom: false,
	    hoverColor: '#F3A712',
	    hoverOpacity: null,
	    multiSelectRegion: true,
	    normalizeFunction: 'linear', 
	    scaleColors: ['#b6d6ff', '#005ace'],
	    selectedColor: '#29335C',
	    selectedRegions: null,
	    showTooltip: true,
		onRegionClick: function(event, code, region)
		{
			console.log(region);
			selectedCountry = region;
			//Check if there are 3 selected
			if (placesApp.countryArray.length >= 3) {
				console.log('Greater')
				//Check to see if the new selected region is in the list already
				var selectedIndex = placesApp.countryArray.indexOf(selectedCountry);
				if(placesApp.countryArray.indexOf(selectedCountry) >= 0) {
					//If so remove it
					placesApp.countryArray.splice(selectedIndex,1);
				}
				else {
					//If it is not! Prevent the map from selected anything else
					event.preventDefault();
				}
			}
			else {
				//If there are LESS than 3 selected, do the thing
				placesApp.countryArray.push(selectedCountry);
			}
		},   
	  //   onRegionSelect: function(event, code, region)
	  //   {
	  //       if (placesApp.countryArray.length >= 3 && selectedCountry !== '') {

	  //       	console.log("working", selectedCountry);
			// 	placesApp.countryArray.pop(selectedCountry);
			// } 
			// else if (placesApp.countryArray.length < 3) {
			// 	placesApp.countryArray.push(selectedCountry);
			// 	console.log(placesApp.countryArray)
			// } 
			// else {
			// 	console.log(placesApp.countryArray)
	  //       	console.log("reached limit");
			// 	event.preventDefault();
			// }
	  //   },
	  //   onRegionDeselect: function(event, code, region)
	  //   {
	  //   	var deselectedCountry = region;
	  //   	placesApp.countryArray.pop(deselectedCountry);
	  //   	console.log(placesApp.countryArray);
	  //   }
	});
});