function getCities(callback) {
  $.get('/api/cities', callback);
}

function getWeather(lat, lon, callback) {
  $.get(`/api/weather?lat=${lat}&lon=${lon}`, function(data) {
    console.log("WEATHER DATA:", data); // ← ВАЖНО
    if (callback) callback(data);
  });
}