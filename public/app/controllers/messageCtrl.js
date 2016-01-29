angular.module('messageCtrl', ['messageService'])

.controller('messageController', function(Message) {

	var vm = this;

	Message.all()
	.success(function(data) {
		vm.messages = data;
	});

	vm.deleteMessage = function(id) {

		vm.processing = true;

		Message.delete(id)
			.success(function(data) {

				Message.all()
					.success(function(data) {
						vm.messages = data;
					});

			});

	};

})

.controller('messageCreateController', function(Message) {

	var vm = this;

	vm.type = 'create';

	vm.saveMessage = function() {

		Message.create(vm.mensajeData)
			.success(function(data) {
				vm.mensajeData =  {};
				vm.message = data.message;
			});
	};

});
