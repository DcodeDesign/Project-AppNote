'use strict';
require('./note-category.component.css')

function controller($scope, CategorySvc) {

    initController()

    function initController() {
        $scope.isActiveCategory = true;
        $scope.category = null;
        $scope.categories = null;
        $scope.loadingCategory = false;
        $scope.activeCategory = null;
        $scope.loadingCategories = false;
        getAllCategories();
    }

    $scope.activeCreaCat = function () {
        $scope.isActiveCategory = !$scope.isActiveCategory;
    }

    $scope.createCategory = function () {
        $scope.loadingCategory = true;
        CategorySvc.createCategory($scope.category, function (result) {
            if (result === true) {
                $scope.loading = false;
                getAllCategories();
                $scope.activeCreaCat();
                emitEventCat($scope.category)
            } else {
                $scope.errorCategory = 'Error';
                $scope.loadingCategory = false;
            }
        });
    }

    function getAllCategories() {
        $scope.loadingCategories = true;
        CategorySvc.getAllCategories(function (result) {
            if (result) {
                $scope.categories = result.data;
                $scope.loadingCategories = false;
            } else {
                $scope.errorCategory = 'Error';
                $scope.loadingCategories = false;
            }
        });
    }

    $scope.selectedCategory = function (value) {
        $scope.activeCategory = value;
        emitSelectedCategory(value)
    }

    function emitEventCat(value){
        $scope.$emit('newCategory', {
            emit: value
        })
    }

    function emitSelectedCategory(value){
        $scope.$emit('selectedCategory', {
            emit: value
        })
    }
}

const controllerConfig = [
    '$scope', 'CategorySvc', controller
]

angular.module(process.env.ROOT)
    .component('noteCategory', {
        templateUrl: require('./note-category.component.html'),
        controller: controllerConfig
    })
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('/note-category', {
            template: '<note-category></note-category>',
            name: 'noteCategory',
            url: '/note-category'
        });
    }]);
