'use strict';

angular.module('logicMonitorApp')
  .controller('ThresholdCtrl', function ($scope) {
    $scope.onComplete = function(threshold) {
      console.log(threshold);
    };
  });
