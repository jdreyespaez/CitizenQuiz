angular.module('dashboardCtrl', ['userService', 'projectService', 'threadService', 'materialService', 'areaService'])

.controller('dashboardController', function(Project, User, Thread, Material, Area) {

	var vm = this;

	User.all().success(function(data) {
		
		vm.users = data;

		vm.userCount = vm.users.length;
	});

	Project.all().success(function(data) {

		vm.projects = data;

		vm.projectCount = vm.projects.length;

	});

	Thread.all().success(function(data) {

		vm.threads = data;

		vm.threadCount = vm.threads.length;

	});

	Material.all().success(function(data) {

		vm.materials = data;

		vm.materialCount = vm.materials.length;

	});

	Area.all().success(function(data) {

		vm.areas = data;
		vm.areaCount = vm.areas.length;

	});

});