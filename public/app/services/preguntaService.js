angular.module('questionService', [])

.factory('questionService', function($http) {
 
	var questionFactory = {};
	 
	questionFactory.get = function(materialId, quizzId, questionId) {

		return $http.get('/api/materiales/' + materialId + '/quiz/' + quizzId + '/preguntas/' + questionId);

	};
  
	questionFactory.all = function(materialId, quizzId) {

		return $http.get('/api/materiales/' + materialId + '/quiz/' + quizzId + '/preguntas/' );
	};

	questionFactory.create = function(materialId, quizId, questionData) {

	return $http.post('/api/materiales/' + materialId + '/quiz/' + quizzId + '/preguntas/', questionData);

	};
  
	questionFactory.update = function(quizId, materialId, questionId, questionData) {

		return $http.put('/api/materiales/' + materialId + '/quiz/' + quizzId + '/preguntas/' + questionId, questionData);

	};

	questionFactory.delete = function(materialId, quizId, questionId) {

		return $http.delete('/api/materiales/' + materialId + '/quiz/' + quizzId + '/preguntas/' + questionId);

	};

  
	return questionFactory;

});