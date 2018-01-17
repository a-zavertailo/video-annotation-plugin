
(function () {
  'use strict';

  angular.module('annotationPlugin', []);

  angular.module('annotationPlugin').directive('annotationPlugin',
    function () {
      return {
        restrict: 'E',
        require: ['^videogular', 'annotationPlugin'],
        scope: {
          src: '=',
        },
        bindToController: true,
        link: function (scope, elem, attrs, ctrls) {
          var API = ctrls[0];
          var ctrl = ctrls[1];

          ctrl.init(API);
        },
        controller: [
          '$scope',
          function ($scope) {
            var vm = this;

            vm.annotations = [];
            
            vm.init = function (API) {

              $scope.$watch(function () { return API.currentTime }, function () {
                vm.annotations = getCurrentAnnotations(API.currentTime);
              });

            };

            function getCurrentAnnotations(currentTime) {
              return vm.src.filter(function(item) {
                return currentTime >= item.startTime && currentTime < item.endTime;
              });
            }

          }
        ],
        controllerAs: 'vm',
        template: [
          '<div class="annotation-plugin-container">',
            '<div ng-repeat="annotationItem in vm.annotations">',
              '<span class="annotation-plugin-item">{{annotationItem.annotation}}</span>',
            '</div>',
          '</div>'
        ].join('')
      }
    })
})();

