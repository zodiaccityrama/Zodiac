var zodiacC = angular.module('zodiac.controllers', []);


zodiacC.controller('AppCtrl', function ($scope, $rootScope) {

});

zodiacC.controller('HoroscopCtrl', function ($scope, $rootScope) {
    $rootScope.zodiiRow = $rootScope.zodiiToRow(3);
    //if (ionic.Platform.isWebView()) {
        //alert(gaPlugin.trackPage(nativePluginResultHandler, nativePluginErrorHandler, "some.url.com"));
    //}
});

zodiacC.controller('HoroscopZodiaCtrl', function ($scope, $rootScope, $stateParams, $http, $ionicLoading) {
    $scope.zodia = $stateParams.zodia;

    $ionicLoading.show({
        template: 'Loading...'
    });

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


     $http.get('http://www.cityrama.ro/zodiac/jsons/get_horoscop.php?id_zodie=' +  $scope.zodia)
         .success(function (response, status, headers, config) {
            $scope.horoscop = response.horoscop;
            $scope.data = response.data;
             $ionicLoading.hide();
    });

});
