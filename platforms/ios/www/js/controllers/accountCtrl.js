app.controller('AccountCtrl',function ($scope, $rootScope, User, Auth, $state, $ionicPopup) {


    Auth.ref().onAuth(function(authData) {
        if (authData) {
            $scope.user = {};
            
            $scope.logOut = function () {
              Auth.ref().unauth();
                $state.go('SignIn');
            };

          $scope.changePassword = function () {
              Auth.ref().changePassword({
                  email       : $scope.user.email,
                  oldPassword : $scope.user.oldPassword,
                  newPassword : $scope.user.newPassword
              }, function(error) {
                  if (error === null) {

                      console.log("Password changed successfully");
                      $ionicPopup.alert({
                          title: 'Mise à jour',
                          template: 'Mot de passe modfié'
                      }).then(function () {
                          $state.go('tab.map')
                      });
                  } else {
                      console.log("Error changing password:", error);
                  }
              });
          }

        } else {
            $state.go('SignIn')
        }
    });


});