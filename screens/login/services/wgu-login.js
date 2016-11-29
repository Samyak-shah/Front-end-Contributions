(function() {
  angular
    .module('starter.controllers')
    .factory('WGUAuthService', function() {
      var service = {
        login: login,
      }

      function login(username, password) {
        if (username == 'test' && password == 'test') {
          window.localStorage['wgu_auth'] = 'wgu_auth_token';
          return 'wgu_auth_token';
        } else {
          return false;
        }
      }

      return service;
    });

})();
