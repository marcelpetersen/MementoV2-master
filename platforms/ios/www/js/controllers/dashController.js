app.controller('DashCtrl', function(Auth, $state, $scope) {
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

    $scope.logOut = function () {
        Auth.ref().unauth();
        $state.go('SignIn');
    }
});