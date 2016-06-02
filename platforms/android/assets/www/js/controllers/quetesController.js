app.controller('QueteCtrl', function($scope, $ionicPopup, $state) {

    /* partie logique*/

    $scope.user={};

    $scope.answer = function () {

        var goodAnswer = 'croix de savoie';
        
        if($scope.user.answer == goodAnswer){
            $ionicPopup.alert({
                title: 'Réponse validé',
                template: 'Vous avez trouvé la bonne réponse !'
            }).then(function () {
                $state.go('tab.quete');
            });
        }else if($scope.user.answer == null){
            $ionicPopup.alert({
                title: 'Réponse non validé',
                template: 'Veuillez entrer une réponse'
            });
        }else{
            $ionicPopup.alert({
                title: 'Réponse non validé',
                template: 'Mauvaise réponse !'
            });
        }
    };
    
});
