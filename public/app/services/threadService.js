angular.module('threadService', [])

.factory('Thread', function($http) {
 
	var threadFactory = {};
	 
	threadFactory.get = function(id) {

		return $http.get('/api/hilos/' + id);

	};
  
	threadFactory.all = function() {

		return $http.get('/api/hilos/');
	};

	threadFactory.create = function(threadData) {

	return $http.post('/api/hilos/', threadData);

	};
  
	threadFactory.update = function(id, threadData) {

		return $http.put('/api/hilos/' + id, threadData);

	};

	threadFactory.delete = function(id) {

		return $http.delete('/api/hilos/' + id);

	};

	threadFactory.createComment = function(id) {

		return $http.post('/api/hilos/' + id + '/comentarios');

	}
  
	return threadFactory;

});