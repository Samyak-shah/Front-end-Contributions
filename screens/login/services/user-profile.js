(function() {
  angular
    .module('starter.controllers')
    .factory('UserProfileService', function() {
      var service = {
        loadUserProfile: loadUserProfile,
      };

      function loadUserProfile(authToken) {
        window.localStorage.firstName = 'Samyak';
        window.localStorage.lastName = 'Moore';
      }

      return service;
    });

})();
