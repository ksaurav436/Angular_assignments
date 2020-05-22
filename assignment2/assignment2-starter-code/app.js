(function(){
'use strict'

angular.module('ShoppingListCheckOff', [])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var to_buy_1 = this;
	to_buy_1.item_name = ""
	to_buy_1.item_quantity = ""

	to_buy_1.list = ShoppingListCheckOffService.get_to_buy()
	to_buy_1.b = function(index) {
		ShoppingListCheckOffService.checkoff(index)
	}
	to_buy_1.add = function(){
		if (to_buy_1.item_name === "") {
			to_buy_1.error = "Please enter item to add!"
		} 
		else {
		ShoppingListCheckOffService.addIt(to_buy_1.item_name,to_buy_1.item_quantity);
		}
	}
	to_buy_1.cleartobuylist = function(){
		ShoppingListCheckOffService.clearittobuy();
	}
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought_1 = this

	bought_1.list = ShoppingListCheckOffService.get_bought()
	bought_1.clearboughtlist = function(){
		ShoppingListCheckOffService.clearitbought();
	}
	bought_1.missclick = function(index){
		ShoppingListCheckOffService.missclick(index)
	}
}


function ShoppingListCheckOffService() {
	var service = this;

	var buy_list =  [
	{ 
		name: "something", 
		quantity: 3
	},
	{
		name: "another",
		quantity: 4
	},
	{
		name: "buscuits",
		quantity: 11
	},
	{
		name: "life",
		quantity: "some"
	},
	{
		name: "money",
		quantity: "1,000,000"
	}
	];
	var bought_list =  [];

	service.checkoff = function (index){
		bought_list.push(buy_list[index]);
		buy_list.splice(index,1);
	};

	service.get_to_buy = function(){
		return buy_list;
	}

	service.get_bought = function(){
		return bought_list;
	}

	service.addIt = function(newname,newquantity){
		buy_list.push({
			name:newname,
			quantity:newquantity
		})
	}

	service.clearitbought = function(){
		bought_list.splice(0,bought_list.length)
	}

	service.missclick = function(index){
		buy_list.push(bought_list[index]);
		bought_list.splice(index,1);
	}

	service.clearittobuy = function(){
		buy_list.splice(0,buy_list.length)
	}
}
})();
