app.factory('MapService', function (furl) {

    var ref = new Firebase(furl);

    return{

        markerArray : function () {
            var getAuth = ref.getAuth();
            return ref.child(getAuth.uid).child('markers');
        }

    }
});
