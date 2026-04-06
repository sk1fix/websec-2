let map;

function initMap() {
    ymaps.ready(function () {
        map = new ymaps.Map("map", {
            center: [55.75, 37.61],
            zoom: 4,
            controls: [] 
        });

        renderMarkers();
    });
}

function renderMarkers() {
    if (!map || !cities) return;

    map.geoObjects.removeAll();

    cities.forEach(city => {
        const placemark = new ymaps.Placemark(
            [city.lat, city.lon],
            { hintContent: city.name }
        );

        placemark.events.add('click', function () {
            getWeather(city.lat, city.lon, function (data) {
                drawCharts(data);
                document.getElementById('weatherPanel').style.display = 'block';
            });
        });

        map.geoObjects.add(placemark);
    });
}