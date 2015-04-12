angular.module('starter.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            promise = deferred.promise,
            data = {username: name, password: pw};

            $.post('http://80.83.115.203/mobile-login', data, function (userId, err) {
              if (err || userId !== String) {
                deferred.reject('Wrong credentials.');
                return;
              }

              window.localStorage['userId'] = userId;

              console.log("picko" + userId);

              deferred.resolve('Welcome ' + name + '!');

            });

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
    }
  }
});
