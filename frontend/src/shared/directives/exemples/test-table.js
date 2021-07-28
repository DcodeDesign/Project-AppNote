'use strict';

function testTable(){
  return {
    restrict: 'A',
    scope: {
      rows: '=data'
    },
    templateUrl: require('./test-table.html'),
    link: function(scope){
      const unwatch = scope.$watch('rows', (nv, ov) => {
        if ( !!nv ) {
          unwatch();
          launch();
        }
      })
      function launch() {
        scope.headers = scope.rows.shift();
        console.log(scope.headers, scope.rows)
      }
    }
  }
}

angular.module(process.env.ROOT)
  .directive('testTable', testTable)

module.exports = {
  name: 'testTable',
  directive: testTable
}

