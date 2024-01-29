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