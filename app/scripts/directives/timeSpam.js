'use strict';

angular.module('logicMonitorApp')
  .directive('lmTimeSpam', ['Thresholds', function(Thresholds) {
    return {
      restrict: 'EA',
      templateUrl: 'views/timeSpam.html',
      scope: {
        'threshold': '=',
        'index': '='
      },
      link: function(scope, element) {

        scope.$watchCollection('[threshold.from, threshold.until]', function() {
          scope.color = Thresholds.getColor(scope.index, scope.threshold.isAllDay());

          if (!scope.threshold.isAllDay()) {
            var maxWidth = 1166;
            var from = Number(scope.threshold.from.replace(':', '.'));
            var until = Number(scope.threshold.until.replace(':', '.'));
            var spams = angular.element(element).find('.spam').css('z-index', 9999 - scope.index);
            scope.isCrossDay = from > until;

            if (scope.isCrossDay) {
              spams.eq(0).css({
                left: 0,
                width: until / 24 * maxWidth
              });
              spams.eq(1).css({
                left: from / 24 * maxWidth,
                right: 0
              });
            } else {
              spams.css({
                left: from / 24 * maxWidth,
                width: (until - from) / 24 * maxWidth
              });
            }
          }
        });

      }
    };
  }]);