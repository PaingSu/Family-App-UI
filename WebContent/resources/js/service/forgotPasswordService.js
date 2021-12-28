(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('forgotPasswordService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		var forgotPasswordService = {};
	 		forgotPasswordService.forgotpassword = forgotpassword;
	 		forgotPasswordService.redirect = redirect;
	 		forgotPasswordService.gotoResetPassword = gotoResetPassword;
	 		forgotPasswordService.resetPassword = resetPassword;
	 		forgotPasswordService.cancelResetPassword = cancelResetPassword;
	 		
	 		return forgotPasswordService;
	 		
	 		function forgotpassword(email){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.FORGET_PASSWORD;
	 				 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON'
	 					},
	 					data: email
	 				}).then(function success(response){	 
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function redirect(){
	 			window.location = "/FamilyApp_WebUI/views/login.html";
	 		};
	 		
	 		function gotoResetPassword(){
	 			window.location = "/FamilyApp_WebUI/views/reset_password.html";
	 		};
	 		
	 		function resetPassword(obj){
	 			return $q(function(resolve, reject){
	 				url = WEBAPI.RESET_PASSWORD;
	 			 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON'
	 					},
	 					data: obj
	 				}).then(function success(response){	 
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		function cancelResetPassword(){
	 			window.location = "/FamilyApp_WebUI/views/forget_passwrod.html";
	 		};
	 		
	 	}]);
})();