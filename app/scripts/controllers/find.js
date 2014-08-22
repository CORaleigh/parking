'use strict';

angular.module('parkingApp')
  .controller('FindController', ['$scope', '$http',
    function($scope, $http){
    	$scope.getDirections = function (start, end) {
    		$scope.directions = [];
    		var params = {origin: start, destination: end};
    		$http.get('https://maps.googleapis.com/maps/api/directions/output?', params).success(function(res){
    			console.log(res);
    		});
    	}
    	
  }]);