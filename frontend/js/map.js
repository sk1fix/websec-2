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
        const placemark = new ymaps.Placemark([city.lat, city.lon], { hintContent: city.name });
        placemark.events.add('click', function () {
            showWeather(city);
        });
        map.geoObjects.add(placemark);
    });
}

function showWeather(city) {
    const target = [city.lat, city.lon];
    const targetZoom = 8;

    let currentCenter = map.getCenter();
    let currentZoom = map.getZoom();
    let steps = 20; 
    let i = 0;

    const interval = setInterval(() => {
        i++;
        const lat = currentCenter[0] + (target[0] - currentCenter[0]) * (i / steps);
        const lon = currentCenter[1] + (target[1] - currentCenter[1]) * (i / steps);
        map.setCenter([lat, lon], currentZoom);

        const zoom = currentZoom + (targetZoom - currentZoom) * (i / steps);
        map.setZoom(zoom);

        if (i >= steps) clearInterval(interval);
    }, 20); 

    getWeather(city.lat, city.lon, function(data) {
        drawCharts(data);
        document.getElementById('weatherPanel').style.display = 'block';
    });
}

function initSearch() {
    const $input = $('#search');
    const $results = $('#results');

    $input.on('input', function () {
        const value = $input.val().toLowerCase();
        $results.empty();
        if (!value) return;

        const filtered = cities.filter(c => c.name.toLowerCase().includes(value));
        filtered.forEach(city => {
            $results.append(`<div class="item">${city.name}</div>`);
        });

        $('.item').on('click', function () {
            const name = $(this).text();
            const city = cities.find(c => c.name === name);
            if (!city) return;

            showWeather(city);

            $results.empty();
            $input.val(name);
        });
    });
}

$(document).ready(function () {
    initMap();
    initSearch();

    $('#closeWeather').on('click', function () {
        $('#weatherPanel').hide();
    });
});