angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl : 'app/views/pages/home.html'

    })

    .when('/login', {
      templateUrl : 'app/views/pages/login.html',
      controller  : 'mainController',
      controllerAs: 'login'
    })

    .when('/dashboard', {
        templateUrl: 'app/views/pages/dashboard.html',
        controller: 'dashboardController',
        controllerAs: 'dashboard'
    })

    .when('/users', {
        templateUrl: 'app/views/pages/users/all.html',
        controller: 'userController',
        controllerAs: 'user'
    })

    .when('/users/create', {
        templateUrl: 'app/views/pages/users/single.html',
        controller: 'userCreateController',
        controllerAs: 'user'
    })

    .when('/users/:user_id', {
      templateUrl: 'app/views/pages/users/view.html',
      controller: 'userViewController',
      controllerAs: 'user'
    })

    .when('/users/:user_id/edit', {
      templateUrl: 'app/views/pages/users/single.html',
      controller: 'userEditController',
      controllerAs: 'user'
    })

    .when('/materiales', {
      templateUrl:'app/views/pages/materials/all.html',
      controller: 'materialController',
      controllerAs: 'material'
    })

    .when('/materiales/create', {
      templateUrl: 'app/views/pages/materials/single.html',
      controller: 'materialCreateController',
      controllerAs: 'material'
    })

    .when('/materiales/:material_id', {
      templateUrl: 'app/views/pages/materials/view.html',
      controller: 'materialViewController',
      controllerAs: 'material'
    })

    .when('/materiales/:material_id/edit', {
      templateUrl: 'app/views/pages/materials/single.html',
      controller: 'materialEditController',
      controllerAs: 'material'
    })

    .when('/materiales/:material_id/quiz', {
      templateUrl: 'app/views/pages/quizzes/single.html',
      controller: 'quizCreateController',
      controllerAs: 'quiz'
    })

    .when('/areas', {
      templateUrl: 'app/views/pages/areas/all.html',
      controller: 'areaController',
      controllerAs: 'area'
    })

    .when('/areas/create', {
      templateUrl: 'app/views/pages/areas/single.html',
      controller: 'areaCreateController',
      controllerAs: 'area'
    })

    .when('/mensajes', {
      templateUrl: 'app/views/pages/messages/all.html',
      controller: 'messageController',
      controllerAs: 'mensaje'
    })

    .when('/mensajes/create', {
      templateUrl: 'app/views/pages/messages/single.html',
      controller: 'messageCreateController',
      controllerAs: 'mensaje'
    });

$locationProvider.html5Mode(true);

});
