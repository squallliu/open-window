angular.module('starter.controllers', []).controller('HomeCtrl', function ($scope, cyOpenWindow) {
  $scope.open = function () {
    var window = cyOpenWindow.show({
      url: 'http://www.baidu.com',
      title: '百度'
    }); 
    // window.hide();
  };
});
