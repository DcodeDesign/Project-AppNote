'use strict';
require('./note-list.css')

function NoteListCtrl($scope, NoteSvc, CategorySvc) {

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

    $scope.$on('newNote', function(e, message){
        $scope.noteId = message.emit;
        getNotes();
    })

    $scope.$on('selectedCategory', function(event, message){
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
        $scope.$emit('selectedNote', {
            emit: value
        })
    }
}

function noteList(NoteSvc) {
    return {
        restrict: 'E',
        templateUrl: require('./note-list.html'),
    }
}

angular.module(process.env.ROOT)
    .controller('NoteListCtrl', ['$rootScope', 'NoteSvc','CategorySvc', NoteListCtrl])
    .directive('noteList', ['NoteSvc', noteList])

module.exports = {
    name: 'noteList',
    directive: noteList
}

