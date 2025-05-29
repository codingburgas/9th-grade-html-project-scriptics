const mapDiv = document.getElementById("map");
if (mapDiv) {
    const map = L.map("map");

    map.fitBounds([
        [41.235, 22.357], // Southwest corner of Bulgaria
        [44.216, 28.612] // Northeast corner
    ]);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
    }).addTo(map);

    map.on("click", function(e) {
        document.getElementById("lat").value = e.latlng.lat.toFixed(6);
        document.getElementById("lng").value = e.latlng.lng.toFixed(6);
    });
}