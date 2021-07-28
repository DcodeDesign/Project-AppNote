'use strict';

function NoteSvc($rootScope, $http, ErrorHttpSvc) {

    function createNote(titre, note, cat_id, callback) {
        $http.post(process.env.API_HOST + '/note/create', {titre: titre, note: note, cat: cat_id})
            .catch(function (error) {
                if (error) {
                    ErrorHttpSvc.error();
                    console.log(error)
                    return false;
                }
            }).then(function (response) {
            if (response) {
                callback(response);
            } else {
                callback(false);
            }
        }).catch(function (error) {
            if (error) {
                console.log(error)
                ErrorHttpSvc.error();
            }
        });
    }

    function getCatNotes(cat_id, callback) {
        $http.get(process.env.API_HOST + '/note/getAllByCategory/' + cat_id)
            .catch(function (error) {
                if (error) {
                    ErrorHttpSvc.error();
                    return false;
                }
            }).then(function (response) {
            if (response) {
                callback(response);
            } else {
                callback(response);
            }
        }).catch(function (error) {
            if (error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        });
    }

    function getAllNotes(callback) {
        $http.get(process.env.API_HOST + '/note/getAll')
            .catch(function (error) {
                console.log(error)
                if (error) {
                    ErrorHttpSvc.error();
                    return false;
                }
            }).then(function (response) {
            callback(response)
        }).catch(function (error) {
            if (error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        });
    }

    function getOneNote(note_id, callback) {
        $http.get(process.env.API_HOST + '/note/getOne/' + note_id,)
            .catch(function (error) {
                console.log(error)
                if (error) {
                    ErrorHttpSvc.error();
                    return false;
                }
            }).then(function (response) {
            callback(response);
        }).catch(function (error) {
            if (error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        });
    }

    function updateOne(note_id, titre, note, cat_id, callback) {
        $http.put(process.env.API_HOST + '/note/updateOne/' + note_id, {titre: titre, note: note, cat: cat_id})
            .catch(function (error) {
                console.log(error)
                if (error) {
                    ErrorHttpSvc.error();
                    return false;
                }
            }).then(function (response) {
            callback(response);
        }).catch(function (error) {
            if (error) {
                ErrorHttpSvc.error();
                console.log(error)
            }
        });
    }

    return {
        createNote: createNote,
        getAllNotes: getAllNotes,
        getCatNotes: getCatNotes,
        getOneNote: getOneNote,
        updateOne: updateOne
    }

}

const serviceConfig = [
    '$rootScope',
    '$http',
    'ErrorHttpSvc',
    NoteSvc,
]

angular.module(process.env.ROOT)
    .factory('NoteSvc', serviceConfig)

module.exports = {
    name: 'NoteSvc',
    factory: serviceConfig
}

