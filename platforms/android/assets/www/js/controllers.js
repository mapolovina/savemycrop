angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('tab.report');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('ReportCtrl', function($scope, Camera) {
    $("#take-image").click(function () {
        Camera.getPicture().then(function (imageURI) {
            console.log(imageURI);
        }, function (err) {
            console.log(err);
        });
    });
})

.controller('MapCtrl', function($scope, MapService) {
    $scope.data = {};
    $scope.initMap = function () {
        MapService.init();
    }
})

.controller('AccountCtrl', function($scope) {
});