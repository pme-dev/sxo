angular.module('gondole', ['ngAnimate'])
.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[').endSymbol(']]');
})
.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
});

angular.controllers = {};
angular.controllers.gondoleCtrl = function($scope, $timeout) {
  $scope.bg = '';
  $scope.ecran = 'time';
  $scope.changeEcran = function(ecran) {
    $scope.ecran = ecran;
    // if (['show', 'stratflash'].indexOf(ecran) !== -1) {
    //   $scope.bg = '../img/gondole/numerique/'+ecran+'.jpg';
    // } else {
    //   $scope.bg = '';
    // }
    if (ecran == 'devis') {
      $timeout(function() {
        $scope.changeEcran('consultants');
      }, 20000);
    }
  }
}
