app.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, MapService, $ionicLoading) {

    $ionicLoading.show({
        template: 'Loading...'
    });
var options = {timeout: Infinity, enableHighAccuracy: false};

    $scope.initMap = function(){

        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: latLng,
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
                var customIcon1= "../../img/iconeMap.png";
                // Place a marker at that location.
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: $scope.map,
                    icon: customIcon1
                });
            });
            $ionicLoading.hide()
        }, function (error) {
            console.log("Could not get location");
        });
    };
});
