

var module = angular.module('familyapp', []);
module.controller('FamilyProfileController', function($scope, $document, $http) {
	$scope.editFamilyProfile = function() {
		
		
		var familyprofile = {
				id: 1,
			    familyCode: "F-390f856",
				familyName : $scope.familyName,
				description : $scope.familydescription,
				familyCreatorId: 2
				
		};
		
		alert('familyName' + $scope.familyName + '\n' +	'description' + $scope.familydescription);
		
		var config = {
				headers : {
		        	 'Content-Type': 'application/json',
		        	 'Authorization': 'Basic ' +'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjgxMDIzMDcsInVzZXJJZCI6MTUsImVtYWlsIjoid2ludHRoaXJpZ3JhY2VAZ21haWwuY29tIn0.FUrNbZBpqqrCCgBazRFgV6NW6xSkwkFx8apXDWQPFpwyvaIjORxwWGwnQ7wHnyA8kcagFyvfalYy4bH46jwiow'
				}
		       };
		
		
		/*var configapp = {
				headers:{ 'Content-type': 'applicaion/json'}
		};
		*/
	/*	var configAutho = {
				headers: "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjgxMDIzMDcsInVzZXJJZCI6MTUsImVtYWlsIjoid2ludHRoaXJpZ3JhY2VAZ21haWwuY29tIn0.FUrNbZBpqqrCCgBazRFgV6NW6xSkwkFx8apXDWQPFpwyvaIjORxwWGwnQ7wHnyA8kcagFyvfalYy4bH46jwiow"
		};*/
		/*var params = JSON.stringify(familyprofile);*/
		
		
		$http.post("http://192.168.2.104:8080/FamilyApp_WebApp/api/auth/familyprofile/edit",{
			headers : {
	        	 'Content-Type': 'application/json',
	        	 'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MjgxMDIzMDcsInVzZXJJZCI6MTUsImVtYWlsIjoid2ludHRoaXJpZ3JhY2VAZ21haWwuY29tIn0.FUrNbZBpqqrCCgBazRFgV6NW6xSkwkFx8apXDWQPFpwyvaIjORxwWGwnQ7wHnyA8kcagFyvfalYy4bH46jwiow'
			}
	       }, familyprofile).success(function(response){
			alert("success success success");
			
		}).error(function(){
			alert("error error error");
		});
	};
});