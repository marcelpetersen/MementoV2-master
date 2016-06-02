var app = angular.module('starter', ['ionic', 'firebase', 'ngCordova' ,'ngCordovaOauth', 'ngProgress']);

app.constant('furl','https://mementov2.firebaseio.com/');
app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('top');
  $ionicConfigProvider.navBar.alignTitle('center');
  

  $stateProvider
      
  .state('SignIn', {
    url: '/SignIn',
    templateUrl: 'templates/signIn.html',
    controller: 'UserCtrl'
  })
  .state('SignInButton', {
    url: '/SignInButton',
    templateUrl: 'templates/signInButton.html',
    controller: 'UserCtrl'
  })
  .state('SignUp', {
    url: '/SignUp',
    templateUrl: 'templates/signUp.html',
    controller: 'UserCtrl'
  })
  .state('SignUpComp', {
    url: '/SignUpComp',
    templateUrl: 'templates/signUpComp.html',
    controller: 'UserCompCtrl'
  })
  .state('Tuto1', {
    url: '/tuto1',
    templateUrl: 'templates/tuto/Tuto1.html',
    controller: 'TutoCtrl'
  })
  .state('Tuto2', {
    url: '/tuto2',
    templateUrl: 'templates/tuto/Tuto2.html',
    controller: 'TutoCtrl'
  })
  .state('Tuto3', {
    url: '/tuto3',
    templateUrl: 'templates/tuto/Tuto3.html',
    controller: 'TutoCtrl'
  })
  .state('Account', {
    url: '/Account',
    templateUrl: 'templates/account.html',
    controller: 'AccountCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
    
    
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.map', {
      url: '/map',
      views: {
        'tab-map': {
          templateUrl: 'templates/tab-map.html',
          controller: 'MapCtrl'
        }
      }
    })
  .state('tab.chats', {
      cache: true,
      url: '/chats',
      params: {currentUsername : null},
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  .state('tab.quete', {
    url: '/quete',
    views:{
      'tab-quete': {
        templateUrl: 'templates/tab-quete.html',
        controller: 'QueteCtrl'
      }
    }
  })
  .state('queteCheck', {
    url: '/queteCheck',
        templateUrl: 'templates/queteCheck.html',
        controller: 'QueteCtrl'

  });

  $urlRouterProvider.otherwise('/tab/dash');

});
