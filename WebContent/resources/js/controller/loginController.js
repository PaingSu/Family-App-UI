(function(){
	
	angular.module('familyApp')
		.controller('loginController', function($scope, loginService, DATAPASS, ERRORMESSAGES, VARIABLES){
			/*$scope.reolad = function() {
				$state.reload();
			};*/
			$scope.login = function() {
		
				$scope.message = '';
				if($scope.loginForm.$valid){
					var emailPassword = {
							'email': $scope.email,
							'codeword' : $scope.password
					};
					
					//CLICK LOGIN BUTTON
					var userlogin = loginService.userlogin(emailPassword);
					userlogin.then(function(response) {
					
						//PASS DATA
						DATAPASS.set(VARIABLES.TOKEN, response.data.token);
						DATAPASS.set(VARIABLES.ISLOGIN, response.data.user.is_login);
						DATAPASS.set(VARIABLES.EMAIL, response.data.user.email);
						DATAPASS.set(VARIABLES.USER_NAME, response.data.user.username);
						DATAPASS.set(VARIABLES.USER_GENDER, response.data.user.gender);
						DATAPASS.set(VARIABLES.USER_PHONE_NO, response.data.user.phone_no);
						DATAPASS.set(VARIABLES.USER_BIRTHDAY, response.data.user.birthday);
						DATAPASS.set(VARIABLES.PROFILE_IMAGE, response.data.user.profile_image_url);
						DATAPASS.set(VARIABLES.COVER_IMAGE, response.data.user.cover_image_url);
						DATAPASS.set(VARIABLES.USER_ID, response.data.user.id);
						
						//CHECK IF 'HAS FAMILY' & PASS FAMILY CODE
						var pendingList =  response.data.user.familyPendingList.length;
						var familyList = response.data.user.familyList.length;
				//		alert("pending list " + pendingList + "\nfamilylist " + familyList);
						if(pendingList.length==1 && familyList.length==1){	//PENDING FAMILY
							alert("pending family");
						//	DATAPASS.set(VARIABLES.IS_PENDING, true);
							DATAPASS.set(VARIABLES.PENDING_FAMILY_CODE, response.data.user.familyPendingList[0].familyCode);
						}
						else if(pendingList<1 && familyList==1){		//HAS FAMILY>
							
							DATAPASS.set(VARIABLES.FAMILY_CODE, response.data.user.familyList[0].familyCode);
							DATAPASS.set(VARIABLES.FAMILY_NAME, response.data.user.familyList[0].familyName);
						}
						
						else {			//NO PENDING FAMILY AND NO FAMILY
						//	DATAPASS.set(VARIABLES.IS_PENDING, false);
						
							DATAPASS.set(VARIABLES.PENDING_FAMILY_CODE, ''); 	//NO PENDING FAMILY >>>> PEENDING_FAMILY_CODE = FALSE
							DATAPASS.set(VARIABLES.FAMILY_CODE, '');  //NO FAMILY >>>> FAMILY_CODE = FALSE
						}
						
						alert("login page islogin " + response.data.user.is_login);				
						//REDIRECT PAGE												
						if(response.data.user.is_login == true){
							window.location = "/FamilyApp_WebUI/views/homepage.html";
						}
						else {
							window.location = "/FamilyApp_WebUI/views/join_family.html"
						}
						
						
					},function(error){
				//		alert(JSON.stringify(error.data.message));
						$scope.message = error.data.message;
					});
				
				}
				else {
					$scope.submitted = true;
				}
				
				//ERROR MESSAGES
				$scope.required_email = ERRORMESSAGES.REQUIRED_EMAIL;
				$scope.enter_password = ERRORMESSAGES.REQUIRED_PASSWORD;		
			};
			
			$scope.facebookLogin = function() {
				
				loginService.fblogin();
				
			};
			
			
			$scope.googleLogin = function() {
						
				loginService.googlelogin();
			};
		});
	
})();