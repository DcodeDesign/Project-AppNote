'use strict';
const angular = require('angular');

require('./signin.css')

function signin($scope, $localStorage, $location,AuthSvc) {

    $scope.signin = signin;
    $scope.error = null;
    $scope.loading = false;

    initController();

    function initController() {
        AuthSvc.logout();
    }

    function signin() {
        $scope.loading = true;
        AuthSvc.signin($scope.email, $scope.password, function (result) {
            if (result === true) {
                $location.path('/');
            } else {
                $scope.error = 'Username or password is incorrect';
                $scope.loading = false;

            }
        });
    }
}

const stateConfig = {
    name: 'signin',
    url: '/signin',
    templateUrl: require('./signin.html'),
    controller: 'signin'
};

signin.$inject = [
    '$scope',
    '$localStorage',
    '$location',
    'AuthSvc'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module(process.env.ROOT)
    .controller('signin', signin)
    .config(['$stateProvider', routeConfig])

module.exports = stateConfig;
