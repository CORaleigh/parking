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
    $scope.test = null;
    $scope.viewData = null;
     $scope.mapData = { 
     	'type': 'FeatureCollection',
    	'features': []
	 };
     $scope.metersData = {};
     // $scope.getStatus = function(area){
     // 	$http.jsonp('http://rhsoatstapp1:9292/area/' + area + '?callback=JSON_CALLBACK&name=Super%20Hero').success(function(res){
     // 		console.log(res.Bay);
     // 		$scope.metersData.area = res.Bay;
     // 	});
     // };

    var styles = {
        paidStyle : {
            fillColor: '#aa3939',
            radius: 5,
            color: '#550000',
            weight: 1,
            fillOpacity: 0.7
        },
        expiredStyle : {
            fillColor: '#37D60F',
            radius: 5,
            color: '#313c74',
            weight: 1,
            fillOpacity: 0.7
        },
        hoverStyle: {
            fillColor: '#0ab25d',
            radius: 5,
            color: '#0ab25d',
            weight: 1,
            fillOpacity: 0.7
        }
    };

     $scope.getMapData = function (){
     	// for (var i = 1; i <=7; i++){
            // var config = { headers: {'Content-Type': 'application/json'}};
     		$http.jsonp('http://rhsoatstapp1:9292/area/1/216?callback=JSON_CALLBACK').success(function(data, status, headers, config){ 
                console.log(data);
     	 	for (var each in data){
     	 		// data[each].geometry.coordinates = JSON.parse(data[each].geometry.coordinates);
     	 		// console.log(res[each].geometry.coordinates);
     	 		$scope.mapData.features.push(data[each]);
     	 	} 
     	 	console.log($scope.mapData);
     	 	angular.extend($scope, {
	            geojson: {
	                data: $scope.mapData,
	                onEachFeature: function (feature, layer){
	                	layer.bindPopup('<h1>Status :' + feature.properties.STATUS + '</h1><pre><h3>Street :' + feature.properties.STREET + '</h3><h3>Time :' + feature.properties.TIME + '</h3></pre>' );
                        
                            if (feature.properties.STATUS === 'paid'){
                                layer.setStyle(styles.paidStyle);
                            }
                            else if (feature.properties === 'expired') {
                                layer.setStyle(styles.expiredStyle);
                            }
                        layer.on('mouseover', function () {
                            $scope.viewData = feature.properties;
                         });
	                },
	                pointToLayer: function (feature, latlng) {
	   						return L.circleMarker(latlng, styles.expiredStyle);
					},
                    resetStyleOnMouseout: true
				} //Ends geojson object
        	}); //Ends extend scope
     	 	
     	 	
        
        }).error( function(data, status, headers, config, statusText){
            console.log('Error');
            console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);
            console.log(statusText);
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
                    // overlays: {
                    //     heatmap: {
                    //         name: 'Heat Map',
                    //         type: 'heatmap',
                    //         data: $scope.heatmapData,
                    //         visible: false
                    //     }
                    // }
                }
    });
     };
     $scope.getMapData();
    	


         angular.extend($scope, {
                Raleigh: {
                    lat: 35.779595,
            		lng:-78.638269,
            		zoom: 14
                },
                legend: {
                position: 'bottomleft',
                colors: [ '#313c74', '#aa3939' ],
                labels: [ 'Avaliable Parking Spot', 'Unavaliable Parking Spot' ]
            }
                
          
            });

  }
]);