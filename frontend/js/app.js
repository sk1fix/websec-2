let cities = [];

$(document).ready(function () {
    initMap();

    getCities(function (data) {
        cities = data;
        renderMarkers();

        $('#search').on('input', function () {
            const value = $(this).val().toLowerCase();
            $('#results').html('');

            const filtered = cities.filter(c => c.name.toLowerCase().includes(value));

            filtered.forEach(city => {
                $('#results').append(`<div class="item">${city.name}</div>`);
            });

            $('.item').on('click', function () {
                const name = $(this).text();
                const city = cities.find(c => c.name === name);

                if (!city) return;

                map.setCenter([city.lat, city.lon], 8);
                $('#results').html('');
                $('#search').val(name);

                getWeather(city.lat, city.lon, function (data) {
                    drawCharts(data);

                    document.getElementById('weatherPanel').style.display = 'block';
                });
            });
        });

    });
});
$('#closeWeather').on('click', function () {
    $('#weatherPanel').hide();
});