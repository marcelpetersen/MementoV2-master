app.controller('AccountCtrl',function ($scope, $rootScope, User, Auth, $state) {


    Auth.ref().onAuth(function(authData) {
        if (authData) {

        } else {
            $state.go('SignIn')
        }
    });


});