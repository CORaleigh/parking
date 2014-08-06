'use strict';

/**
 * @ngdoc function
 * @name parkingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the parkingApp
 */
angular.module('parkingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
