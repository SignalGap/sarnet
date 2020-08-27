window.onload = function () {
    // -88.110352,24.236947,-79.552002,31.765537
    var maxBounds = L.latLngBounds(
        L.latLng(23, -73), //Southwest
        L.latLng(33, -93) //Northeast
    );
    var map = L.map("map");
    L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", {
            minZoom: 7,
            maxZoom: 18,
            attribution: "Map data, Imagery &copy; <a href=\"https://www.openstreetmap.org\">OpenStreetMap</a>, <a href=\"https://www.mapbox.com\">Mapbox</a> and contributors. <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>",
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            center: [0, 0],
            zoom: 0,
            maxBounds
        }).addTo(map);
    map.setMaxBounds(maxBounds);
    map.fitBounds(maxBounds);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;
        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);

    map.locate({
        setView: true,
        maxZoom: 16
    });
};