(function(){
	angular.module('familyApp')
		.controller('userProfileController', function($scope,user_profileService, ERRORMESSAGES, DATAPASS,VARIABLES){
			
			var token = DATAPASS.get(VARIABLES.TOKEN);
			
			/*var isDefaultorNot = DATAPASS.get(VARIABLES.PROFILE_IMAGE);
			var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
			if(isDefaultorNot == "")
				{
					alert("hello");
					if(isMaleorFemale == "M")
						{
							var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/1528423364173.png"
						}
					else
						{
							var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/1528423537739.png"
						}
				}
			else{
				var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp"+ isDefaultorNot;
			}*/
			
			/*$scope.profile_image = userprofile_image;*/
			
			
			
			//profile
			
			
			var username = DATAPASS.get(VARIABLES.USER_NAME);
			var email = DATAPASS.get(VARIABLES.EMAIL);
			var gender = DATAPASS.get(VARIABLES.USER_GENDER);
			
			var birthday = DATAPASS.get(VARIABLES.USER_BIRTHDAY);
			var phone = DATAPASS.get(VARIABLES.USER_PHONE_NO);
			
			$scope.user_name = username;
			
			$scope.user_email = email;
			
			if(gender == "M")
			{
				$scope.answers={gender:"M"};
			}
			else
			{
				$scope.answers={gender:"F"};
			}
			
			$scope.user_birthday = birthday;
			
			$scope.user_phone = phone;
			
			//to get coverimage
			var getuser_profile = user_profileService.getuser_profile(token);
			
			getuser_profile.then(function(response){
				$scope.coverimageUrl= response.data.cover_image_url;
	    	
	    		var getcoverimage = user_profileService.getprofileimage($scope.coverimageUrl,token);
				
	    		getcoverimage.then(function(response){
					
					$scope.coverImageUrl =  _arrayBufferToBase64(response.data);
					
				}, function(error) {
	            	alert("error");
	            });
			}, function(error) {
				alert("error");
            });
			
			
			 
			
	        //save for edit
	        $scope.savebtn = function(){		
	    		alert("save");
	    		
	        	//date
	    		$scope.selected_date=new Date($('#datepicker').val());
	    		$scope.day = $scope.selected_date.getDate();
	    		$scope.month = $scope.selected_date.getMonth() + 1;
	    		$scope.year = $scope.selected_date.getFullYear();
	    		$scope.date = [$scope.day, $scope.month, $scope.year].join('/');
	    		
	    		
	    		//image
	    		$scope.image =$('#base64image').val();
	    		
	    		
	    		$scope.coverimage =$('#base64coverimage').val();
	    		
	    		var edit_user = {
	    			
	    				'username' : $scope.uname,
	    				
	    				'profile_image_url' : $scope.image,
	    				
	    				'gender': $scope.answers.gender,
	    				'birthday':$scope.date,
	    				
	    				'phone_no': $scope.phonenum,
	    				'cover_image_url':$scope.coverimage,
	    		};	
	    		
	    		var edituser =user_profileService.editprofile(edit_user,token);
	    		
	    		edituser.then(function(response) {
	    			alert("success");

		            }, function(error) {
		                alert("error");
		            });
	        };
	        
	        
	        
	        $scope.passwordEditbtn = function(){		
	        	if( $scope.newpassword == $scope.confirmpassword){
	    		var changepassword = {
	    			
	    				'oldPassword':$scope.oldpassword,
	    				'newPassword':$scope.newpassword,
	    		};	
	        	}
	    		
	    		var change_psw =user_profileService.changepassword(changepassword,token);
	    		
	    		change_psw.then(function(response) {
	    			$('#dialog').dialog('close');
	    			 $scope.invalid_password="";

		            }, function(error) {
		            	 $scope.invalid_password = ERRORMESSAGES.INVALID_PASSWORD;
		            	
		            });
	        };
	        
	        
	      //testing image
			var profileimage = DATAPASS.get(VARIABLES.PROFILE_IMAGE);
			var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
			if(profileimage == "")
				{
					
					if(isMaleorFemale == "M")
						{
							var getprofileimage = user_profileService.getprofileimage("/auth/1528875895475.png",token);
						}
					else
						{
							var getprofileimage =  user_profileService.getprofileimage("/auth/1528853855475.png",token);
						}
				}
			else{
				var getprofileimage = user_profileService.getprofileimage(profileimage,token);
			}
			
			/*var getprofileimage = user_profileService.getprofileimage(profileimage,token);*/
			
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
	        
		})
})();