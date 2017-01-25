angular.module('app').controller('status_controller', ['$scope', '$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope){

  $scope.title = "상태 페이지";

  $scope.url = $routeParams.url;
  $scope.port = $routeParams.port;
  

  $scope.moveTo = function() {
    //$rootScope.socket.send("aa");
    //$window.location.href = '#/status/' + $scope.url +'/' + $scope.ip;
  };

  /*
  $rootScope.socket.onerror=function(event) {
    console.log('onerror: ' + event);
  };

  $rootScope.socket.onopen = function(event) {
    console.log('onopen: ' + event);
  };

  $rootScope.socket.onmessage = function(msg) {
    console.log('onmessage from status: ' + msg);
    $rootScope.socket.send("dd");
  };

  $rootScope.socket.onclose = function(msg) {
    console.log('onclose: ' + msg);
  };
*/
  
  /*
   setTimeout(function() {
   alert($scope.url);
   alert($scope.port);
   }, 1000);
   */
}]);
