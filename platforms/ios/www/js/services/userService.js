app.service('User', function (Auth, $firebaseObject, $rootScope) {


    var getAuth = Auth.ref().getAuth();
    var userObj = $firebaseObject(Auth.ref().child(getAuth.uid));

    userObj.$loaded()
        .then(function (data) {
            $rootScope.username = data.name;
            console.log(data.name);
        })
        .catch(function (error) {
            console.error("Error", error);
        });

});
