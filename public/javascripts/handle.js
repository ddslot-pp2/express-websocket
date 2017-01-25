'use strict';

angular.module('app')
  .controller('app_controller', ['$scope', '$http', '$window', '$rootScope',
			  function($scope, $http, $window, $rootScope) {
			    
			    $scope.app = {
			      name: 'Angulr',
			      version: '1.3.2'
			    };
			    
			    $scope.message = 'Everyone come and see how good I look!';

			    $rootScope.v = 'v';
			   
			    $rootScope.url = "ws://127.0.0.1:3000";
			    
			    $rootScope.connect = function(url) {
			      $rootScope.socket = new WebSocket(url);
			    };
			    
			    $rootScope.connect($rootScope.url);
			    //$rootScope.connect($rootScope.url);

			    
			    $rootScope.socket.onerror = function(event) {
			      //console.log('onerror: ' + event);
			    };
			    

			    $rootScope.socket.onopen = function(event) {
			      console.log('ws from handle');
			      var payload = { 'type': 'cs_set_mode', 'mode': 'user' };
			      $rootScope.socket.send(JSON.stringify(payload));
			    };

			    $rootScope.socket.onmessage = function(msg) {
			      console.log(msg.data);
			      //console.log(JSON.parse(msg.data));
			      var payload = JSON.parse(msg.data);
			      var type = payload['type'];
			      if(type == 'cs_system_status') {
				var cpu_usage = payload['cpu_usage'];
			        var memory_usage = payload['memory_usage'];
				var total_memory_size = payload['total_memory_size'];
				var session_count = payload['session_count'];
				
				$rootScope.$broadcast("cpu_usage", cpu_usage);
				$rootScope.$broadcast("memory_usage", memory_usage);
				$rootScope.$broadcast("total_memory_size", total_memory_size);
				$rootScope.$broadcast("session_count",session_count);
			      }
			      
			      
			    };

			    $rootScope.socket.onclose = function(msg) {
			      //console.log('onclose: ' + msg);
			    };
  			    /*
			    setInterval(function() {
			       $rootScope.$broadcast("hi", {
			       data: 'hello'
			       });
			       
			      $rootScope.$broadcast("hi", "data");
			    }, 1000);
			    */
			    
			  }]);


var app = angular.module('app');

app.config(function($routeProvider) {
  $routeProvider

  // route for the home page
    .when('/', {
      templateUrl : '/templates/main.html',
      controller  : 'main_controller'
    })
  // route for the about page
    .when('/status/:url/:port', {
      templateUrl : '/templates/status.html',
      controller  : 'status_controller'
    })
  /*
    .when('/modify', {
      templateUrl : '/tpl/modify.html',
      controller  : 'modifyCtrl'
    })

    .when('/v/', {
      templateUrl : '/tpl/v.html',
      controller  : 'vCtrl'
    })
    .when('/v/:parent', {
      templateUrl : '/tpl/v-parent.html',
      controller  : 'vParentCtrl'
    })
    .when('/v/:parent/:child', {
      templateUrl : '/tpl/v-child.html',
      controller  : 'vChildCtrl'
    })
    .when('/v/:parent/:child/:id', {
      templateUrl : '/tpl/v-title.html',
      controller  : 'vTitleCtrl'
    })
  */

    .otherwise({redirectTo: '/'});

});
