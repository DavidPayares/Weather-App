// Refresh Button Call

const GeolocationAPI = '7a9af4b4689c4183abb02673e955306c'
const WatherAPI = 'b7297dde26e5a7550482488d4d36e992'


//refresh Button
$(document).on("click", "#refresh", function () {
    //prevent the usual navigation behaviour
    event.preventDefault();

    //Get current Location
    $.ajax({
        url: 'https://api.ipgeolocation.io/ipgeo?apiKey=' + GeolocationAPI,

        success: function (data) {
            console.log(data);

            // Populate List
            PopulateList(data.latitude, data.longitude);

        }
    });
});


//Populate List Method
function PopulateList(lat, lon) {
    weather_url = 'https://api.openweathermap.org/data/2.5/find?'

    query_url = weather_url + 'lat=' + lat + "&lon=" + lon + "&APPID=" + WatherAPI + "&units=metric&cnt=30";
    $.getJSON(query_url, function (data) {
        console.log(data);

        stations = data.list
        $('station_list li').remove();

        $.each(stations, function (index, station) {
            $('#station_list').append('<li><a id="to_details" href="#">' + station.name +
                '<span id=' + index + ' class="ui-li-count">' + Math.round(station.main.temp) + '°C</span></a></li>');

        });

        $('#station_list').listview('refresh');

    })

}

$(document).on("pagebeforeshow", '#home', function () {
    $(document).on('click', '#to_details', function (e) {

        e.preventDefault();
        e.stopImmediatePropagation();

        currentStation = stations[e.target.children[0].id];

        $.mobile.changePage("#details");
    });
});


$(document).on('pagebeforeshow', '#details', function (e) {
    e.preventDefault();

    $('#stationIcon').attr('src','https://openweathermap.org/img/w/'+ currentStation.weather[0].icon + '.png');
    $('#stationName').text(currentStation.name);
    $('#stationDescription').text(currentStation.weather[0].description);
    $('#stationTemperature').text('Temperature: ' + currentStation.main.temp + '°');
    $('#stationHumidity').text('Humidity: ' + currentStation.main.humidity + '%');
    $('#stationPressure').text('Pressure: ' + Math.round(currentStation.main.pressure) + ' hpa');

});