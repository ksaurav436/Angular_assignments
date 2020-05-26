(function(){
'use strict';

angular.module('NarrowItDownApp', [])

.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService);

NarrowItDownController.$inject = ['MenuSearchService','$scope'];
function NarrowItDownController(MenuSearchService,$scope) {
	var ctrl = this;

	ctrl.searchTerm = ""
	
	ctrl.func = function() {
		var x = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
		x.then(function(){ctrl.found = x.$$state.value})
	}
}


MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
	var service = this;

	service.getMatchedMenuItems = function(searchTerm){
		return $http({
			method: "GET",
			url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
		})
		.then(function(result) {
			var foundItems = []
			if (searchTerm == "") {
				return foundItems
			}
			var data = result.data.menu_items
			for (var i=0; i<data.length; i++) {
				if (data[i].description.indexOf(searchTerm) != -1) {
					foundItems.push(data[i])
				}
			}
			return foundItems
		})
	};
}
})();
