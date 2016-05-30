var app = angular.module('starter', ['ionic', 'firebase', 'ngCordova']);

app.constant('furl','https://torrid-inferno-2262.firebaseio.com/');
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

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
      
  .state('SignIn', {
    url: '/SignIn',
    templateUrl: 'templates/signIn.html',
    controller: 'UserCtrl'
  })
  .state('SignUp', {
    url: '/SignUp',
    templateUrl: 'templates/signUp.html',
    controller: 'UserCtrl'
  })
  .state('UserData', {
    url: '/UserData',
    templateUrl: 'templates/userData.html',
    controller: 'UserCtrl'
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
      url: '/chats/:userChat',
      params: {currentUsername : null},
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views:{
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
      }
  });

  $urlRouterProvider.otherwise('/tab/dash');

});
