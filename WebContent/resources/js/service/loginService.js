(function(){
	'Use Strict'
	 angular.module('familyApp')
	 	.factory('loginService', ['$http', 'WEBAPI', '$q', function($http, WEBAPI, $q){
	 		var loginService = {};
	 		loginService.userlogin = userlogin;
	 		loginService.fblogin = fblogin;
	 		loginService.googlelogin = googlelogin;
	 		
	 		return loginService;
	 		
	 		function userlogin(emailpassword){
	 	//		console.log("data.: "+emailpassword);
	 			return $q(function(resolve, reject){
	 				var params = {};
                 
                    console.log("data : "+JSON.stringify(emailpassword));
	 				url = WEBAPI.USER_LOGIN;
	 			
	 				console.log("url: "+url);
	 				
	 				return $http({
	 					method: 'POST',
	 					url: url,
	 					headers: {
	 						'Content-Type': 'application/JSON'
	 					},
	 					data: JSON.stringify(emailpassword)
	 				}).then(function success(response){	 
	 				//	alert(JSON.stringify(response));
	 					resolve(response);
	 				},function error(data, status, headers, config){
	 					reject(data);
	 				});
	 			});
	 		};
	 		
	 		
	 		function fblogin(){
	 			window.location = WEBAPI.FB_LOGIN;
	 		};
	 		
	 		function googlelogin(){
	 			window.location = WEBAPI.GOOGLE_LOGIN;
	 		}
	 		
	 
	 	}]);
})();