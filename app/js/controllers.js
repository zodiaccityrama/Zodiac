var zodiacC = angular.module('zodiac.controllers', []);


zodiacC.controller('AppCtrl', function ($scope, $rootScope) {

});

zodiacC.controller('HoroscopCtrl', function ($scope, $rootScope) {
    $rootScope.zodiiRow = $rootScope.zodiiToRow(3);
    //if (ionic.Platform.isWebView()) {
        //alert(gaPlugin.trackPage(nativePluginResultHandler, nativePluginErrorHandler, "some.url.com"));
    //}
});

zodiacC.controller('HoroscopZodiaCtrl', function ($scope, $rootScope, $stateParams, $http) {
    $scope.zodia = $stateParams.zodia;
    ionic.Platform.ready(function () {
        if (ionic.Platform.isWebView()) {
            if (AdMob) {
                AdMob.createBanner(admobid.banner);
                AdMob.prepareInterstitial({
                    adId    : admobid.interstitial,
                    autoShow: true
                });
                //AdMob.showInterstitial();
            }

            // gaPlugin.trackPage(function () {}, function () {}, "/horoscop/" + $rootScope[$scope.zodia].iconita);
        }
    });

     $http.get('http://www.cityrama.ro/zodiac/jsons/get_horoscop.php', {id_zodie: $scope.zodia})
         .success(function (data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
    });

});
