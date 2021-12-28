(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('familyProfileService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		var familyProfileService = {};
	 		familyProfileService.familyDetails = familyDetails;
	 		familyProfileService.requestedMembers = requestedMembers;
	 		familyProfileService.getProfileImage = getProfileImage;
	 		familyProfileService.acceptorcancelJoinRequest = acceptorcancelJoinRequest;
	 		familyProfileService.editFamilyProfile = editFamilyProfile;
	 		familyProfileService.cancelEditFamilyProfile = cancelEditFamilyProfile;
	 		familyProfileService.cancelAddMember = cancelAddMember;
	 		familyProfileService.saveMember = saveMember;
	 		familyProfileService.leaveFamily = leaveFamily;
	 		familyProfileService.cancelLeaveFamily = cancelLeaveFamily;
	 		familyProfileService.getprofileimage = getprofileimage;
	 		
	 		return familyProfileService;
	 		
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
	 				//	alert(response.error);
	 				});
	 			});
	 		};
	 		
	 		function familyDetails(familyCode, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.FAMILY_PROFILE_DETAILS + "?familyCode=" + familyCode;
	 			
	 			//	alert(url);
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {
	 						'Authorization': token
	 					}
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function requestedMembers(familyCode, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.FAMILY_JOIN_REQUEST_LIST + "?familyCode=" + familyCode;
	 			
	 			//	alert(url);
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {
	 						'Authorization': token
	 					}
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function getProfileImage(imagename, token){
	 			return $q(function(resolve, reject){
	 				url = "https://famapp.qarah5.com:8443/FamilyApp_WebApp" + imagename;
	 			
	 			//	alert("url ----" + url);
	 				return $http({
	 					method: 'GET',
	 					url: url,
	 					headers: {
	 						'Authorization': token
	 					}
	 				}).then(function success(response){	 
	 					//alert();
	 					resolve(response);
	 					 /*var data = response.data;
		 	 			    var file = new Blob([data], {
		 	 			      type: 'image/jpeg'
		 	 			    });
		 	 			    var fileURL = URL.createObjectURL(file);
		 	 			    window.open(fileURL);
		 	 			    return response;*/
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		
	 		function acceptorcancelJoinRequest(repliedData, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.APPROVE_REJECT_FAMILY_REQUEST;
	 			
	 			//	console.log("url: "+url);
	 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON',
	 						'Authorization': token
	 					},
	 					data: repliedData
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		
	 		function editFamilyProfile(familyprofile, token){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.EDIT_FAMILY_PROFILE;
	 				 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON',
	 						'Authorization': token
	 					},
	 					data: familyprofile
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		
	 		function cancelEditFamilyProfile(){
	 			window.location = "/FamilyApp_WebUI/views/homepage.html";
	 		};
	 		
	 		
	 		function saveMember(token, members){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.INVITE_FAMILY_MEMBER;
	 				 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON',
	 						'Authorization': token
	 					},
	 					data: members
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function cancelAddMember(){
	 			window.location = "/FamilyApp_WebUI/views/family_profile.html";
	 		};
	 		
	 		
	 		function leaveFamily(token, obj){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.LEAVE_FAMILY;
	 				 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON',
	 						'Authorization': token
	 					},
	 					data: obj
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function cancelLeaveFamily(){
	 			window.location = "/FamilyApp_WebUI/views/family_profile.html";
	 		};
	 	}]);
})();