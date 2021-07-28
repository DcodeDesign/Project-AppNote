'use strict';

function AuthSvc($rootScope, $http, $location, $localStorage) {

    function signin(username, password, callback) {
        $http.post(process.env.API_HOST + '/auth/signin', {email: username, password: password})
            .catch(function (error) {
                if (error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful signin')
                $localStorage.currentUser = {email: username, token: response.data};
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data;
                callback(true);
            } else {
                console.log('failed signin')
                callback(false);
            }
        }).catch(function (error) {
            if (error) {
                console.log(error)
            }
        });
    }

    function signup(username, password, callback) {
        $http.post(process.env.API_HOST + '/auth/signup', {email: username, password: password})
            .catch(function (error) {
                if (error) {
                    return false;
                }
            }).then(function (response) {
                console.log(response);
            if (response) {
                console.log('successful signup')
                callback(true);
            } else {
                console.log('failed signup')
                callback(false);
            }
        }).catch(function (error) {
            if (error) {
                console.log(error)
            }
        });
    }

    function logout() {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }

    return {
        signin: signin,
        signup: signup,
        logout: logout
    }

}

const serviceConfig = [
    '$rootScope',
    '$http',
    '$location',
    '$localStorage',
    '$interval',
    AuthSvc
]

angular.module(process.env.ROOT)
    .factory('AuthSvc', serviceConfig)

module.exports = {
    name: 'AuthSvc',
    factory: serviceConfig
}

