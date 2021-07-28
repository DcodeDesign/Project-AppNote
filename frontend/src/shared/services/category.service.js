'use strict';

function CategorySvc($http, ErrorHttpSvc) {

    function createCategory(titre, callback) {
        $http.post(process.env.API_HOST + '/category/create', {titre: titre})
            .catch(function (error) {
                if (error) {
                    return false;
                }
            }).then(function (response) {
            if (response) {
                console.log('successful')
                callback(true);
            } else {
                console.log('failed')
                callback(false);
            }
        }).catch(function(error) {
            if(error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        });
    }

    function getAllCategories(callback) {
        $http.get(process.env.API_HOST + '/category/getAll')
            .then(function (response) {
                callback(response)
            }).catch(function (error) {
            if (error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        })
    }

    return {
        createCategory: createCategory,
        getAllCategories: getAllCategories
    }

}

const serviceConfig = [
    '$http',
    'ErrorHttpSvc',
    CategorySvc
]

angular.module(process.env.ROOT)
    .factory('CategorySvc', serviceConfig)

module.exports = {
    name: 'CategorySvc',
    factory: serviceConfig
}

