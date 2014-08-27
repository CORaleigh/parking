'use strict';

angular.module('parkingApp')
  .controller('FindController', ['$scope', '$http', 'leafletBoundsHelpers',
    function($scope, $http, leafletBoundsHelpers){
        $scope.map = false;
        angular.extend($scope,{
            Raleigh:{
                lat: 35.779595,
                lng:-78.638269,
                zoom: 14
            }
        });
    	$scope.getDirections = function (data) {
    		$scope.directions = null;
    		var conf = {origin: data.from, destination: data.to, region: 'us'};
    		$http.get('https://maps.googleapis.com/maps/api/directions/json?', {params: conf}).success(function(res){
    			console.log(res);
    			$scope.directions = res.routes[0].legs[0].steps;
                for (var i in res.routes[0].legs[0].steps){
                    var polyline = L.Polyline.fromEncoded(res.routes[0].legs[0].steps[i].polyline.points);
                    res.routes[0].legs[0].steps[i].polyline.points = polyline;
                    console.log(res.routes[0].legs[0].steps[i].polyline.points);
                }
                var ne = [res.routes[0].bounds.northeast.lat, res.routes[0].bounds.northeast.lng];
                var sw = [res.routes[0].bounds.southwest.lat, res.routes[0].bounds.southwest.lng];
                console.log([ne, sw]);
                var bounds = leafletBoundsHelpers.createBoundsFromArray([ne, sw]);
                // var paths: {
                //         p1: {
                //             color: '#008000',
                //             weight: 8,
                //             latlngs: [
                //                 { lat: 51.50, lng: -0.082 },
                //                 { lat: 48.83, lng: 2.37 },
                //                 { lat: 41.91, lng: 12.48 }
                //             ],
                //         }
                // };
                
                angular.extend($scope, {
                    bounds: bounds,
                    paths: paths
                });
                
    		});
            $scope.map = true;
    	}
    	
  }]);