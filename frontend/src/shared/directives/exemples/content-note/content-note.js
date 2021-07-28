'use strict';
require('./content-note.css')
const marked = require("marked");

function ContentNoteCtrl($scope, $rootScope, NoteSvc, CategorySvc) {

    initController();

    function initController() {
        getAllCategories();
        onNewCategory();
        onSelectedNote();
        $scope.loadingNotes = false;
        $scope.activeViewNote = false;
        $scope.noteloadingCategories = false;
        $scope.noteCategories = null;
        $scope.cat_id = null;
        $scope.previewMarkDown = null;
        $scope.catSelected = null;
    }

    $scope.change = function ($event) {
        $scope.html = marked($event.target.value);
    };

    $scope.selectedCat = function (value) {
        return (value === $scope.cat_id ? 'selected' : '');
    }

    $scope.previewMarkDown = function (value) {
        return marked(value)
    }

    $scope.createNote = function () {
        $scope.loadingNotes = true;
        NoteSvc.updateOne($scope.note_id, $scope.titre, $scope.note, $scope.cat_id , function (result) {
            if (result.data) {
                $scope.loadingNotes = false;
                emitNewNote($scope.note_id);
                emitSelectedCategory($scope.cat_id);
            } else {
                $scope.errorNotes = 'Error';
                $scope.loadingNotes = false;
            }
        });
    }

    $scope.keyTab = function (e) {
        if (e.key === 'Tab') {
            e.target
            e.preventDefault();
            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;
            e.target.value = e.target.value.substring(0, start) +
                "\t" + e.target.value.substring(end);
            e.target.selectionStart =
                e.target.selectionEnd = start + 1;
        }
    }

    function onNewCategory() {
        $rootScope.$on('newCategory', function (event, message) {
            getAllCategories();
        })
    }

    function onSelectedNote() {
        $rootScope.$on('selectedNote', function (event, message) {
            NoteSvc.getOneNote(message.emit, function (result) {
                if (result) {
                    $scope.notes = result.data;
                    $scope.loadingNotes = false;
                    $scope.note_id = result.data._id;
                    $scope.titre = result.data.titre;
                    $scope.note = result.data.note;
                    $scope.cat_id = result.data.cat;
                    $scope.html = result.data.note ? marked(result.data.note) : '';
                    $scope.activeViewNote = true;
                } else {
                    $scope.errorNote = 'Error';
                    $scope.loadingNotes = false;
                    $scope.activeViewNote = false;
                }
            });
        })
    }

    function getAllCategories() {
        $scope.noteloadingCategories = true;
        CategorySvc.getAllCategories(function (result) {
            if (result) {
                $scope.noteCategories = result.data;
                $scope.noteLoadingCategories = false;
            } else {
                $scope.errorCategory = 'Error';
                $scope.noteLoadingCategories = false;
            }
        });
    }

    function emitSelectedCategory(value){
        $scope.$emit('selectedCategory', {
            emit: value
        })
    }

    function emitNewNote(value) {
        $scope.$emit('newNote', {
            emit: value
        })
    }
}

function contentNote() {
    return {
        restrict: 'E',
        templateUrl: require('./content-note.html')
    }
}

angular.module(process.env.ROOT)
    .controller('ContentNoteCtrl', ['$scope', '$rootScope', 'NoteSvc', 'CategorySvc', ContentNoteCtrl])
    .directive('contentNote', [contentNote]);

/*
module.exports = {
    name: 'contentNote',
    directive: contentNote
}
*/


