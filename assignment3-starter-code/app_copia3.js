(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

	function FoundItemsDirective() {
		var ddo = {
			restrict: 'AE',
			templateUrl: 'foundItems.html',
			scope: {
			found: '<',
			onRemove: '&'
			},
		controller: NarrowItDownDirectiveController,
		controllerAs: 'items',
		bindToController: true

		//found: '@found'
		//onRemove: '&remove'
		};
		return ddo;
	}

	NarrowItDownDirectiveController.$inject = ['MenuSearchService'];

	function NarrowItDownDirectiveController() {
		var items = this;
		//console.log("probando '$this'")
		//item.removeItem = function(index) {
		//console.log("se ejecuta removeItem desde Directive Controller");
		//MenuSearchService.removeItem(index);

	//}

		//items.foundItems = MenuSearchService.getMatchedMenuItems
		//console.log(items.foundItems);

	}

	var foundItems = []
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {

		var item = this;

		item.searchTerm = "";

		item.foundItems = foundItems;

		item.getMatchedItems = function (searchTerm) {


		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

		promise.then (function (response) {
			item.items = response.data.menu_items;
			//item.foundItems = [];

			for (var i = 0; i < item.items.length; i++) {
				if (item.items[i].description.includes(searchTerm)) {
					//item.foundItems.push(item.items[i]);
					foundItems.push(item.items[i]);
			};
		};

			console.log(foundItems);
		 	})
		.catch(function (error) {
			console.log(error);
		})

		console.log(searchTerm);

	return item.foundItems;

}

	item.removeItem = function(index) {
		console.log("se ejecuta removeItem");
		MenuSearchService.removeItem(index);
		//console.log('item.foundItems');
	}

}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];

	function MenuSearchService ($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {

			var response = $http ({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			params: {
				description: searchTerm
			}
			}
			)
			return response;

	}

		service.removeItem = function(index) {
			console.log('se ejecuta');
			//service.foundItems = service.getMatchedMenuItems()
			foundItems.splice(index, 1);

		}
		}

})
();
