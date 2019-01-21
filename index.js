//https://gis.stackexchange.com/questions/116205/multiple-simultaneous-tilelayers-in-leaflet

var numSquares = 0;
var latlongs = [];
var map = L.map('map', {
    crs: L.CRS.Simple,
    maxBoundsViscosity: 1,
});

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        marker: false,
        circle: false,
        polyline: false,
    },
    edit: {
        featureGroup: drawnItems,
        selectedPathOptions: {
            maintainColor: true,
            moveMarkers: true
        }
    }
});
map.addControl(drawControl);
map.on('draw:created', function (e) {
    if (numSquares < 4) {
        var type = e.layerType,
            layer = e.layer;
        latlongs.push(layer.getLatLngs());
        drawnItems.addLayer(layer);
        numSquares++;
    }
});

var bounds = [
               [0, 0],
               [700, 700]
           ];

Caman('#canvas', "channel_2.png", function () {
    this.channels({
        red: 0,
        green: 0,
        blue: 30
    }).render(function () {


        var image = L.imageOverlay(this.canvas.toDataURL("image/png"), bounds, {
            opacity: 0.5
        }).addTo(map);

        map.fitBounds(bounds);
        console.log(base64);
    });
});


Caman('#canvas1', "channel_1.png", function () {
    this.channels({
        red: 30,
        green: 0,
        blue: 0
    }).render(function () {
        var image2 = L.imageOverlay(this.canvas.toDataURL("image/png"), bounds, {
            opacity: 0.5
        }).addTo(map);
        map.fitBounds(bounds);
        console.log(base64);
    });
});
