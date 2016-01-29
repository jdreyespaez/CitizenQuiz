angular.module('userApp', [
  'ngAnimate',
  'app.routes',
  'authService',
  'userService',
  'mainCtrl',
  'userCtrl',
  'dashboardCtrl',
  'materialCtrl',
  'areaCtrl',
  'messageCtrl'
])

.config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

});