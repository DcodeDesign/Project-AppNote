'use strict';
require('./nav-bar.css')

function navBar($state, AuthSvc) {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: require('./nav-bar.html'),
    link: function(scope){
      scope.title =  'app';
      scope.logout = function (){
        console.log('ici')
        AuthSvc.logout()
        $state.go('signin')
      }
    }
  }
}

angular.module(process.env.ROOT)
    .directive('navBar', ['$state' ,'AuthSvc', navBar])

module.exports = {
    name: 'navBar',
    directive: navBar
}

