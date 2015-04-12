angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            promise = deferred.promise,
            data = {username: name, password: pw};

            $.post('http://80.83.115.203/mobile-login/', data, function (userData, status) {

              if (status === "error") {
                deferred.reject('Wrong credentials.');
                return;
              }
              console.log(userData);

              window.localStorage['userId'] = userData.userId;
              window.localStorage['userName'] = userData.userName;
              window.localStorage['userEmail'] = userData.userEmail;
              window.localStorage['cropNum'] = userData.cropFieldsNum;
              window.localStorage['reportNum'] = userData.reportNum;
              window.localStorage['cropFields'] = userData.cropFields;
              window.localStorage['reports'] = userData.reports;

              deferred.resolve('Welcome ' + name + '!');

            },"json");

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('Camera', function ($q) {
  return {
    getPicture: function (options) {
      var q = $q.defer();
      navigator.camera.getPicture(function (result) {
        q.resolve(result);
      }, function (err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  }
})

.service('MapService', function($q) {
  return {
    init: function () {
      $("#map").height($(window).height());
      var map = L.map('map').setView([51.505, -0.09], 13);
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    },

    setLocations: function () {
      //var locations = window.localStorage['locations'];
      var point = L.point(200,300);
    }
  }
})

.service('Account', function($q) {
  return {
    init: function () {
      if (window.localStorage['userName']) {
        $("#username-account").text(window.localStorage['userName']);
      } else {
        $("#username-account").text("Unknown");
      }

      if (window.localStorage['userEmail']) {
        $("#email-account").text(window.localStorage['userEmail']);
      } else {
        $("#email-account").text("Unknown");
      }

      if (window.localStorage['cropNum']) {
        $("#crops-account").text(window.localStorage['cropNum']);
      } else {
        $("#crops-account").text(0);
      }

      if (window.localStorage['reportNum']) {
        $("#reports-account").text(window.localStorage['reportNum']);
      } else {
        $("#reports-account").text(0);
      }
    }
  }
});
