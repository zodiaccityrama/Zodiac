var zodiacC = angular.module('zodiac.controllers', []);


zodiacC.controller('AppCtrl', function ($scope, $rootScope) {

});

zodiacC.controller('HoroscopCtrl', function ($scope, $rootScope) {
    $rootScope.zodiiRow = $rootScope.zodiiToRow(3);
});

zodiacC.controller('HoroscopZodiaCtrl', function () {

});
