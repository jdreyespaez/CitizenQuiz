angular.module('areaCtrl', ['areaService'])

.controller('areaController', function(Area) {

	var vm = this;

	Area.all()
		.success(function(data) {

			vm.areas = data;

		});


	vm.deleteArea = function(id) {

		Area.delete(id)
			.success(function(data) {

				Area.all()
					.success(function(data) {
						vm.areas = data;
					});

			});

	};

})


.controller('areaCreateController', function(Area) {

	var vm = this;

	vm.type = 'create';

	vm.saveArea = function() {

		Area.create(vm.areaData)
			.success(function(data) {
				vm.areaData =  {};
				vm.message = data.message;
			});

	};


});