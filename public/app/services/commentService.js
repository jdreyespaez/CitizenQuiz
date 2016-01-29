angular.module('commentService', [])

.factory('Comment', function($http) {
 
	var commentFactory = {};
  
	commentFactory.all = function() {

		return $http.get('/api/comentarios/');
	};

	commentFactory.delete = function(id) {

		return $http.delete('/api/comentario/' + id);

	};
  
	return commentFactory;

});