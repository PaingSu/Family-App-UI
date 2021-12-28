(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('waitingFamilyService', ['$http', 'WEBAPI', '$q','$sce', function($http, WEBAPI, $q, $sce){
	 		var waitingFamilyService = {};
	 		
	 		waitingFamilyService.getprofileimage = getprofileimage;
	 		/*joinFamilyService.getImage = getImage;*/
	 		
	 		return waitingFamilyService;
	 		
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