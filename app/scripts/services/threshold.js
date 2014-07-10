'use strict';

angular.module('logicMonitorApp')
  .factory('Threshold', function() {
    var Threshold = function(data) {
      angular.copy(data, this);
    };

    Threshold.prototype.isAllDay = function() {
      return this.from === '' || this.from === null || this.from === undefined;
    };

    Threshold.prototype.copyDataTo = function(destination) {
      destination.color = this.color;
      destination.from = this.from;
      destination.until = this.until;
      destination.operator = this.operator;
      destination.numberForWarning = this.numberForWarning;
      destination.numberForError = this.numberForError;
      destination.numberForCritical = this.numberForCritical;
    };

    return Threshold;
  });