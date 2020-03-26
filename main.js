(function(){
    var timer;
    var msRemaining = 60000;
    var timerDiv;

    document.addEventListener('DOMContentLoaded', init);

    function init(){
        setupMap();
        initializeStartButton();
        initializeTimer();
    }

    function setupMap() {

        /********Hacker point */
        var hackerPoint = new ol.geom.Point(ol.proj.transform([-0.1676, 53.9108], 'EPSG:4326', 'EPSG:3857'));
        var stroke = new ol.style.Stroke({
            color: "black",
            width: 2
        });

        var fill = new ol.style.Fill({
            color: "gold"
        });

        var style = new ol.style.Style({
            image: new ol.style.Icon({
                src: './assets/hacker_icon.jpeg'
            })
        });

        var featureHacker = new ol.Feature({
            geometry: hackerPoint
        });

        featureHacker.setId('Hacker');
        featureHacker.setStyle(style);

        var myVectorSource = new ol.source.Vector({
            features: [featureHacker]
        });

        var myVectorLayer = new ol.layer.Vector({
            source: myVectorSource,
            maxResolution: 4
        });

        /******************* */



        var streetMapLayer = new ol.layer.Tile({
            source: new ol.source.OSM()
        });

        var myView = new ol.View({
            center: ol.proj.transform([-95, 45], 'EPSG:4326', 'EPSG:3857'),
            zoom: 3
        });

        var map = new ol.Map({
            target: 'map',
            layers: [streetMapLayer, myVectorLayer],
            view: myView,
            controls: ol.control.defaults().extend([new ol.control.OverviewMap({})])
        });


        map.on("click", function(evt){
            map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
                if (feature.getId() === 'Hacker') {
                    catchHacker();
                }
            });
        });

    }

    function initializeStartButton() {
        var startDiv = document.getElementById("start");
        startDiv.addEventListener("click", function() {
            quiz.style.display = "block";
            startDiv.style.display = "none";
            startTimer();
        });
    }

    function startTimer() 
    {
        timer = setInterval(function() {
            msRemaining -= 100;
            timerDiv.innerHTML = parseFloat(msRemaining/1000).toFixed(1);
            if (msRemaining == 0) {
                alert("The hacker has escaped!");
                clearInterval(timer);
            }

        }, 100);
    }

    function catchHacker(){
        if (timer) {
            clearInterval(timer);
            alert("You caught the hacker!");
        }
    }

    function initializeTimer() {
        timerDiv = document.getElementById('timer');
    }

})();