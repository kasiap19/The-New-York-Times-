var app = angular.module('myApp', []);
app.controller('appController', function($scope, $filter) {
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	url += '?' + $.param({
		'api-key': "853fc084776f46e29732e71b3f1269ae"
	});
	$.ajax({
		url: url,
		method: 'GET',
	}).done(function(result) {
		console.log(result);
		$scope.$apply(function(){
			$scope.results = result.results;
		});
	}).fail(function(err) {
		throw err;
	});


	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var today = yyyy+'-'+dd+'-'+mm;

	$scope.from="2017-02-02";
	$scope.to=today;

});

app.filter("myfilter", function() {
	return function(results, from, to) {
		return results.filter(function(results){
			return results.published_date >= from && results.published_date <= to;
		});
	};
});


