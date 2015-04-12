angular.module('starter.controllers', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
})

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

.controller('ReportCtrl', function($scope, $ionicPopup, $cordovaCamera) {

    var destinationType = $cordovaCamera.DestinationType,
    pictureSource = $cordovaCamera.PictureSourceType;

    function onPhotoDataSuccess (imageData) {
      var smallImage = document.getElementById('image-for-upload');
      smallImage.style.display = 'block';
      smallImage.src = "data:image/jpeg;base64," + imageData;
      //imageIsUploaded();
    }

    function onPhotoURISuccess (imageURI) {
      var largeImage = document.getElementById('image-for-upload');
      largeImage.style.display = 'block';
      largeImage.src = imageURI;
      //imageIsUploaded();
    }

    function onFail (message) {
        $ionicPopup.alert({
            title: 'No image!',
            template: 'Please choose image!'
        });
    }

    $("#take-image").click(function () {
        $cordovaCamera.getPicture(onPhotoDataSuccess, onFail, { quality: 50
            //,destinationType: destinationType.DATA_URL
        });
    });

    $("#upload-image").click(function () {
        $cordovaCamera.getPicture(onPhotoURISuccess, onFail, { quality: 50
            /*,destinationType: destinationType.FILE_URI,
            sourceType: pictureSource.SAVEDPHOTOALBUM*/
        });
    });

    function imageIsUploaded () {

        $("#send-alert").show();
        $("#send-alert").click(function () {
            var form = {},
            date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            alertType,
            disease = $("#disease").val(),
            parasite = $("#parasite").val();

            function geolocationSuccess (location) {
                next(location);
            }

            function geolocationError (error) {
                $ionicPopup.alert({
                    title: 'Geolocation alert',
                    template: 'Please turn on your mobile geolocation!'
                });
                return;
            }

            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);

            function next (location) {
                if (!$("#name-of-alert").val()) {
                    $ionicPopup.alert({
                        title: 'Alert',
                        template: 'Please write alert name!'
                    });
                    return;
                }

                if (!disease) {
                    alertType = parasite ? "parasite" : "undefined";
                } else {
                    alertType = "disease";
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
                    console.log(form);
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
            }

        });
    }

})

.controller('MapCtrl', function($scope, MapService) {
    $scope.data = {};
    $scope.initMap = function () {
        MapService.init();
    }
})

.controller('AccountCtrl', function($scope) {
});