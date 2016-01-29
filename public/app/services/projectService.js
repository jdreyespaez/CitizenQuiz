angular.module('projectService', [])

.factory('Project', function($http) {
 
	var projectFactory = {};
	 
	projectFactory.get = function(id) {

		return $http.get('/api/proyectos/' + id);

	};
  
	projectFactory.all = function() {

		return $http.get('/api/proyectos/');
	};

	projectFactory.create = function(projectData) {

	return $http.post('/api/proyectos/', projectData);

	};
  
	projectFactory.update = function(id, projectData) {

		return $http.put('/api/proyectos/' + id, projectData);

	};

	projectFactory.delete = function(id) {

		return $http.delete('/api/proyectos/' + id);

	};

	projectFactory.createComment = function(id) {

		return $http.post('/api/proyectos/' + id + '/comentarios');

	};
  
	return projectFactory;

});