// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'starter.controllers'
])

    .run(function ($ionicPlatform, $rootScope) {
        $rootScope.initAd = function () {
            var defaultOptions = {
                // bannerId: admobid.banner,
                // interstitialId: admobid.interstitial,
                // adSize: 'SMART_BANNER',
                // width: integer, // valid when set adSize 'CUSTOM'
                // height: integer, // valid when set adSize 'CUSTOM'
                position : AdMob.AD_POSITION.BOTTOM_CENTER,
                // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
                bgColor  : 'black', // color name, or '#RRGGBB'
                // x: integer, // valid when set position to 0 / POS_XY
                // y: integer, // valid when set position to 0 / POS_XY
                autoShow : true, // auto show interstitial ad when loaded, set to false if prepare/show
                isTesting: true // set to true, to receiving test ad for testing purpose
            };
            AdMob.setOptions(defaultOptions);
            registerAdEvents();
        };

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }


            $rootScope.admobid = {};
            if (/(android)/i.test(navigator.userAgent)) {
                $rootScope.admobid = { // for Android
                    banner      : 'ca-app-pub-1537264536593688/3668596069',
                    interstitial: 'ca-app-pub-1537264536593688/2691390464'
                };
            }

            if (!AdMob) {
                alert('admob plugin not ready');
            } else {
                $rootScope.initAd();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url        : "/app",
                abstract   : true,
                templateUrl: "templates/menu.html",
                controller : 'AppCtrl'
            })

            .state('app.search', {
                url  : "/search",
                views: {
                    'menuContent': {
                        templateUrl: "templates/search.html"
                    }
                }
            })

            .state('app.browse', {
                url  : "/browse",
                views: {
                    'menuContent': {
                        templateUrl: "templates/browse.html"
                    }
                }
            })
            .state('app.playlists', {
                url  : "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller : 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url  : "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller : 'PlaylistCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/playlists');
    });
