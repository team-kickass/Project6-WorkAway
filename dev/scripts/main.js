var currencyApiKey = '9896895338c0fda481213ecbf853dcd7'


var currencyApp = {};
//get the people's country input (drop-down)

currencyApp.userInput = "United Arab Emirates Dirham"; //change to userinput value

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
		url: 'http://apilayer.net/api/live', //live
		method: 'GET',
		dataType: 'json',
		data: {
			access_key: currencyApiKey,
			currencies: userInput //'GBP', 
		}
	}).then(function(rate){
		var currencyRate = rate.quotes;
		// console.log(currencyRate);
		currencyApp.rateNumber = Object.keys(currencyRate).map(function(key){return currencyRate[key]});
		console.log(currencyApp.rateNumber);

	});
};

//Display the amount
currencyApp.times = function(amount){
	return currencyApp.rateNumber * amount;
};

// var amount = 1000; 

//init
currencyApp.init = function() {
	currencyApp.getCode();
	console.log(currencyApp.times()); //(nomadPrice)
};

$(function(){
	currencyApp.init();
});
