app.service('User', function (Auth, $firebaseObject, $rootScope, furl, $firebaseObject) {

    var ref = new Firebase(furl);

    
            var getAuth = Auth.ref().getAuth();
    
            var markerObject = Auth.ref().child(getAuth.uid).child('markers');
    var markerObject1 = $firebaseObject(Auth.ref().child(getAuth.uid).child('markers').child('-KJDV4Gp4ZN7k5ZKyyap'));
    
    this.getMarkerObject1= function () {
      return markerObject1      
    };

    this.getMarkerObject = function () {
      return markerObject;  
    };
    
            var userObj = $firebaseObject(Auth.ref().child(getAuth.uid));
            ref.child(getAuth.uid).child('user-profil').on('value',function (snapshot) {
                var userPofil = snapshot.val();
                $rootScope.username = userPofil.name;
                $rootScope.team = userPofil.team;
                $rootScope.Scopeteam = 'Equipe : ' + userPofil.team;
            });

       

});
