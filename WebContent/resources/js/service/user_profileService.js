(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('user_profileService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		var user_profileService = {};
	 		user_profileService.getuser_profile = getuser_profile;
	 		user_profileService.editprofile = editprofile;
	 		user_profileService.changepassword = changepassword;
	 		user_profileService.getprofileimage = getprofileimage;
	 		
	 		return user_profileService;
	 		
	 		function getuser_profile(token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.GET_MYPROFILE;
	 				
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {'Authorization': token},
	 					
	 				}).then(function success(response){	 
	 					
	 					resolve(response);
	 				},function error(data, status, headers, config,response){
	 					reject(data);
	 					alert(response.error);
	 				});
	 			});
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
	 		
	 		function editprofile(edit_user,token) {
                return $q(function(resolve, reject) {
                	var params = JSON.stringify(edit_user);
                    url = WEBAPI.EDIT_MYPROFILE; 
            
                    return $http({
                        method: 'PUT',
                        url: url,
                        headers: {
        					'Content-Type': 'application/json',
        					'Authorization': token
        				},
                        data: params
                    }).then(function success(response) {
                        resolve(response);
                    }, function error(error) {
                        reject(error);
                    });
                });
            };
            
            function changepassword(changepassword,token) {
                return $q(function(resolve, reject) {
                	var params = JSON.stringify(changepassword);
                    url = WEBAPI.CHANGE_PASSWORD; 

                    return $http({
                        method: 'POST',
                        url: url,
                        headers: {
        					'Content-Type': 'application/json',
        					'Authorization': token
        				},
                        data: params
                    }).then(function success(response) {
                        resolve(response);
                    }, function error(error) {
                        reject(error);
                    });
                });
            };
	 	}]);
})();