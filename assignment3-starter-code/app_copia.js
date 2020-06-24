(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {

		var item = this;

		item.searchTerm = "";

		item.getMatchedItems = function (searchTerm) {

		//console.log("metodo getMatchedItems controller se ejecuta");

		//narrowit.foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);

		//console.log(narrowit.foundItems);

		var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

		promise.then (function (response) {
			item.items = response.data.menu_items;
			item.foundItems = [];

			for (var i = 0; i < item.items.length; i++) {
				if (item.items[i].description.includes(searchTerm)) {
					item.foundItems.push(item.items[i]);
					//if (item.items[i].description.includes(searchTerm)) {console.log(item.items[i])};
				//};
			};
};


			//item.foundItems.push(item.items.keys({description: searchTerm}))

			//{|i| if (i.description.contains(searchTerm)) {item.foundItems << i} }

			console.log(item.foundItems);
		 	})
		.catch(function (error) {
			console.log(error);
		})

		console.log(searchTerm);

		//promise.then (
		
		//function success (found) {
		//	return found.data;
		//},

		//function error (found) {

		//});
		
	//	};

	//};

	return item.foundItems;
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

			//console.log ("se ejecuta service.getMatchedMenuItems");

		/*return $http ({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			params: {
				description: searchTerm
			}
		}).then (function success (result) {
			var foundItems = result.data;
			return foundItems;
			console.log(foundItems);
		})
		.catch(function error (result) {
			console.log(result);
		})*/
	}
	}
})
();