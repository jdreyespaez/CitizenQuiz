angular.module('areaService', [])

.factory('Area', function($http) {
 
	var areaFactory = {};
	 
	areaFactory.get = function(id) {

		return $http.get('/api/areas/' + id);

	};
  
	areaFactory.all = function() {

		return $http.get('/api/areas/');
	};

	areaFactory.create = function(areaData) {

	return $http.post('/api/areas/', areaData);

	};
  
	areaFactory.update = function(id, areaData) {

		return $http.put('/api/areas/' + id, areaData);

	};

	areaFactory.delete = function(id) {

		return $http.delete('/api/areas/' + id);

	};
  
	return areaFactory;

});