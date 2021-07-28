'use strict';
const angular = require('angular');
require('./home.css')

function homeCtrl($scope) {

}

const stateConfig = {
    name: 'home',
    url: '/home',
    templateUrl: require('./home.html'),
    controller: 'homeCtrl'
};

homeCtrl.$inject = [
    '$scope'
]

function routeConfig($stateProvider) {
    $stateProvider.state(stateConfig)
}

angular.module(process.env.ROOT)
    .controller('homeCtrl', homeCtrl)
    .config(['$stateProvider', routeConfig])

module.exports = stateConfig;
