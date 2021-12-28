(function(){
	'Use Strict'
	angular.module('familyApp')
		.factory('signupService',['$http', 'WEBAPI','$q',function($http, WEBAPI, $q){
			var signupServive = {};
			signupServive.signupProfile = signupProfile;
			signupServive.checkEmail = checkEmail;
			
			return signupServive;
			
			function signupProfile(user) {
                return $q(function(resolve, reject) {
                    /*var params = {};
                    params['data'] = JSON.stringify(user);*/
                	var params = JSON.stringify(user);
                    url = WEBAPI.SIGNUP; //+ "?data=" + JSON.stringify(user_obj);
                        //console.log(user_obj);
                    return $http({
                        method: 'POST',
                        url: url,
                        headers: { 'Content-Type': 'application/json' },
                        data: params
                      /*transformRequest: function(data) {
                           return "data="+encodeURIComponent(data.data);
                      }*/

                    }).then(function success(response) {
                        console.log(response.data);
                        resolve(response);

                    }, function error(error) {
                        reject(error);
                        
                    });
                });
            }
			
			function checkEmail(email) {
				console.log("this is from service "+email)
                var params = {};
                params['email'] = email;
                return $q(function(resolve, reject) {
                    $http({
                        method: 'GET',
                        url: WEBAPI.CHECK_EMAIL_VALIDITY,
                        params: params
                    }).then(function success(response) {
                        //console.log(email);
                        resolve(response);
                    },function(data, status, headers, config) {
                        console.log("Error...");
                        reject(data);
                    });

                });
            }
			
			}
		]);
})();