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
			empty: '='
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
		//console.log(items.found);

		$timeout(function() {
			items.notfounded = function () {
				//console.log(items.empty);
				if (items.found != undefined) {
				if (items.empty == false) {
				if (items.found.length == 0) {
					return true
				}
		}
			};
		};
}, 10000)
}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {

		var item = this;

		item.i = 0

		item.getMatchedItems = function (searchTerm) {

		item.i += 1

		console.log (item.i);

		item.found = MenuSearchService.getMatchedMenuItems(searchTerm);

		console.log(item.found);

			item.empty = false;
			item.clicked = true;
}
		item.removeItem = function(index) {
			MenuSearchService.removeItem(index);
			if (item.found.length == 0) {
			item.empty = true;
		}
	}
}

	MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];

	function MenuSearchService ($http, ApiBasePath, $q) {
		var service = this;


		service.getMatchedMenuItems = function(searchTerm) {

			service.found = [];

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

					if (searchTerm.length != 0) {
						for (var i = 0; i < service.items.length; i++) {
							if (service.items[i].description.includes(searchTerm)) {
								service.found.push(service.items[i]);
				};
			};
		}
			 	})
			.catch(function (error) {
				console.log(error);
			})
		return service.found;

	}

		service.removeItem = function(index) {
			service.found.splice(index, 1);
		}
		}

})
();
