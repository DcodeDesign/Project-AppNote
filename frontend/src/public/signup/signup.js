'use strict';
const angular = require('angular');

require('./signup.css')

function signup($scope, $localStorage, $location, AuthSvc) {

    $scope.signup = signup;
    $scope.errorSignup = null;
    $scope.loadingSignup = false;

    initController();

    function initController() {
        AuthSvc.logout();
    }

    function signup() {
        $scope.loading = true;
        AuthSvc.signup($scope.email, $scope.password, function (result) {
            if (result === true) {
                $location.path('/signin');
            } else {
                $scope.errorSignup = 'Already existing email';
                $scope.loadingSignup = false;
            }
        });
    }
}

const stateConfig = {
    name: 'signup',
    url: '/signup',
    templateUrl: require('./signup.html'),
    controller: 'signup'
};

signup.$inject = [
    '$scope',
    '$localStorage',
    '$location',
    'AuthSvc'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module(process.env.ROOT)
    .controller('signup', signup)
    .config(['$stateProvider', routeConfig])

module.exports = stateConfig;
