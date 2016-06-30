var whcyitModule = angular.module('whcyit-open-window', ['ionic']);

whcyitModule.factory('cyOpenWindow', ['$rootScope', '$ionicModal', '$sce', function ($rootScope, $ionicModal, $sce) {
  var modalTemplate =
    '<ion-modal-view>' +
      '<ion-header-bar align-title="center" class="bar bar-{{::theme}}" ng-if="title">' +
        '<h1 class="title" ng-bind-html="::title"></h1>' +
        '<button class="button button-clear button-icon {{::close}}" ng-click="closeModal()"></button>' +
      '</ion-header-bar>' +
      '<ion-content scroll="true" style="" class="no-padding open-window">' +
        '<iframe data-tap-disabled="true" ng-src="{{url}}"></iframe>' +
      '</ion-content>' +
    '</ion-modal-view>';

  return {
    show: function (opts) {
      var scope = $rootScope.$new(true);
      angular.extend(scope, {
        url: 'about:blank',
        theme: 'positive',
        title: '',
        close: ionic.Platform.isAndroid() ? 'ion-android-close' : 'ion-ios-close',
        onmessage: angular.noop
      }, opts);

      if (scope.url) {
        scope.url = $sce.trustAsResourceUrl(scope.url);
      }

      window.addEventListener('message', function (e) {
        scope.onmessage(e);
      }, false);

      var hide = function () {
        scope.url = $sce.trustAsResourceUrl('about:blank');
        window.removeEventListener('message', function () {
        }, false);
        scope.modal.remove();
        scope.modal = null;
      };

      scope.showModal = function () {
        scope.modal = $ionicModal.fromTemplate(modalTemplate, {
          scope: scope
        });
        scope.modal.show();
      };

      scope.closeModal = function () {
        hide();
      };

      scope.showModal();
      
      return {
        hide: hide
      };
    }
  };
}]);
