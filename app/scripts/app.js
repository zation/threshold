'use strict';

angular
  .module('logicMonitorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/threshold.html',
        controller: 'ThresholdCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
