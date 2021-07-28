'use strict';
require('./note-list.component.css')

function controller($scope, $rootScope, NoteSvc) {

    initController();

    function initController() {
        $scope.formData = {};
        $scope.loadingList = false;
        $scope.isActiveCreaNote = false;
        $scope.activeNote = null;
        $scope.cat_id = $scope.noteId;
        $scope.note = '';
        $scope.notes = [];
        getNotes();
    }

    $rootScope.$on('newNote', function(e, message){
        $scope.noteId = message.emit;
        getNotes();
    })

    $rootScope.$on('selectedCategory', function(event, message){
        console.log(message.emit, $scope.cat_id);
        if(message.emit) {
            getCatNotes(message.emit);
        } else {
            getCatNotes($scope.cat_id);
        }
    })

    $scope.activeCreaNote = function () {
        $scope.isActiveCreaNote = !$scope.isActiveCreaNote;
    }

    $scope.createNote = function () {
        $scope.loading = true;
        NoteSvc.createNote($scope.formData.newNote, $scope.note, $scope.cat_id, function (result) {
            if (result) {
                $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                getCatNotes($scope.cat_id);
                $scope.noteId = result.data._id;
                $scope.selectedNote(result.data._id);
            } else {
                $scope.errorList = 'Error';
                $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                $scope.activeNote = null;
            }
        });
    }

    $scope.selectedNote = function (value) {
        $scope.activeNote = value;
        emitEvent(value)
    }

    function getNotes() {
        // $scope.loadingList = true;
        NoteSvc.getAllNotes(function (result) {
            if (result) {
                $scope.notes = result.data;
                // $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                $scope.activeNote = $scope.noteId;
            } else {
                $scope.error = 'Error';
                // $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                $scope.activeNote = null;
            }
        });
    }

    function getCatNotes(cat_id) {
        $scope.loadingList = true;
        NoteSvc.getCatNotes(cat_id,function (result) {
            if (result) {
                $scope.notes = result.data;
                $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                $scope.activeNote = $scope.noteId;
                $scope.cat_id = cat_id;
            } else {
                $scope.errorList = 'Error';
                $scope.loadingList = false;
                $scope.isActiveCreaNote = false;
                $scope.activeNote = null;
            }
        });
    }

    function emitEvent(value){
        $scope.activeNote = value;
        $rootScope.$emit('selectedNote', {
            emit: value
        })
    }
}

const controllerConfig = [
    '$scope', '$rootScope', 'NoteSvc', controller
]

angular.module(process.env.ROOT)
    .component('noteList', {
        templateUrl: require('./note-list.component.html'),
        controller: controllerConfig
    })
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('/note-list', {
            template: '<note-list></note-list>',
            name: 'noteList',
            url: '/note-list'
        });
    }]);


