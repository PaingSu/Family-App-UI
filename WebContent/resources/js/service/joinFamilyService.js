(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('joinFamilyService', ['$http', 'WEBAPI', '$q','$sce', function($http, WEBAPI, $q, $sce){
	 		var joinFamilyService = {};
	 		joinFamilyService.getFamilyName = getFamilyName;
	 		joinFamilyService.joinFamily = joinFamily;
	 		joinFamilyService.getFamilyImage = getFamilyImage;
	 		/*joinFamilyService.getprofileimage = getprofileimage;*/
	 		/*joinFamilyService.getImage = getImage;*/
	 		
	 		return joinFamilyService;
	 		
	 		/*function getprofileimage(profileimage,token){
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
	 		};*/
	 		
	 		function getFamilyName(fid,token){
	 			return $q(function(resolve, reject){
	 			    var params = {};
	                params['familyCode'] = fid;
	 				url = WEBAPI.GET_FAMILY_NAME;
	 				
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {'Authorization': token},
	 					params: params
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config,response){
	 					reject(data);
	 					alert(response.error);
	 				});
	 			});
	 		};
	 		
	 		function joinFamily(familyid,token) {
                return $q(function(resolve, reject) {
                    
                	var params = JSON.stringify(familyid);
                	/*alert(params);*/
                    url = WEBAPI.JOIN_FAMILY; //+ "?data=" + JSON.stringify(user_obj);
                        //console.log(user_obj);
                    return $http({
                        method: 'POST',
                        url: url,
                        headers: {
        					'Content-Type': 'application/json',
        					'Authorization': token
        				},
        				data: params
                     
                    }).then(function success(response) {
                        console.log(response.data);
                        resolve(response);
                    }, function error(error) {
                        reject(error);
                        alert("Error Join")
                    });
                });
            }
	 		
	 		function getFamilyImage(familycode,token){
	 			return $q(function(resolve, reject){
	 				
	                var params = {};
	                params['familyCode'] = familycode;
	 				url = WEBAPI.FAMILY_PROFILE_DETAILS;
	 				
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {'Authorization': token},
	 					params: params
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config,response){
	 					reject(data);
	 					alert(response.error);
	 				});
	 			});
	 		};
	 		
	 		
	 		/*function getImage(image_name, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.URL  + image_name;

	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {'Authorization': token},
	 					
	 				}).then(function success(response){	 
	 					alert(JSON.stringify(response));
	 					//var image = url;
	 					resolve(response);
	 				},function error(data, status, headers, config,response){
	 					reject(data);
	 				//	alert(response.error);
	 				});
	 			});*/

	 			
	 			/* $http({
 					method: 'GET',
 					url: WEBAPI.URL  + image_name,
 					headers: {
 						'Authorization': token
 					}
                }).then(function success(response){	
                	console.log("response from html: "+response.data)
	 					alert("message"+JSON.stringify(response));
	 				return response.data;
	 				},function error(data, status, headers, config){
	 					console.log("this is from error")
	 					return null;
	 			});
	 			
	 			console.log("image name: "+image_name+" "+token)
	 			/* var base64Matcher = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$");

	                if (typeof image_name == 'undefined' || image_name == "" || image_name == "null" || image_name == null) {
	                    return "img/empty_img.png";
	                }
	               
	                if (image_name.indexOf("data:image/") != -1) {
	                    return image_name;
	                }
	                console.log("Image Path: "+$sce.trustAsResourceUrl(WEBAPI.URL + image_name));
	               // return $sce.trustAsResourceUrl(WEBAPI.URL  + image_name);
	                return $http({
	 					method: 'GET',
	 					url: WEBAPI.URL  + image_name,
	 					headers: {
	 						'Authorization': token
	 					}
	                }).then(function success(response){	
	                	console.log("response: "+response.data)
		 				//	alert(JSON.stringify(response));
		 					//resolve(response);
	                	return response.data;
		 				},function error(data, status, headers, config){
		 					//reject(data);
		 				});*/
	 		
	 	}]);
})();