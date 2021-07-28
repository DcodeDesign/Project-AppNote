export function refreshToken($rootScope, $http, $location, $localStorage, $interval) {
    /*$interval(function () {
        $http({
            method: 'GET',
            url: process.env.API_HOST
        }).catch(
            (error) => {
                if(error) {
                    $location.path('/signin');
                }
            })
            .then(function (resp) {
                if(!resp){
                    $location.path('/signin');
                }
            }).catch(function (error) {
            if(error) {
                $location.path('/signin');
            }
        });
    }, 1000);*/

    $interval(function () {
        if ($localStorage.currentUser) {
            $http({
                method: 'GET',
                url: process.env.API_HOST + '/auth/refresh-token',
                headers: {
                    'Authorization': `Bearer ${$localStorage.currentUser.token}`
                }
            }).catch(
                (error) => {
                    if (error) {
                        return false
                    }
                }).then(function (resp) {
                if (resp) {
                    $localStorage.currentUser = {email: $localStorage.currentUser.email, token: resp.data};
                    $http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
                } else {
                    $location.path('/signin');
                }
            }).catch(function (error) {
                if (error) {
                    $location.path('/signin');
                }
            });
        } else {
            $location.path('/signin');
        }
    }, 900000);
}

export function refreshPage($http, $localStorage, $location) {
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    } else {
        $location.path('/signin');
    }
}

export function redirect($rootScope, $location, $localStorage) {
    $rootScope.$on('$locationChangeStart', function () {
        let publicPages = ['/signin', '/signup'];
        let restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/');
        }
    })
}
