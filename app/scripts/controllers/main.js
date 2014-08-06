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


angular.module('parkingApp').controller('MainCtrl', ['$scope', '$http',
    function($scope, $http) {
     $scope.mapData = { 
     	"type": "FeatureCollection",
    	"features": []
	 };
     $scope.metersData = {};
     $scope.getStatus = function(area){
     	$http.get('http://rhsoatstapp1:9292/area/' + area).success(function(res){
     		console.log(res.Bay);
     		$scope.metersData.area = res.Bay;
     	});
     };

     

     $scope.getMapData = function (){
     	// for (var i = 1; i <=7; i++){
     		$http.get('http://rhsoatstapp1:9292/area/1/216').success(function(res){
     	 	var areas = []; 
     	 	for (var each in res){
     	 		res[each].geometry.coordinates = JSON.parse(res[each].geometry.coordinates);
     	 		console.log(res[each].geometry.coordinates);
     	 		$scope.mapData.features.push(res[each]);
     	 	} 
     	 	console.log($scope.mapData);
     	 	angular.extend($scope, {
	            geojson: {
	                data: $scope.mapData,
	                onEachFeature: function (feature, layer){
	                	layer.bindPopup('<h1>Status :' + feature.properties.STATUS + '</h1><pre><h3>Street :' + feature.properties.STREET + '</h3><h3>Time :' + feature.properties.TIME + '</h3></pre>' );
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
//     angular.extend($scope, {
//         icons: localIcons
//     });
// //Addes Markers to map
//     angular.extend($scope, {
//         markers: $scope.mapData
//     });

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