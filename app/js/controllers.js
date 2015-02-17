var zodiacC = angular.module('zodiac.controllers', []);


zodiacC.controller('AppCtrl', function ($scope, $rootScope) {

});

zodiacC.controller('HoroscopCtrl', function ($scope, $rootScope) {
    $rootScope.zodiiRow = $rootScope.zodiiToRow(3);
});

zodiacC.controller('HoroscopZodiaCtrl', function ($scope, $rootScope, $stateParams) {
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
        }
    });


    $scope.zodia = $stateParams.zodia;


});
