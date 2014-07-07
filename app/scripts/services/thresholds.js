'use strict';

angular.module('logicMonitorApp')
  .factory('Thresholds', ['$collection', function($collection) {
    var Thresholds = $collection;

    return Thresholds;
  }]);