app.controller('ChatsCtrl', function($scope, $firebaseArray, Auth, $rootScope, User){




    $scope.messages = $firebaseArray(Auth.ref().child('tchat'));
    
    $scope.sendMsg = function() {
        $scope.messages.$add({
            'username': $rootScope.username,
            'date' : new Date().getTime(),
            'content': $scope.contente,
            'team': $rootScope.team
        });
        $scope.contente = '';
    };

});
