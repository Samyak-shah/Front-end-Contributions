(function() {
  angular.module('starter.controllers')
    .controller('ScheduleCtrl', function($scope, $stateParams, $cordovaSQLite) {
      console.log('ScheduleCtrl');
	/*
      var db = $cordovaSQLite.openDB(
        {
          name: 'wgu',
          location: 'default'
        }
      );
      query = 'SELECT * FROM User;';
      $cordovaSQLite.execute(db, query).then(function(result) {
        console.log(result.rows.length);
        for (var i = 0; i < result.rows.length; i++) {
          item = result.rows.item(i);
          console.log(item.id, item.name);
        }
      });*/
    });
})();
