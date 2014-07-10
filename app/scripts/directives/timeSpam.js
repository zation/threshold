'use strict';

angular.module('logicMonitorApp')
  .directive('lmTimeSpam', function() {
    return {
      restrict: 'EA',
      templateUrl: 'views/timeSpam.html',
      scope: {
        'threshold': '='
      },
      replace: true,
      link: function(scope, element) {

        if (!scope.threshold.isAllDay()) {
          var maxWidth = 1170;
          var from = Number(scope.threshold.from.replace(':', '.'));
          var until = Number(scope.threshold.until.replace(':', '.'));

          var start = from / 24 * maxWidth;
          var width = (until - from) / 24 * maxWidth;

          angular.element(element).css({
            left: start,
            width: width
          });
        }
      }
    };
  });