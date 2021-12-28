(function(){
	angular.module('familyApp')
		.controller('joinFamilyController', function($scope, $http,joinFamilyService, ERRORMESSAGES, DATAPASS,VARIABLES){
			
			var token = DATAPASS.get(VARIABLES.TOKEN);
			
			/*var isDefaultorNot = DATAPASS.get(VARIABLES.PROFILE_IMAGE);*/
			/*alert("is default "+ isDefaultorNot);*/
			/*var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
			if(isDefaultorNot == "")
				{
					
					if(isMaleorFemale == "M")
						{
							var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/auth/1528423364173.png"
						}
					else
						{
							var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/auth/1528423537739.png"
						}
				}
			else{
				var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/auth"+ isDefaultorNot;
			}*/
			/*var userprofile_image = "https://famapp.qarah5.com:8443/FamilyApp_WebApp/auth"+token+ isDefaultorNot;*/
			/*$scope.profile_image = userprofile_image;
			alert($scope.profile_image );*/
			/*console.log("b4 getting image")*/
			
			
			
			/*var getImage = joinFamilyService.getImage(isDefaultorNot,token);
				console.log("image 123: "+getImage+ isEmpty(getImage))
				
				//$scope.getImage = getImage;
				
				var getImage = joinFamilyService.getImage(isDefaultorNot,token);
				getImage.then(function(response) {
					alert("Correct");
	            	alert("data from controller"+response);
	            	
	            	$scope.getImage = response;
	            }, function(error) {
	            	alert("error");
	            });*/
				
			/*var getProfileImage = joinFamilyService.getProfileImage(isDefaultorNot,token);
				getProfileImage.then(function(response) {
					alert("Correct");
	            	alert("hi"+response.data.url);
	            	
	            	$scope.profileImage = url;
	            }, function(error) {
	            	alert("error");
            });*/
			
				 //retrieve image
				/*var profileimage = DATAPASS.get(VARIABLES.PROFILE_IMAGE);
				var isMaleorFemale = DATAPASS.get(VARIABLES.USER_GENDER);
				if(profileimage == "")
					{
						
						if(isMaleorFemale == "M")
							{
								var getprofileimage = joinFamilyService.getprofileimage("/auth/1528875895475.png",token);
							}
						else
							{
								var getprofileimage =  joinFamilyService.getprofileimage("/auth/1528853855475.png",token);
							}
					}
				else{
					var getprofileimage = joinFamilyService.getprofileimage(profileimage,token);
				}
				
				
				var getprofileimage = joinFamilyService.getprofileimage(profileimage,token);
				
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
				  }*/
				
			
			$scope.Family_Code = function(fid) {
	            var getFamilyName = joinFamilyService.getFamilyName(fid,token);

	            getFamilyName.then(function(response) {
	            	$scope.invalid_FamilyCode="";
	    			$scope.fname= response.data.familyName;
	    			
	    			DATAPASS.set('familyCode', response.data.familyName);
	            }, function(error) {
	            	$scope.fname= "";
	    			/*$("#checkfamilyID").text("Invalid FamilyID");*/
	            	$scope.invalid_FamilyCode= ERRORMESSAGES.INVAILD_FAMILYCODE;
	            });
	        };
	        
	        /*function isEmpty(obj) {
	            for(var prop in obj) {
	                if(obj.hasOwnProperty(prop))
	                	console.log(" prop "+prop)
	                    return true;
	            }

	            return JSON.stringify(obj) === JSON.stringify({});
	        }*/
	        $scope.joinbtn = function(){		
	    		var familyid = {
	  				  "familyCode": $scope.fid
	        	};
	    		
	    		var joinFamily =joinFamilyService.joinFamily(familyid,token);
	    		
	    		joinFamily.then(function(response) {
	    			//ps testing for waiting family
	    			$scope.id = response.id;
	    			alert($scope.id);
	            	var getFamilyImage = joinFamilyService.getFamilyImage($scope.fid,token);
	            	 getFamilyImage.then(function(response) { 
	 	            	
	 	    			$scope.imageUrl= response.data.imageUrl;
	 	    			
	 	    			DATAPASS.set(VARIABLES.FAMILY_IMAGE, response.data.imageUrl);
	 	    			
	 	            }, function(error) {
	 	            	
	 	            });
	    			
	    			window.location = "/FamilyApp_WebUI/views/waiting_family.html";

	            }, function(error) {
	               /* alert("error");*/
	            });
	    	};
	        
	    	$scope.createfamilyPage = function() {
	    		window.location = "/FamilyApp_WebUI/views/create_family.html";
	    	};
		});	
	})();