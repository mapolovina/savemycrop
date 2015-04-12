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

.controller('ReportCtrl', function($scope, $ionicPopup, Camera) {
    $("#take-image").click(function () {
        var image;
        /*Camera.getPicture().then(function (imageURI) {
            console.log(imageURI);
        }, function (err) {
            console.log(err);
        });

        if (!image) {
            $ionicPopup.alert({
                title: 'No image!',
                template: 'Please choose image!'
            });
            return;
        }*/
        $("#send-alert")
        .css("display")
        .click(function () {
            var form = {},
            date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            location,
            alertType,
            disease = $("#disease").val(),
            parasite = $("#parasite").val();

            function geolocationSuccess (location) {
                location = location;
            }

            function geolocationError (error) {
                $ionicPopup.alert({
                    title: 'Geolocation alert',
                    template: 'Please turn on your mobile geolocation!'
                });
                return;
            }

            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);

            if (!$("#name-of-alert").val()) {
                $ionicPopup.alert({
                    title: 'Alert',
                    template: 'Please write alert name!'
                });
                return;
            }

            if (!disease) {
                alertType = parasite ? parasite : "undefined";
            } else {
                alertType = disease;
            }

            form.alertName = $("#name-of-alert").val();
            form.alertType = alertType;
            form.date = year + "-" + month + "-" + day;
            form.geolocation = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            };

            if (form.alertName && form.alertType && form.date && form.geolocation && localStorage['userId']) {
                form.userId = localStorage['userId'];
                $.post('http://80.83.115.203:8000/mobile-add-entry/', form, function (status) {
                    if (status === "error") {
                        $ionicPopup.alert({
                            title: 'Error',
                            template: 'Check your connection to server!'
                        });
                        return;
                    } else {
                        $ionicPopup.alert({
                            title: 'OK',
                            template: 'Form is OK!'
                        });
                    }
                });
            }

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