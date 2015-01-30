// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'zodiac.controllers' is found in controllers.js
var zodiacA = angular.module('zodiacApp', [
    'ionic',
    'zodiac.controllers'
]);

zodiacA.run(function ($ionicPlatform, $rootScope) {

    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

zodiacA.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('horoscop', {
            url        : "/horoscop",
            abstract   : true,
            templateUrl: "horoscop-abstract.html",
            controller : 'HoroscopCtrl'
        })
        .state('horoscop.lista', {
            url        : "/lista",
            templateUrl: "horoscop-lista.html",
            controller : 'HoroscopCtrl'
        })
        .state('horoscop.zodia', {
            url        : "/:zodia",
            templateUrl: "horoscop-zodia.html",
            controller : 'HoroscopZodiaCtrl'
        })
    ;
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/horoscop/lista');
});
