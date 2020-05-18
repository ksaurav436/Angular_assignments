(function(){
'use strict'

angular.module('Checker', [])

.controller('LunchChecker', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
	$scope.message = "Go ahead"

	$scope.Check = function(){
		if ($scope.foods == undefined){
			$scope.message = "Please enter data first"
		}
		var arr = $scope.foods.split(",")

		var count = 0
		for (var i = arr.length - 1; i >= 0; i--) {
			if (arr[i] != ""){
				count += 1
			}
		}

		if (count <= 3) {
			$scope.message = "Enjoy!"
		}
		else{
			$scope.message = "Too much!"
		}
	}
}

})();