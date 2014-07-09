'use strict';

angular.module('logicMonitorApp')
  .factory('Thresholds', ['$collection', function($collection) {
    var Thresholds = $collection;

    Thresholds.TIMES = [];
    for (var hour = 0; hour < 24; hour++) {
      for (var minutes = 0; minutes < 60; minutes += 15) {
        var hourString = hour < 10 ? '0' + hour : hour;
        var minutesString = minutes < 10 ? '0' + minutes : minutes;
        Thresholds.TIMES.push(hourString + ':' + minutesString);
      }
    }

    Thresholds.COMPARISONS = [
      {
        name: 'is equal to (=)',
        operator: '='
      },
      {
        name: 'is greater than (>)',
        operator: '>'
      },
      {
        name: 'is less than (<)',
        operator: '<'
      }
    ];

    return Thresholds;
  }]);