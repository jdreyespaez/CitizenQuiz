angular.module('materialService', [])

.factory('Material', function($http) {
 
	var materialFactory = {};
	 
	materialFactory.get = function(id) {

		return $http.get('/api/materiales/' + id);

	};
  
	materialFactory.all = function() {

		return $http.get('/api/materiales/');
	};

	materialFactory.create = function(materialData) {

	return $http.post('/api/materiales/', materialData);

	};
  
	materialFactory.update = function(id, materialData) {

		return $http.put('/api/materiales/' + id, materialData);

	};

	materialFactory.delete = function(id) {

		return $http.delete('/api/materiales/' + id);

	};

	materialFactory.getArea = function(Areaid) {

		return $http.get('/api/materiales/area' + Areaid);

	};

  
	return materialFactory;

});