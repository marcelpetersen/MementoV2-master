app.controller('DashCtrl', function(Auth, $state, $scope, $rootScope, User, ngProgressFactory) {

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