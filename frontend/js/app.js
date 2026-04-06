let cities = [];

$(document).ready(function () {
    getCities(function (data) {
        cities = data;
    });
});

$('#closeWeather').on('click', function () {
    $('#weatherPanel').hide();
});