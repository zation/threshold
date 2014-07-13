'use strict';

angular.module('logicMonitorApp')
  .factory('Thresholds', ['$collection', 'Threshold',
    function($collection, Threshold) {
      var Thresholds = $collection;

      Thresholds.getColor = function(index) {
        var colors = ['purple', 'light-blue', 'green', 'blue', 'magenta'];
        return colors[index % colors.length];
      };

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

      Thresholds.prototype.toString = function() {
        var strings = [];
        angular.forEach(this.all(), function(threshold) {
          var string = '(' + threshold.from + ' ' + threshold.until + ')' +
            ' ' + threshold.operator +
            ' ' + threshold.numberForWarning +
            ' ' + threshold.numberForError +
            ' ' + threshold.numberForCritical;
          strings.push(string);
        });
        return strings.length > 0 ? strings.join(', ') : null;
      };

      Thresholds.prototype.refreshWith = function(codes) {
        this.removeAll().updateWith(codes);
      };

      Thresholds.prototype.updateWith = function(codes) {
        var thresholds = this, from, until, numberArray, times;
        angular.forEach(codes.split(','), function(code) {
          from = '';
          until = '';
          numberArray = [0, 0, 0];
          code = code.trim().split(')');
          times = code[0].substr(1).split(' ');

          if (times.length > 1) {
            from = times[0];
            until = times[1];
          }

          var operatorAndAlertNumbers = code[1].trim().split(' ');
          angular.forEach(operatorAndAlertNumbers.slice(1), function(alertNumber, index) {
            alertNumber = Number(alertNumber);
            if (isNaN(alertNumber)) {
              return;
            }
            numberArray[index] = alertNumber;
          });

          thresholds.add(new Threshold({
            from: from,
            until: until,
            operator: operatorAndAlertNumbers[0],
            numberForWarning: numberArray[0],
            numberForError: numberArray[1],
            numberForCritical: numberArray[2]
          }));
        });
      };

      return Thresholds;
    }]);
