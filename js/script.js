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