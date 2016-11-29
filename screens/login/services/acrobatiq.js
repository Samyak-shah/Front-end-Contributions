(function() {
  angular
    .module('starter.controllers')
    .factory('AcrobatiqService', function($http) {
      var service = {
        login: login,
        userEnrollments: userEnrollments,
      }

      function login(username, password) {
        var url = 'http://localhost:8001/learning_snacks_api/login';
        var username = 'admin';
        var password = '0acrobatiq0';
        return $http.post(url, {username: username, password: password});
      }

      function userEnrollments(userid) {
        var userid = '56837b09e13823640188a1f2';
        var url = 'http://localhost:8001/learning_snacks_api/user/'+userid+'/enrollment';
        return $http.get(url);
      }

      return service;
    });

})();
