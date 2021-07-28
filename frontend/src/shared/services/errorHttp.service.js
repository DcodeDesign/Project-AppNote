'use strict';

function ErrorHttpSvc($location) {

    function error() {
        $location.path('/signin')
    }

    return {
        error: error
    }

}

const serviceConfig = [
    '$location',
    ErrorHttpSvc
]

angular.module(process.env.ROOT)
    .factory('ErrorHttpSvc', serviceConfig)

module.exports = {
    name: 'ErrorHttpSvc',
    factory: serviceConfig
}

