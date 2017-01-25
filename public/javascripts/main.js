angular.module('app').controller('main_controller', ['$scope', '$http', '$routeParams', '$window', '$rootScope', function($scope, $http, $routeParams, $window, $rootScope){

  $scope.title = "메인 페이지";

  $scope.url = '127.0.0.1';
  $scope.ip = '3000';
  
  $scope.moveTo = function() {
    //$rootScope.connect($rootScope.url);
   //$rootScope.socket.send("aa");
    //$window.location.href = '#/status/' + $scope.url +'/' + $scope.ip;
  };

  $scope.cpu_usage = '0';
  $scope.memory_usage = '0';
  $scope.total_memory_size = '0';
  $scope.session_count = '0';

  $scope.$on('cpu_usage', function(event, args) {
    $scope.cpu_usage = args;
    $scope.$apply();
  });

  $scope.$on('memory_usage', function(event, args) {
    $scope.memory_usage = args;
    $scope.$apply();
  });

  $scope.$on('total_memory_size', function(event, args) {
    $scope.total_memory_size = args;
    $scope.$apply();
  });

  $scope.$on('session_count', function(event, args) {
    $scope.session_count = args;
    $scope.$apply();
  });
  

  

  /*
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
    console.log(JSON.parse(msg.data));
  };

  $rootScope.socket.onclose = function(msg) {
    //console.log('onclose: ' + msg);
  };
  */

  
}]);
