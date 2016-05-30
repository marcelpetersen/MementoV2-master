app.controller('UserCtrl', function($scope, $state, Auth, $firebaseArray, MapService){

    //Auth.ref().unauth();

    var isNewUser = true;

    var userName = {};

    $scope.user = {};

    $scope.register = function() { //creation du compte dans la base de donnée

        $scope.error = null;
        $scope.message = null;

        Auth.ref().createUser({ // fonction createUser ( fonction firebase native) permet de d'enregistrer pass et mail
            email: $scope.user.email,
            password: $scope.user.password
        },function(error, userData){
            if (error) {
                console.log("Error creating user:", error);
            } else if(!error) {
                console.log("Successfully created user account with uid:", userData.uid);
                Auth.ref().authWithPassword({ // ici on connecte immédiatement l'user apres l'enregistrement
                    email: $scope.user.email, // fonction AutWithPassword (firebase function native) permet de connecter l'user
                    password: $scope.user.password
                });
                console.log("Authenticated successfully with payload:", userData.uid);
                $state.go('UserData')
            }
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
            console.log("Datase error", error)
        }
    };

    $scope.login= function() {

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
                $state.go('tab.dash')
            }
        })
    };


});
