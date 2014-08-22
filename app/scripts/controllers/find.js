'use strict';

angular.module('parkingApp')
  .controller('FindController', ['$scope', '$http',
    function($scope, $http){
    	$scope.getDirections = function (data) {
    		$scope.directions = null;
    		var conf = {origin: data.from, destination: data.to region: us};
    		$http.get('https://maps.googleapis.com/maps/api/directions/json?callback=JSON_CALLBACK', {params: conf}).success(function(res){
    			console.log(res);
    			$scope.directions = data;
                // var polyline = L.Polyline.fromEncoded(encoded);
    		});
    	}
    	
  }]);