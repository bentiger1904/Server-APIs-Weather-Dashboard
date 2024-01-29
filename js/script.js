var key = '00759cf9fde969fcc6f88e4e60b5d462';
var city = "London"

//Current time and date
var date = moment().format('dddd, Do MMMM YYYY');
var dateTime = moment().format('YYYY-MM-DD HH:MM:SS')

var savedSearch = [];
//Saves the value of the search
$('.search').on("click", function (event) {
	event.preventDefault();
	city = $(this).parent('.btnApp').siblings('.formInput').val().trim();
	if (city === "") {
		return;
	};
	savedSearch.push(city);

	localStorage.setItem('city', JSON.stringify(savedSearch));
	
	getPrevious();
	todaysWeather();
	fiveDayE1();
});
//Will create buttons based on search history 
var previousSearchEL = $('.savedSearch');
function getPrevious() {
	previousSearchEL.empty();

	for (let i = 0; i < savedSearch.length; i++) {

		var rowEl = $('<row>');
		var btnEl = $('<button>').text(`${savedSearch[i]}`)

		rowEl.addClass('row savedButtonSearch');
		btnEl.addClass('btn btn-warning btn-outline-dark font-weight-bold btnSaved');
		btnEl.attr('type', 'button');

		previousSearchEL.prepend(rowEl);
		rowEl.append(btnEl);
	} if (!city) {
		return;
	}
	//Allows the buttons to start a search as well
	$('.btnSaved').on("click", function (event) {
		event.preventDefault();
		city = $(this).text();
		todaysWeather();
		fiveDayE1();
	});
};

//Grab the main card body.
var cardBody = $('.todayCard')

function todaysWeather() {
	var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;
	
	$(cardBody).empty();

	fetch(weatherURL)
		.then(response => response.json())
		.then(data => {
			// Update city name
			$('.todayCardName').text(data.name);
			$('.todayCardDate').text(date);
			//Weather emojis
			const emojiUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			$('.emojis').attr('src', emojiUrl);
			
			// Convert temperature from Fahrenheit to Celsius
			const celsiusTemperature = ((data.main.temp - 32) * 5/9).toFixed(2);
			// Create and append temperature element
			const tempElement = $('<p>').text(`Temperature: ${celsiusTemperature}°C`);
			cardBody.append(tempElement);
			// Convert feels like from Fahrenheit to Celsius
			const feelsLikeCelsius = ((data.main.feels_like - 32) * 5/9).toFixed(2);
			// Create and append feels like element
			const feelsLikeElement = $('<p>').text(`Feels like: ${feelsLikeCelsius}°C`);
			cardBody.append(feelsLikeElement);

			// Humidity
			const humidityElement = $('<p>').text(`Humidity: ${data.main.humidity}%`);
			cardBody.append(humidityElement);

			// Wind speed
			const windSpeedElement = $('<p>').text(`Wind speed: ${data.wind.speed} MPH`);
			cardBody.append(windSpeedElement);
		})

		fiveDayE1();
	};

    // Five day forecast
function fiveDayE1() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${key}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const fiveDayEl = $('.fiveDay');
			fiveDayEl.empty();
            // Loop through the next 5 days
            for (let i = 0; i < 5; i++) {
                const date1 = moment(data.list[i].dt_txt).format('dddd, Do MMMM');
				console.log(date1);
                
                // Create card
                const card = $('<div>').addClass('forecastCard');
                card.attr('class', 'card text-white bg-info mb-3 cardOne');
                card.attr('style', 'max-width: 240px;');
                
                // Head of the card
                const divElement = $('<div>').text(date1);
                divElement.attr('class', 'card-header bg-warning text-dark font-weight-bold')
                card.append(divElement);
                
                // Body of the card
                const divBody = $('<div>');
                divBody.attr('class', 'card-body');
                
                // Convert temperature from Fahrenheit to Celsius
                const celsiusTemperature = ((data.list[i].main.temp - 32) * 5/9).toFixed(2);
                const tempElement = $('<p>').text(`Temperature: ${celsiusTemperature}°C`);
                divBody.append(tempElement);

                // Convert feels like from Fahrenheit to Celsius
                const feelsLikeCelsius = ((data.list[i].main.feels_like - 32) * 5/9).toFixed(2);
                const feelsLikeElement = $('<p>').text(`Feels like: ${feelsLikeCelsius}°C`);
                divBody.append(feelsLikeElement);

                const humidityElement = $('<p>').text(`Humidity: ${data.list[i].main.humidity}%`);
                divBody.append(humidityElement);

                const windSpeedElement = $('<p>').text(`Wind speed: ${data.list[i].wind.speed} MPH`);
                divBody.append(windSpeedElement);

                card.append(divBody);

                // Append the card to the container
                fiveDayEl.append(card);
            }
        });
}

//Allows for the example data to load for London
function load() {

	var savedSearchStore = JSON.parse(localStorage.getItem('city'));

	if (savedSearchStore !== null) {
		savedSearch = savedSearchStore
	}
	getPrevious();
	todaysWeather();
};

load();