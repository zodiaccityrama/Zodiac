var admobid = { // for Android
    banner      : 'ca-app-pub-1537264536593688/3668596069',
    interstitial: 'ca-app-pub-1537264536593688/2691390464'
};

var gaPlugin;


function nativePluginResultHandler(result) {
    //alert('nativePluginResultHandler - '+result);
    //console.log('nativePluginResultHandler: ' + result);
}

function nativePluginErrorHandler(error) {
    alert('nativePluginErrorHandler - ' + error);
    //console.log('nativePluginErrorHandler: ' + error);
}

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


    $rootScope.successHandler = function (result) {
        alert('Callback Success! Result = ' + result)
    };
    $rootScope.errorHandler = function (error) {
        alert(error);
    };

    $rootScope.onNotificationGCM = function (e) {
        switch (e.event) {
            case 'registered':
                if (e.regid.length > 0) {
                    console.log("Regid " + e.regid);
                    alert('registration id = ' + e.regid);
                }
                break;

            case 'message':
                // this is the actual push notification. its format depends on the data model from the push server
                alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
                break;

            case 'error':
                alert('GCM error = ' + e.msg);
                break;

            default:
                alert('An unknown GCM event has occurred');
                break;
        }
    };

    $rootScope.onNotification = function (e) {
        alert('<li>EVENT -> RECEIVED:' + e.event + '</li>');


    };

    document.addEventListener("deviceready", function () { //asta merge
        if (ionic.Platform.isWebView()) {
            gaPlugin = window.plugins.gaPlugin;
            gaPlugin.init(nativePluginResultHandler, nativePluginErrorHandler, "UA-59857602-2", 1);

            pushNotification = window.plugins.pushNotification;
            pushNotification.register($rootScope.successHandler, $rootScope.errorHandler, {
                "senderID": "396262474482",
                "ecb"     : "onNotification"
            });

        }
    }, false);


    $rootScope.zodii = {
        0 : {
            'nume'   : 'Berbec',
            'iconita': 'berbec'
        },
        1 : {
            'nume'   : 'Taur',
            'iconita': 'taur'
        },
        2 : {
            'nume'   : 'Gemeni',
            'iconita': 'gemeni'
        },
        3 : {
            'nume'   : 'Rac',
            'iconita': 'rac'
        },
        4 : {
            'nume'   : 'Leu',
            'iconita': 'leu'
        },
        5 : {
            'nume'   : 'Fecioara',
            'iconita': 'fecioara'
        },
        6 : {
            'nume'   : 'Balanta',
            'iconita': 'balanta'
        },
        7 : {
            'nume'   : 'Scorpion',
            'iconita': 'scorpion'
        },
        8 : {
            'nume'   : 'Sagetator',
            'iconita': 'sagetator'
        },
        9 : {
            'nume'   : 'Capricorn',
            'iconita': 'capricorn'
        },
        10: {
            'nume'   : 'Varsator',
            'iconita': 'varsator'
        },
        11: {
            'nume'   : 'Pesti',
            'iconita': 'pesti'
        }
    };


    $rootScope.zodiiToRow = function (lengthofsublist) {
        var arrayToReturn = {};
        var subArray = {};
        var i = 0;
        var k = 0;
        for (key in $rootScope.zodii) {
            pushed = false;
            i++;
            subArray[i] = $rootScope.zodii[key];
            subArray[i].id = key;
            if (i == lengthofsublist) {
                pushed = true;
                k++;
                arrayToReturn[k] = subArray;
                subArray = {};
                i = 0;
            }
        }
        if (!pushed) arrayToReturn.push(subArray);
        console.log(arrayToReturn);

        return arrayToReturn;
    };


});

zodiacA.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('horoscop', {
            url        : "/horoscop",
            abstract   : true,
            templateUrl: "horoscop-abstract.html"
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


zodiacA.filter('listaZodiiToRow', function () {
    return function (arr, lengthofsublist) {
        var arrayToReturn = [];
        var subArray = [];
        var i = 0;

        for (key in arr) {
            pushed = false;
            i++;
            subArray.push(arr[key]);
            if (i == lengthofsublist) {
                pushed = true;
                arrayToReturn.push(subArray);
                subArray = [];
                i = 0;
            }
        }

        if (!pushed) arrayToReturn.push(subArray);

        console.log(arrayToReturn);

        return arrayToReturn;
    }
});

zodiacA.filter('toArray', function () {
    return function (obj) {
        if (!(obj instanceof Object)) return obj;
        return angular.forEach(obj, function (val, key) {
            return Object.defineProperty(val, '$key', {
                __proto__: null,
                value    : key
            });
        });
    }
});