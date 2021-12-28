(function(){
	angular.module('familyApp')
		.controller('waitingFamilyController', function($scope, $http,waitingFamilyService, ERRORMESSAGES, DATAPASS,VARIABLES){
			
			var fname = DATAPASS.get(VARIABLES.FAMILY_CODE);
			var token = DATAPASS.get(VARIABLES.TOKEN);
			$scope.family_name = fname;
			
			//For FamilyImage
			var isDefaultFamilyImageorNot = DATAPASS.get(VARIABLES.FAMILY_IMAGE);
			if(isDefaultFamilyImageorNot == "")
			{
				var familyImage = waitingFamilyService.getprofileimage("/auth/1528796883965.jpeg",token);
			}
			else
			{
				var familyImage = waitingFamilyService.getprofileimage(isDefaultFamilyImageorNot,token);
			}
			familyImage.then(function(response){
				
				$scope.familyImageUrl =  _arrayBufferToBase64(response.data);
				
			}, function(error) {
            	alert("error");
            });
	        
			
			//For UserProfileImage
			var profileimage = DATAPASS.get(VARIABLES.PROFILE_IMAGE);
			var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
			if(profileimage == "")
				{
					
					if(isMaleorFemale == "M")
						{
							var getprofileimage = waitingFamilyService.getprofileimage("/auth/1528875895475.png",token);
						}
					else
						{
							var getprofileimage =  waitingFamilyService.getprofileimage("/auth/1528853855475.png",token);
						}
				}
			else{
				var getprofileimage = waitingFamilyService.getprofileimage(profileimage,token);
			}
			
			
			/*var getprofileimage = joinFamilyService.getprofileimage(profileimage,token);*/
			
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
			
			
			//for cancel join Request
			
			$scope.canceljoinrequest = function(){		
	    		var familyid = {
	  				  "familyCode": $scope.fid
	        	};
	    		
	    		var joinFamily =joinFamilyService.joinFamily(familyid,token);
	    		
	    		joinFamily.then(function(response) {
	    			//ps testing for waiting family
	            	var getFamilyImage = joinFamilyService.getFamilyImage($scope.fid,token);
	            	 getFamilyImage.then(function(response) { 
	 	            	
	 	    			$scope.imageUrl= response.data.imageUrl;
	 	    			
	 	    			DATAPASS.set(VARIABLES.FAMILY_IMAGE, response.data.imageUrl);
	 	    			
	 	            }, function(error) {
	 	            	
	 	            });
	    			
	    			window.location = "/FamilyApp_WebUI/views/join_family.html";

	            }, function(error) {
	               /* alert("error");*/
	            });
	    	};
			
	        
		})
})();