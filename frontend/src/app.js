
import angular from 'angular';
import '@uirouter/angularjs';
import 'ngstorage';
import 'angular-messages';
import 'angular-sanitize';

require('dotenv').config();

// bootstrap and deps
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('font-awesome/css/font-awesome.css')
require('popper.js/dist/popper.js');
require('jquery/dist/jquery.js');

function importAll(r) {
  r.keys().forEach(r);
}

import {redirect, refreshPage, refreshToken} from "./shared/services/sessionUser.service";
angular.module(process.env.ROOT, ['ui.router', 'ngStorage', 'ngMessages', 'ngSanitize'])
    .config(['$urlRouterProvider', function ($urlRouterProvider){
      $urlRouterProvider.otherwise('/home')
    }])
    .run(['$rootScope', '$http', '$location', '$localStorage', '$interval', refreshToken])
    .run(['$http', '$localStorage', '$location', refreshPage])
    .run(['$rootScope', '$location', '$localStorage', redirect]);

require('./shared/services');
require('./shared/filters');
require('./shared/directives')
require('./shared/components')

importAll(require.context('./public/signin', false, /.js$/))
importAll(require.context('./public/signup', false, /.js$/))
importAll(require.context('./private/account', false, /.js$/))
importAll(require.context('./private/home', true, /.js$/))

require('./app.css');
import './index.html';
console.log('App is Ready')




