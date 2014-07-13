'use strict';

angular.module('logicMonitorApp')
  .factory('Thresholds', ['$collection', 'Threshold',
    function($collection, Threshold) {
      var Thresholds = $collection;
      var COLORS = ['purple', 'light-blue', 'green', 'blue', 'magenta'];

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

      Thresholds.prototype.refreshWith = function(codes) {
        this.removeAll().updateWith(codes);
      };

      Thresholds.prototype.updateWith = function(codes) {
        var thresholds = this;
        angular.forEach(codes.split(','), function(code) {
          code = code.trim().split(')');
          var times = code[0].substr(1).split(' ');
          var from = '';
          var until = '';
          if (times.length > 1) {
            from = times[0];
            until = times[1];
          }
          var operatorAndAlertNumbers = code[1].trim().split(' ');
          var operator = operatorAndAlertNumbers.shift();
          var alertNumbers = operatorAndAlertNumbers;
          var numberArray = [0, 0, 0]
          angular.forEach(alertNumbers, function(alertNumber, index) {
            alertNumber = Number(alertNumber);
            if (isNaN(alertNumber)) {
              return;
            }
            numberArray[index] = alertNumber;
          });

          thresholds.addA(new Threshold({
            from: from,
            until: until,
            operator: operator,
            numberForWarning: numberArray[0],
            numberForError: numberArray[1],
            numberForCritical: numberArray[2]
          }));
        });
      };

      Thresholds.prototype.addA = function(threshold) {
        var index = this.array.length % COLORS.length;
        threshold.color = COLORS[index];
        this.add(threshold);
      };

      return Thresholds;
    }]);
