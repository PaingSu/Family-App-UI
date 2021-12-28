(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('createfamilyService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		var createfamilyService = {};
	 		createfamilyService.createFamily = createFamily;
	 		createfamilyService.cancelCreateFamily = cancelCreateFamily;
	 		createfamilyService.getprofileimage = getprofileimage;
	 		
	 		return createfamilyService;
	 		
	 		function createFamily(familydetails, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.CREATE_FAMILY_PROFILE;
	 			
	 			//	console.log("url: "+url);
	 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON',
	 						'Authorization': token
	 					},
	 					data: familydetails
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function cancelCreateFamily(){
	 			window.location = "/FamilyApp_WebUI/views/homepage.html";
	 		};
	 		
	 		
	 		function getprofileimage(profileimage,token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.DOWNLOAD_IMAGE+profileimage;
	 				
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {'Authorization': token},
	 					responseType: 'arraybuffer'
	 				}).then(function success(response){	 
	 					
	 					resolve(response);
	 				},function error(data, status, headers, config,response){
	 					reject(data);
	 					alert(response.error);
	 				});
	 			});
	 		};
	 		
	 	}]);
})();