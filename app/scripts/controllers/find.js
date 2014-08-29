'use strict';

angular.module('parkingApp').config(['$httpProvider', function($httpProvider) {
    // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

angular.module('parkingApp')
  .controller('FindController', ['$scope', '$http', 'leafletBoundsHelpers', 'leafletData',
    function($scope, $http, leafletBoundsHelpers, leafletData){
        //HTML5 Geolocation
        $scope.myPosition = null;
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else {
                 $scope.myPosition = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition(position) {
            console.log(position);
             $scope.myPosition = position.coords.latitude + ", " + position.coords.longitude; 
             console.log($scope.myPosition);
             angular.extend($scope, {
                markers: {
                    mylocatoin: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        label: {
                            message: "Origin",
                            options: {
                                noHide: true
                            }
                        }
                    }
                },
                Raleigh: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    zoom: 17
                }
             });
        };
       
        
        $scope.map = false;
        $scope.noResults = {status: false, message: null};

        angular.extend($scope,{
            Raleigh:{
                lat: 35.779595,
                lng:-78.638269,
                zoom: 14
            },
            layers: {
                    baselayers: {
                        osm: {
                            name: 'OpenStreetMap',
                            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                            type: 'xyz'
                        },
                        mapbox: {
                            name: 'mapbox',
                            url: 'http://{s}.tiles.mapbox.com/v3/tmcw.map-7s15q36b/{z}/{x}/{y}.png',
                            type: 'xyz'
                        }
                    }
            },        
            paths: {},
            markers: {}
        });
    	$scope.getDirections = function (data) {
    		$scope.directions = null;
            var pathcoords = {
                            p1: {
                                color: '#008000',
                                weight: 8,
                                latlngs: [],
                            }    
                    };
            var mapMarkers = {
                        start: {
                            lat: null,
                            lng: null,
                            message: data.from
                        },
                        stop: {
                            lat: null,
                            lng: null,
                            message: data.to
                        }
                        
            };
            if ($scope.myPosition === null){
                var conf = {origin: data.from, destination: data.to, region: 'us', travelMode: google.maps.TravelMode.DRIVING};
            } else {
                var conf = {origin: $scope.myPosition, destination: data.to, region: 'us', travelMode: google.maps.TravelMode.DRIVING};
            }

            var directionsService = new google.maps.DirectionsService();
            directionsService.route(conf, function(res, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    // directionsDisplay.setDirections(result);
                    console.log(res);
                }
            // });
    		// $http.post('http://maps.googleapis.com/maps/api/directions/json?', {params: conf}).success(function(res){
    		// 	console.log(res);
                if (res.status === 'NOT_FOUND' || res.status === 'ZERO_RESULTS'){
                    $scope.noResults.status = true;
                    $scope.noResults.message = 'Please enter a differnt address...\nNo results found';
                }
                else if (res.status === 'OK'){
                    $scope.map = true;
                    $scope.noResults.status = false;
        			$scope.directions = res.routes[0].legs[0].steps;
                    for (var i in res.routes[0].legs[0].steps){
                        var polyline = L.Polyline.fromEncoded(res.routes[0].legs[0].steps[i].polyline.points);
                        res.routes[0].legs[0].steps[i].polyline.points = polyline;
                        console.log(res.routes[0].legs[0].steps[i].polyline.points);
                        pathcoords.p1.latlngs.push({lat: res.routes[0].legs[0].steps[i].polyline.points._latlngs[0].lat, lng: res.routes[0].legs[0].steps[i].polyline.points._latlngs[0].lng });
                    }
                    //Summary
                    $scope.mapSummary = {
                        distance: res.routes[0].legs[0].distance.text,
                        time: res.routes[0].legs[0].duration.text
                    };
                    //Markers
                    mapMarkers.start.lat = res.routes[0].legs[0].start_location.k;
                    mapMarkers.start.lng = res.routes[0].legs[0].start_location.B;
                    mapMarkers.stop.lat = res.routes[0].legs[0].end_location.k;
                    mapMarkers.stop.lng = res.routes[0].legs[0].end_location.B;

                    console.log(res.routes[0].bounds.Ca.j)
                    //Bounds
                    var ne = [res.routes[0].bounds.Ca.j, res.routes[0].bounds.pa.j];
                    var sw = [res.routes[0].bounds.Ca.k, res.routes[0].bounds.pa.k];
                    console.log([ne, sw]);
                    var bounds = [ne, sw] 

                    //Allows access to map element
                    leafletData.getMap().then(function(map) {
                        //Fits map to route bounds
                        map.fitBounds(bounds);
                        //Adds circle marker for circle in buffer analysis
                        L.circle([res.routes[0].legs[0].end_location.k, res.routes[0].legs[0].end_location.B], 500, {
                            color: 'red',
                            fillColor: '#f03',
                            fillOpacity: 0.5
                        }).addTo(map);
                    });
          

                    angular.extend($scope, {
                        paths: pathcoords,
                        markers: mapMarkers
                    });
                    
                    
                  }  
        		});
            
                
           
    	};
  	
  }]);