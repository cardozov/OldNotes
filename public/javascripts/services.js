var app = angular.module('app');

app.factory('Caderno', ['$resource', function($resource) {
	return $resource('/cadernos/:id');
}]);

app.factory('Nota', ['$resource', function($resource) {
	return $resource('/cadernos/:cadernoId/notas/:id',
		{cadernoId: '@cadernoId', id: '@id'},
		{'update': {method:'PUT'}}
	);
}]);
