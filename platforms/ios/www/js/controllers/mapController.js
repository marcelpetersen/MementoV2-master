app.controller('MapCtrl', function($window, $scope, $state, $cordovaGeolocation, MapService, $ionicLoading, User, Auth, $stateParams) {


    $scope.Scan = function () {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            var data = JSON.stringify(imageData);

            if(data.cancelled == true){
                var getAuth = Auth.ref().getAuth();
                var ref = Auth.ref().child(getAuth.uid).child('markers').child('-KJDV4Gp4ZN7k5ZKyyap');
                var markerObject1 = User.getMarkerObject1();
                markerObject1.$remove().then(function(ref) {
                    console.log('ok');
                    $state.go($state.current, {}, {reload: true});
                }, function(error) {
                    console.log("Error:", error);
                });
            }else{
                console.log('error indice');
            }

            console.log(data);

        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };


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

            var markerData = User.getMarkerObject();

           markerData.$loaded()
                .then(function() {
                    angular.forEach(markerData, function (marker) {
                        // Get latitude and longitude from Firebase.
                        console.log(marker);

                        var latLng = new google.maps.LatLng(marker.lat, marker.lng);
                        var customIcon1= "../../img/iconeMap.png";
                        // Place a marker at that location.
                        var marker = new google.maps.Marker({
                            position: latLng,
                            map: $scope.map,
                            icon: customIcon1
                        });
                    })
                })
                .catch(function(error) {
                    console.error("Error:", error);
                });
            
            $scope.logOut = function () {


            };


            /*
                        MapService.markerArray().on("child_added", function(snapshot, prevChildKey) {
                            // Get latitude and longitude from Firebase.
                            var marker = snapshot.val();

                            var latLng = new google.maps.LatLng(marker.lat, marker.lng);
                            var customIcon1= "../../img/iconeMap.png";
                            // Place a marker at that location.
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: $scope.map,
                                icon: customIcon1
                            });
                        });
             */
            $ionicLoading.hide()
        }, function (error) {
            console.log("Could not get location");
        });
    };
});
