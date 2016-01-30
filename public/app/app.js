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
  'messageCtrl',
  'quizCtrl'
])

.config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

});
