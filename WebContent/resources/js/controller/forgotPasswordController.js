(function(){
	
	angular.module('familyApp')
		.controller('forgotpasswordController', function($scope, forgotPasswordService, DATAPASS, ERRORMESSAGES, VARIABLES){
			$scope.emailsent = function() {
				
				if($scope.forgotpassword.$valid){
					var email = {
							"email": $scope.email
					};
					
					var forgotPassword = forgotPasswordService.forgotpassword(email);
					forgotPassword.then(function(response){
						alert(response.data.message);
						var gotoreset = forgotPasswordService.gotoResetPassword();
					},function(error){
						//alert(error.data.message);
						$scope.message = error.data.message;
					});
				}
				else {
					$scope.submitted = true;
				}				
			};	
			
			$scope.message = ERRORMESSAGES.REQUIRED_EMAIL;
			$scope.invalid_email = ERRORMESSAGES.INVAILD_EMAIL;
			
			$scope.emailcancel = function(){
				var cancelforgotpassword = forgotPasswordService.redirect();
			};
			
			
		})
		.controller('resetpasswordController', function($scope, forgotPasswordService, DATAPASS, ERRORMESSAGES, VARIABLES){
			$scope.reset = function() {
				if($scope.resetpassword.$valid){
					var codeandpassword = {
							"otp": $scope.code,
							"newPassword":$scope.newpassword
							};
					
					var resetPassword = forgotPasswordService.resetPassword(codeandpassword);
					resetPassword.then(function(response){
						alert(response.data.message);
						var redirect = forgotPasswordService.redirect();
					},function(error){
					//	alert(error.data.message);
						$scope.error_message = error.data.message;
					});
				}
				else {
					$scope.submitted = true;
				}
				
			};
			
			$scope.resetcancel = function() {
				var cancelresetpassword = forgotPasswordService.cancelResetPassword();
			};
			
			$scope.code_required = ERRORMESSAGES.REQUIRED_OTP;
			$scope.password = ERRORMESSAGES.REQUIRED_PASSWORD;
			$scope.min_character = ERRORMESSAGES.MIN_CHARACTER;
			$scope.confirm_password = ERRORMESSAGES.CONFIRM_PASSWORD;
			$scope.password_does_not_match = ERRORMESSAGES.PASSWORD_NOT_MATCH;
			
		});
	
})();