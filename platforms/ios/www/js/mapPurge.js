app.controller("MapCtrl", function ($scope, $state, $cordovaGeolocation, MapService, $ionicLoading) {

    var options = {timeout: Infinity, enableHighAccuracy: false};   
    
    $scope.initMap = function () {
        
        $cordovaGeolocation
            .getCurrentPosition(options)
                .then(function (position) {
                    var lat  = position.coords.latitude;
                    var long = position.coords.longitude;
                    console.log(lat + '   ' + long)
                }, function(err) {
                    console.log(err + 'Could not get location')
                }
                );

        var watchOptions = {timeout : 3000, enableHighAccuracy: false};
        var watch = $cordovaGeolocation.watchPosition(watchOptions);

        watch.then(
            null,

            function(err) {
                console.log(err)
            },

            function(position) {
                var lat  = position.coords.latitude;
                var long = position.coords.longitude;
                console.log(lat + '' + long)
            }
        );

        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        //Wait until the map is loaded
        google.maps.event.addListener($scope.map, 'idle', function () {

            //marker de l'user
            var customIcon= "../../img/location-arrow.svg";
            var marker = new google.maps.Marker({
                map: $scope.map,
                animation: google.maps.Animation.DROP,
                position: latLng,
                icon: customIcon
            });
        });

        MapService.markerArray().on("child_added", function(snapshot, prevChildKey) {
            // Get latitude and longitude from Firebase.
            var newPosition = snapshot.val();

            var latLng = new google.maps.LatLng(newPosition.lat, newPosition.lng);

            // Place a marker at that location.
            var marker = new google.maps.Marker({
                position: latLng,
                map: $scope.map
            });
        });

    }
    
    
});