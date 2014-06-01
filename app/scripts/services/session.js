'use strict';

angular.module('movieApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
