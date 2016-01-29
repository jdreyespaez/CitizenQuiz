angular.module('messageService', [])

.factory('Message', function($http) {
 
	var messageFactory = {};
	 
	messageFactory.get = function(id) {

		return $http.get('/api/mensajes/' + id);

	};
  
	messageFactory.all = function() {

		return $http.get('/api/mensajes/');
	};

	messageFactory.create = function(messageData) {

	return $http.post('/api/mensajes/', messageData);

	};
  
	messageFactory.update = function(id, messageData) {

		return $http.put('/api/mensajes/' + id, messageData);

	};

	messageFactory.delete = function(id) {

		return $http.delete('/api/mensajes/' + id);

	};
  
	return messageFactory;

});