app.controller('UserCtrl', function($scope, $state, Auth, $firebaseArray, MapService, $firebaseAuth, $ionicLoading, $rootScope){

    Auth.ref().onAuth(function(authData) {
        if (authData) {
            console.log("Authenticated with uid:", authData.uid);
            $state.go('tab.dash');
        } else {
            console.log("Client unauthenticated.");

            var isNewUser = true;

            var userName = {};

            $scope.user = {};

            $scope.register = function() { //creation du compte dans la base de donnée
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $rootScope.username= $scope.user.name;

                $scope.error = null;
                $scope.message = null;

                Auth.ref().createUser({ // fonction createUser ( fonction firebase native) permet de d'enregistrer pass et mail
                    email: $scope.user.email,
                    password: $scope.user.password,
                    username: $scope.user.username
                },function(error, userData){
                    if (error) {
                        $ionicLoading.hide();
                        console.log("Error creating user:", error.code , error.message);
                    } else if(!error) {
                        console.log("Successfully created user account with uid:", userData.uid);
                    }
                }).then(function () {
                    Auth.ref().authWithPassword({ // ici on connecte immédiatement l'user apres l'enregistrement
                        email: $scope.user.email, // fonction AutWithPassword (firebase function native) permet de connecter l'user
                        password: $scope.user.password
                    }, function (error, userData) {
                        if(error){
                            $ionicLoading.hide();
                            console.log("Login Failed!", error.code , error.message);
                        }else{

                            console.log("Authenticated successfully with payload:", userData.uid);
                        }
                    }).then(function () {
                        var getAuth = Auth.ref().getAuth();
                        if($scope.user.sense){
                            Auth.ref().child(getAuth.uid).child('user-profil').set({ // ici on sélectionne l'id de l'user grace a Auth.getCurrentUserLoginData().uid,
                                provider: getAuth.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
                                name: $scope.user.username,
                                team: 'sense'// dans BDD, on a genre  =  firebase > UID > username & provider
                            });
                            MapService.markerArray().push({lat:48.89022 , lng: 2.34500});
                            MapService.markerArray().push({lat:48.88118 , lng: 2.31067});
                            $state.go('tab.dash');//redirection vers home
                            $ionicLoading.hide();
                        }else{
                            Auth.ref().child(getAuth.uid).child('user-profil').set({ // ici on sélectionne l'id de l'user grace a Auth.getCurrentUserLoginData().uid,
                                provider: getAuth.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
                                name: $scope.user.username,
                                team :'logique'// dans BDD, on a genre  =  firebase > UID > username & provider
                            });
                            MapService.markerArray().push({lat:48.89022 , lng: 2.34500});
                            MapService.markerArray().push({lat:48.88118 , lng: 2.31067});
                            $state.go('tab.dash');//redirection vers home
                            $ionicLoading.hide();
                        }
                    });

                })
            };

            $scope.userData = function(error){ //creation du profile de l'user avec des info complémentaire
                //var Auth.getCurrentUserLoginData() = Auth.getCurrentUserLoginData();
                if(isNewUser){
                    var getAuth = Auth.ref().getAuth();
                    Auth.ref().child(getAuth.uid).set({ // ici on sélectionne l'id de l'user grace a Auth.getCurrentUserLoginData().uid,
                        provider: getAuth.provider, // puis on crée un "child" (enfant) et on y insere l'username et le provider
                        name: $scope.user.username // dans BDD, on a genre  =  firebase > UID > username & provider
                    });

                    MapService.markerArray().push({lat:48.89022 , lng: 2.34500});
                    MapService.markerArray().push({lat:48.88118 , lng: 2.31067});

                    $state.go('tab.dash');//redirection vers home
                }else{
                    console.log("Datase error", error.code, error.message)
                }
            };

            $scope.loginFB = function () {
                var authFb = $firebaseAuth(Auth.ref());
                authFb.$authWithOAuthPopup('facebook').then(function (authData) {
                    console.log(authData)
                }).catch(function (error) {
                    console.log('error' + error)
                })
            };

            $scope.login= function() {
                var getAuth = Auth.ref().getAuth();
                $scope.error = null;
                $scope.message = null ;

                Auth.ref().authWithPassword({ // ici authWithPassword permet de comparer pass/email entré avec pass/email dans firebase.
                    email: $scope.user.email,
                    password: $scope.user.password
                },function(error,authData){
                    if (error) {
                        console.log("Login failed:", error);
                    } else {

                        console.log("Authenticated successfully with payload:", authData.uid);

                        console.log("Authenticated successfully with payload:", Auth.getAuth.uid);
                        $state.go('tab.dash')
                    }
                })
            };
        }
    });



});
