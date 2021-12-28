(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('headerService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		
	 		var headerService = {};
	 		headerService.homepage = homepage;
	 		headerService.userprofile = userprofile;
	 		headerService.logout = logout;
	 		headerService.chatting = chatting;
	 		headerService.calendar = calendar;
	 		headerService.notification = notification;
	 		headerService.discussion = discussion;
	 		headerService.checklist = checklist;
	 		headerService.familyprofile = familyprofile;
	 		headerService.change_firsttime_status = change_firsttime_status;
	 		headerService.getprofileimage = getprofileimage;
	 		
	 		return headerService;
	 		
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
	 		
	 		function homepage() {
	 			window.location = "/FamilyApp_WebUI/views/homepage.html";
	 		};
	 		
	 		function userprofile() {
	 			window.location = "/FamilyApp_WebUI/views/edit_profile.html";
	 		};
	 		
	 		function logout() {
	 			/*var backlen = history.length;
	 		    history.go(-backlen);*/
	 			window.location = "/FamilyApp_WebUI/views/login.html";
	 		};
	 		
	 		function chatting() {
	 			window.location = "/FamilyApp_WebUI/views/chatting.html";
	 		};
	 		
	 		function calendar() {
	 			window.location = "/FamilyApp_WebUI/views/calendar.html";
	 		};
	 		
	 		function notification() {
	 			window.location = "/FamilyApp_WebUI/views/notification.html";
	 		};
	 		
	 		function discussion() {
	 			window.location = "/FamilyApp_WebUI/views/create_topic.html";
	 		};
	 		
	 		function checklist() {
	 			window.location = "/FamilyApp_WebUI/views/checklist.html";
	 		};
	 		
	 		function familyprofile(family_code, pending_family_code, token) {
	 		//	alert(family_code);
	 			if(family_code != false){			//HAS FAMILY
	 				
	 				return $q(function(resolve, reject){
		 				url = WEBAPI.FAMILY_PROFILE_DETAILS + "?familyCode=" + family_code;
		 			
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
		 					/*window.location = "/FamilyApp_WebUI/views/familyprofile.html";*/
		 				},function error(data, status, headers, config){
		 					reject(data);
		 				});
		 			});
	 				
	 				
	 				
	 			}
	 			else {								//HAS NO FAMILY
	 				//CHECK PENDING FAMILY AND REDIRECT
	 				if(pending_family_code == false) {
	 					window.location = "/FamilyApp_WebUI/views/join_family.html";
	 				}
	 				else{
	 					window.location = "/FamilyApp_WebUI/views/waiting_family.html";
	 				}
	 			}
	 		};
	 		
	 		function change_firsttime_status(token){
	 			return $q(function(resolve, reject){
	 				alert('change status function');
	 				url = WEBAPI.SKIP_FAMILY_JOIN;
	 			
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Authorization': token
	 					},
	 					data: {}
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 	}]);
})();