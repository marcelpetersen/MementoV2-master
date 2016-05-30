app.controller('DashCtrl', function(Auth, $state, $scope, $rootScope, User) {
    /*
     $scope.showAlert = function() { // affichage d'une popup d'alert apres inscription success

     var alertPopup = $ionicPopup.alert({
     title: 'Bienvenu ' + userName,
     template: 'Votre compte à correctement été créé !'
     });

     $timeout(function() {
     alertPopup.close(); //close the popup after 6 seconds
     }, 6000);
     };
     $scope.showAlert();
     */

    Auth.ref().onAuth(function(authData) {
        if (authData) {
        $scope.logOut = function () {
            Auth.ref().unauth();
            $state.go('SignIn');
        };
            console.log("Authenticated with uid:", authData.uid);
        } else {
            console.log("Client unauthenticated.");
            $state.go('SignIn');
        }
    });

});