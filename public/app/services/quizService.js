angular.module('quizService', [])

.factory('quizService', function($http) {
 
	var quizFactory = {};
	 
	quizFactory.get = function(materialId, quizzId) {

		return $http.get('/api/materiales/' + materialId + '/quiz/' + quizzId);

	};
  
	quizFactory.all = function(materialId) {

		return $http.get('/api/materiales/' + materialId + '/quiz');
	};

	quizFactory.create = function(materialId, quizData) {

	return $http.post('/api/materiales/' + materialId + '/quiz', quizData);

	};
  
	quizFactory.update = function(quizId, materialId, quizData) {

		return $http.put('/api/materiales/' + materialId + '/quiz/' + quizzId, quizData);

	};

	quizFactory.delete = function(materialId, quizzId) {

		return $http.delete('/api/materiales/' + materialId + '/quiz/' + quizzId);

	};

  
	return quizFactory;

});