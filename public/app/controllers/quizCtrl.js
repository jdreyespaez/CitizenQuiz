angular.module('quizCtrl', ['materialService', 'quizService'])

  .controller('quizController', function(Quiz){

    var vm = this;

    Quiz.all()
      .success(function(data) {

        vm.quizzes = data;

      });

    vm.deleteQuiz = function(id) {

      vm.processing = true;

      Quiz.delete(id)
        .success(function(data) {

          Quiz.all()
            .success(function(data) {
              vm.quizzes = data;
            });

        });

    };

  })


.controller('quizCreateController', function(Quiz, Material) {

  var vm = this;

  vm.type = 'create';

  Quiz.all()
    .success(function(data) {
      vm.quizzes = data;
    });

  vm.saveQuiz = function() {

    Quiz.create(vm.quizData)
      .success(function(data) {
        vm.processing = false;
        vm.quizData = {};

      });
  };
});
