app.controller('UserCtrl', function($scope, $state, Auth, MapService, $firebaseAuth, $ionicLoading, $rootScope, $ionicPopup){

    Auth.ref().onAuth(function(authData) {
       /* if (authData) {
            console.log("Authenticated with uid:", authData.uid);
            $state.go('tab.dash');*/
        //} else {
            console.log("Client unauthenticated.");

            var isNewUser = true;

            var userName = {};

            $scope.user = {};

            $scope.register = function() { //creation du compte dans la base de donnée

                    $rootScope.username= $scope.user.name;

                    $scope.error = null;
                    $scope.message = null;

                    Auth.ref().createUser({ // fonction createUser ( fonction firebase native) permet de d'enregistrer pass et mail
                        email: $scope.user.email,
                        password: $scope.user.password
                    },function(error, userData) {
                        if (error) {
                            $ionicPopup.alert({
                                title: 'Information non valide',
                                template: 'Veuillez entrer une email valide'
                            });
                           console.log("Error creating user:", error);
                        } else {
                            $ionicLoading.show({
                                template: 'Loading...'
                            });
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
                                $ionicLoading.hide();
                                $state.go('SignUpComp');
                            }
                        })

                    })


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
        //}
    });



});
