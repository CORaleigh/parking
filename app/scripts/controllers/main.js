'use strict';

/**
 * @ngdoc function
 * @name parkingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parkingApp
 */
// angular.module('parkingApp')
//   .controller('MainCtrl', function ($scope) {
//     $scope.awesomeThings = [
//       'HTML5 Boilerplate',
//       'AngularJS',
//       'Karma'
//     ];
//   });

'use strict';

angular.module('parkingApp').controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
     $scope.mapData = {};
     $scope.heatmapData = [];
     $scope.getMapData = function (){
     	 $http.get('http://50.116.33.197/chadfoley/spaces.geojson').success(function(res){
     	 	console.log(res);
     	 	angular.extend($scope, {
	            geojson: {
	                data: res,
	                onEachFeature: function (feature, layer){
	                	layer.bindPopup('<h1>Block :' + feature.properties.BLOCK + '</h1><h1>Meter :' + feature.properties.METER + '</h1>' );
	                },
	                pointToLayer: function (feature, latlng) {
	   					return L.circleMarker(latlng, {
	    					fillColor: '#3366FF',
				    		radius: 5,
				    		color: '#3300FF',
				    		weight: 1,
				    		fillOpacity: .7
				    	});
					}		
				} //Ends geojson object
        	}); //Ends extend scope
        
        });//Ends Get
     	 
         //Adds Icons to map
    angular.extend($scope, {
        icons: localIcons
    });
//Addes Markers to map
    angular.extend($scope, {
        markers: $scope.mapData
    });

    angular.extend($scope, {
        layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        }
                    },
                    overlays: {
                        heatmap: {
                            name: 'Heat Map',
                            type: 'heatmap',
                            data: $scope.heatmapData,
                            visible: false
                        }
                    }
                }
    });
     };
     $scope.getMapData();
    	var localIcons = {
        defaultIcon: {},
        googleFiberRabbit: {
            iconUrl: 'images/googleFiberIcon.png',
            iconSize:     [75, 75],
            shadowSize:   [0, 0]
        }
    };


         angular.extend($scope, {
                Raleigh: {
                    lat: 35.779595,
            		lng:-78.638269,
            		zoom: 14
                },
                legend: {
                position: 'bottomleft',
                colors: [ '#3366FF'],
                labels: [ 'Parking Spot' ]
            }
                
          
            });

  }
]);