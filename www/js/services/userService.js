app.service('User', function (Auth, $firebaseObject, $rootScope, furl, $state) {

    var ref = new Firebase(furl);

    ref.onAuth(function(authData) {
        if (authData) {
            var getAuth = Auth.ref().getAuth();
            var userObj = $firebaseObject(Auth.ref().child(getAuth.uid));


            ref.child(getAuth.uid).child('user-profil').on('value',function (snapshot) {
                var userPofil = snapshot.val();
                $rootScope.username = userPofil.name;
                $rootScope.team = userPofil.team;
                $rootScope.Scopeteam = 'Equipe : ' + userPofil.team;
            });
            console.log("Authenticated with uid:", authData.uid);
        } else {
            console.log("Client unauthenticated.");
            $state.go('SignIn');
        }
    });

});
