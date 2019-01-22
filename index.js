//https://gis.stackexchange.com/questions/116205/multiple-simultaneous-tilelayers-in-leaflet
console.log(coords[1][1])
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
})

var bounds = [
               [0, 0],
               [1024, 1024]
           ];
var lineLayer = L.featureGroup([]);

for (var i = 0; i < coords.length; i++) {

    var polyL = L.polyline(coords[i], {
        color: "#FF0000",
        smoothFactor: 1,
        weight: 15,
        opacity: 1
    });
    var index = i;
    polyL.properties = {
        index: index,
    };

    lineLayer.addLayer(polyL);
}

var selected = [];


console.log(lineLayer.getLayers()[1].properties);
lineLayer.eachLayer(function (layer) {
    layer.on('click', function () {
        var index = selected.indexOf(this.properties.index);
        if (index > -1) {
            selected.splice(index, 1);
            this.setStyle({
                color: '#FF0000'
            });
        } else {
            selected.push(this.properties.index);
            this.setStyle({
                color: '#0000FF'
            });
        }
        document.getElementById('url').innerText = selected;


    })
});



Caman('#canvas', "channel_2.png", function () {
    this.channels({
        red: 0,
        green: 0,
        blue: 0
    }).render(function () {
        var image = L.imageOverlay(this.canvas.toDataURL("image/png"), bounds, {
            opacity: 0.7
        }).addTo(map);
        map.fitBounds(bounds);
        // travel.bringToFront();
    });
});


Caman('#canvas1', "channel_3.png", function () {
    this.channels({
        red: 0,
        green: 0,
        blue: 0
    }).render(function () {
        var image2 = L.imageOverlay(this.canvas.toDataURL("image/png"), bounds, {
            opacity: 0.9
        }).addTo(map);
        image2.bringToBack();
        // travel.bringToFront();
        lineLayer.addTo(map);



    });
});
