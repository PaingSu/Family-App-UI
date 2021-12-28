(function(){
	
	angular.module('familyApp')
		.controller('createFamilyController', function($scope, $document, createfamilyService, DATAPASS, ERRORMESSAGES, VARIABLES){
			var token = DATAPASS.get(VARIABLES.TOKEN);
			var useremail = DATAPASS.get(VARIABLES.EMAIL);
			//	alert('create family '+ DATAPASS.get('token'));
			
			
			
			
			
			
			$scope.add = function(){
				if($scope.invitemember.$valid){
					 var count = 0;
					 var data= $('#txt_invitemember').val();
					  $('<div class="memberInfo"><div class="memberInfoCenter"><div class="emailaddress" style="float: left"><input type="email" id="first'+count+'"/></div><div class="Cancel" style="float: left;"><button type="button" class="cancelmember"></button></div></div></div>').appendTo('.memberAddPanel');   
					  $('#first'+count+'').val(data); 
				      count++;
				      $('#txt_invitemember').val("");

				      $(".cancelmember").click(function(){
						  $(this).closest(".memberInfo").remove();
					  });
				}
				else{
					$scope.submit = true;
				}
			};
			$scope.invalid_email = ERRORMESSAGES.FAILED_RESETED_PASSWORD;
			$scope.require_email = ERRORMESSAGES.FIELD_REQUIRED;
			
			
			$scope.required_familyname = ERRORMESSAGES.FAMILY_NAME;
			$scope.required_startdate = ERRORMESSAGES.FAMILY_STARTDATE;
			$scope.required_description = ERRORMESSAGES.FAMILY_DESCRIPTION;
			
			$scope.createFamily = function() {
				
				if($scope.createForm.$valid){
					$scope.profileimage =$('#base64image').val();
					
					var inputs = $document[0].querySelectorAll('#memberAddPanel input');
					var memberArr = [];
			//		var obj;
					memberArr.push({'member':useremail});
					inputs.forEach(function(input) {     
						memberArr.push({'member':input.value});
				      });
				//	alert(JSON.stringify(memberArr));
					
					$scope.selected_date=new Date($('#datepicker').val());
					$scope.day = $scope.selected_date.getDate();
					$scope.month = $scope.selected_date.getMonth() + 1;
					$scope.year = $scope.selected_date.getFullYear();
					$scope.date = [$scope.day, $scope.month, $scope.year].join('/');
					
				//	alert($scope.date);
				//	alert(token);
					var familyprofile = {
							'familyName' : $scope.familyName,
							'description' : $scope.description,
							'members' : memberArr,
							'familyStartDate': $scope.date,
							'imageUrl': $scope.profileimage
					};
					
					var createfamily = createfamilyService.createFamily(familyprofile, token);
					
					createfamily.then(function(response){
						alert('Create Family Success!');
						console.log(JSON.stringify(response));
						DATAPASS.set(VARIABLES.FAMILY_CODE, response.data.familyCode);
						DATAPASS.remove(VARIABLES.ISLOGIN);
						DATAPASS.set(VARIABLES.ISLOGIN, response.data.members[0].is_login);
						DATAPASS.set(VARIABLES.FAMILY_NAME, response.data.familyName);
						window.location = '/FamilyApp_WebUI/views/homepage.html';
						
						DATAPASS.set(VARIABLES.IS_FAMILY_CREATOR, true);
						
					},function(error){
						alert(JSON.stringify(error.data.message));
					});
				}
				else {
					$scope.submitted = true;
				}
				

			};
			
			$scope.cancelcreateFamily = function(){
				var cancelcreatefamily =  createfamilyService.cancelCreateFamily();
			};
			
		
					
		});
	
})();