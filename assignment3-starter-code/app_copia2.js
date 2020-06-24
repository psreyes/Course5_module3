(function () {
	'use strict';
	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
	//.directive('foundItems', foundItems)
	
	//function foundItems () {
		//var ddo = {
		//templateUrl: 'template.html'
		//scope: {
			//item.foundItems: '<',
		//}

		//}
	//}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController (MenuSearchService) {

		var item = this;

		item.searchTerm = "";

		item.getMatchedItems = function (searchTerm) {

		item.foundItems = MenuSearchService.getMatchedMenuItems(searchTerm);

		//item.foundItems = MenuSearchService.foundItems;

		console.log(item.foundItems);

			//return item.foundItems;

		//return item.foundItems;
		
}
}

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];

	function MenuSearchService ($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {

			var promise = $http ({
			method: "GET",
			url: (ApiBasePath + "/menu_items.json"),
			}
			)

			promise.then (function (response) {
				service.items = response.data.menu_items;
		 
				service.foundItems = [];

				for (var i = 0; i < service.items.length; i++) {
					if (service.items[i].description.includes(searchTerm)) {
					service.foundItems.push(service.items[i]);
					
					};
				};
			console.log(service.foundItems);
			console.log(searchTerm);
			//console.log(Array.isArray(service.foundItems));
			return service.foundItems;
		 	}
		 	)
		.catch(function (error) {
			console.log(error);
		})

		
	return promise;
	}
	}
})
();