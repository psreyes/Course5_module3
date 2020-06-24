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
			onRemove: '&',
			i: '='
			//getMatchedItems: '&'
			},
		controller: NarrowItDownDirectiveController,
		controllerAs: 'items',
		bindToController: true

		};
		return ddo;
	}

	NarrowItDownDirectiveController.$inject = ['MenuSearchService', '$timeout'];

	function NarrowItDownDirectiveController(MenuSearchService, $timeout) {
		var items = this;
		console.log(items.found);
		//console.log(items.i)

		//var promise = items.found

		//promise.then (function (response) {
		//$timeout(function() {
			//items.getMatchedItems.then (function (getMatchedItems) {
			items.founded = function () {
				//console.log(items.i);
			//if (items.i >= 0) {
			if (items.found != undefined) {
				if (items.found.length == 0) {
					return true
				}
			};
		//}
		};
	//}
	//)
	//}, 5000)
}
	//}
	//)
	//	items.updatedItems = MenuSearchService.foundItems
		//items.$digest()
		//$scope.$digest();
		//if (MenuSearchService.foundItems.length == 0) {
			//console.log("Nothing found")
		//}
	//}


	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {

		var item = this;

		item.i = 0

		item.searchTerm = "";

		item.getMatchedItems = function (searchTerm) {

		item.i += 1

		console.log (item.i);

		item.foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);

		console.log(item.foundItems);

}
	item.removeItem = function(index) {
		MenuSearchService.removeItem(index);
	}
}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];

	function MenuSearchService ($http, ApiBasePath) {
		var service = this;


		service.getMatchedMenuItems = function(searchTerm) {

			service.foundItems = [];

			//service.searchTerm = "";

			var promise = $http ({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			params: {
				description: searchTerm
			}
			}
			)

			promise.then (function (promise) {
				service.items = promise.data.menu_items;
				console.log(promise.data)
				console.log(searchTerm.length)
				if (searchTerm.length != 0) {
				for (var i = 0; i < service.items.length; i++) {
					if (service.items[i].description.includes(searchTerm)) {
						service.foundItems.push(service.items[i]);
				};
			};
		}
			 	})
			.catch(function (error) {
				console.log(error);
			})
		return service.foundItems;

	}

		service.removeItem = function(index) {
			service.foundItems.splice(index, 1);
		}
		}

})
();
