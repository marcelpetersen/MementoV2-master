app.controller('UserCompCtrl', function ($state, $scope , $ionicLoading, Auth, MapService, $ionicPopup) {

    $scope.user= {};

    $scope.userData = function(error){
        $ionicLoading.show({
            template: 'Loading...'
        });

        if($scope.user.username == null){
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Information non valide',
                template: 'Veuillez entrer un pseudo'
            });


        }else if($scope.user.sens == null && $scope.user.logique == null){
            $ionicLoading.hide();
            $ionicPopup.alert({
                title: 'Information non valide',
                template: 'Veuillez choisir une équipe'
            });
        }else{
                var getAuth = Auth.ref().getAuth();
                if($scope.user.sens){
                    Auth.ref().child(getAuth.uid).child('user-profil').set({ // ici on sélectionne l'id de l'user grace a Auth.getCurrentUserLoginData().uid,
                        provider: getAuth.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
                        name: $scope.user.username,
                        team: 'sense'// dans BDD, on a genre  =  firebase > UID > username & provider
                    });
                    MapService.markerArray().push({lat:48.89022 , lng: 2.34500});
                    MapService.markerArray().push({lat:48.88118 , lng: 2.31067});
                    $state.go('Tuto1');//redirection vers home
                    $ionicLoading.hide();
                }else{
                    Auth.ref().child(getAuth.uid).child('user-profil').set({ // ici on sélectionne l'id de l'user grace a Auth.getCurrentUserLoginData().uid,
                        provider: getAuth.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
                        name: $scope.user.username,
                        team :'logique'// dans BDD, on a genre  =  firebase > UID > username & provider
                    });
                    MapService.markerArray().push({lat:48.89022 , lng: 2.34500});
                    MapService.markerArray().push({lat:48.88118 , lng: 2.31067});
                    $state.go('Tuto1');//redirection vers home
                    $ionicLoading.hide();
                }

            }
        }

});