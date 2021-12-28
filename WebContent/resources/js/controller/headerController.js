(function(){
	angular.module('familyApp')
		.controller('headerController', function($scope, headerService, DATAPASS, VARIABLES){
			
			var token = DATAPASS.get(VARIABLES.TOKEN);
		//	alert('header token ' + token);
			var family_code = DATAPASS.get(VARIABLES.FAMILY_CODE);
			var pending_family_code = DATAPASS.get(VARIABLES.PENDING_FAMILY_CODE);
			var islogin = DATAPASS.get(VARIABLES.ISLOGIN);
	//		alert('header '+ family_code);
			
			
			
			 //retrieve image
			var profileimage = DATAPASS.get(VARIABLES.PROFILE_IMAGE);
			var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
			if(profileimage == "")
				{
					
					if(isMaleorFemale == "M")
						{
							var getprofileimage = headerService.getprofileimage("/auth/1528875895475.png",token);
						}
					else
						{
							var getprofileimage =  headerService.getprofileimage("/auth/1528853855475.png",token);
						}
				}
			else{
				var getprofileimage = headerService.getprofileimage(profileimage,token);
			}			
			getprofileimage.then(function(response){
				
				$scope.profileImageUrl =  _arrayBufferToBase64(response.data);
				
			}, function(error) {
            	alert("error");
            });
	        
			function _arrayBufferToBase64(buffer) {
			    var binary = '';
			    var bytes = new Uint8Array(buffer);
			    var len = bytes.byteLength;
			    for (var i = 0; i < len; i++) {
			      binary += String.fromCharCode(bytes[i]);
			    }
			    return window.btoa(binary);
			  }
			
			
			
			
			$scope.home = function() {
				var home = headerService.homepage();
			};
			
			$scope.profile = function() {
				var profile = headerService.userprofile();
			};
			
			$scope.logout = function() {
			//	alert("is login " + islogin);
				if(islogin == 'false'){
			//		alert('is not login');
					var change_status = headerService.change_firsttime_status(token);
					change_status.then(function(response){
						console.log(response.data.message);
					},function(error){
						alert(JSON.stringify(error));
					});
				}
				
				DATAPASS.clear();
				
		//		alert("CLEARED DATAPASS " + DATAPASS.get(VARIABLES.TOKEN));
				var logout = headerService.logout();
			};
			
			$scope.chat = function() {
				var chat = headerService.chatting();
			};
			
			$scope.calendar = function() {
				var calendar = headerService.calendar();
			};
			
			$scope.notification = function() {
				var notification = headerService.notification();
			};
			
			$scope.discussion = function() {
				var discussion = headerService.discussion();
			};
			
			$scope.checklistpage = function() {
				var checklistpage = headerService.checklist();
			};
			
			$scope.familyProfile = function() {
				var familyprofile = headerService.familyprofile(family_code, pending_family_code, token);
				familyprofile.then(function(response){
					
					DATAPASS.set(VARIABLES.CREATOR_ID, response.data.familyCreatorId);
					window.location = "/FamilyApp_WebUI/views/familyprofile.html";
				},function(error){
					alert("header controller " + error.data.message);
				});
			};
		});
})();