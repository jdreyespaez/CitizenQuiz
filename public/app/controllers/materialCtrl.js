angular.module('materialCtrl', ['materialService', 'areaService'])

.controller('materialController', function(Material) {

	var vm = this;

	Material.all()
		.success(function(data) {

			vm.materials = data;

		});

	vm.deleteMaterial = function(id) {

		vm.processing = true;

		Material.delete(id)
			.success(function(data) {

				Material.all()
					.success(function(data) {
						vm.materials = data;
					});

			});

	};

})


.controller('materialCreateController', function(Material,Area) {

	var vm = this;

	vm.type = 'create';

	Area.all()
		.success(function(data) {
			vm.areas = data;
		});

	vm.saveMaterial = function() {

		Material.create(vm.materialData)
			.success(function(data) {
				vm.processing = false;
				vm.materialData =  {};
				vm.message = data.message;
			});
	};
})

.controller('materialEditController', function($routeParams, Material, Area) {

	var vm = this;

	vm.type = 'edit';

	Area.all()
		.success(function(data) {
			vm.areas = data;
		});

	Material.get($routeParams.material_id) .success(function(data) {
				
				vm.materialData = data;
			
			});

	vm.saveMaterial = function() {

		vm.message = '';

		Material.update($routeParams.material_id, vm.materialData)
		.success(function(data) {
			vm.materialData = {};
			vm.message = data.message;
		});
	};

})

.controller('materialViewController', function($routeParams, Material) {

    var vm = this;
    
    Material.get($routeParams.material_id)
    .success(function(data) {
        vm.materialData = data;
    });

});
