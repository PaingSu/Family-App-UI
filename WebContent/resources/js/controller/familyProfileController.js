(function(){
	
	angular.module('familyApp')
		.controller('familyProfileController', function($window, $scope, $document, familyProfileService, DATAPASS, ERRORMESSAGES, VARIABLES){
				
			var familyCode = DATAPASS.get(VARIABLES.FAMILY_CODE);
			var token = DATAPASS.get(VARIABLES.TOKEN);
			
			
			/*var familymembertab = angular.element(document.querySelector('#familymembertabmenu'));
			var leavefamilytab = angular.element(document.querySelector('#leavetabmenu'));*/
			var requestedlisttab = angular.element(document.querySelector('#requesttabmenu'));		
			
			var cancelbutton = angular.element(document.querySelector('#cancelBtn'));
			var savebutton = angular.element(document.querySelector('#saveBtn'));
			var familyname = angular.element(document.querySelector('#familyname'));
			var description = angular.element(document.querySelector('#description'));
			var startdate = angular.element(document.querySelector('#datepicker'));		
			var uploadimagebtn = angular.element(document.querySelector('#uploadimage'));
			var leavefamilyinfo = angular.element(document.querySelector('#leavefamilyInfo'));
			var familyprofileinfo = angular.element(document.querySelector('#familyprofileInfo'));
			var requestfamilyinfo = angular.element(document.querySelector('#requestfamilyInfo'));
			var familymemberinfo = angular.element(document.querySelector('#familymemberInfo'));
			
			if (DATAPASS.get(VARIABLES.USER_ID) != DATAPASS.get(VARIABLES.CREATOR_ID)){
				/*familymembertab.attr('hidden', true);
				leavefamilytab.attr('hidden', true);*/
				requestedlisttab.attr('hidden', true);
				uploadimagebtn.attr('hidden', true);
				cancelbutton.attr('hidden', true);
				savebutton.attr('hidden', true);
				familyname.attr('readonly', true);
				description.attr('readonly', true);
				startdate.attr('readonly', true);
			}
			else {
				/*familymembertab.remobeAttr('hidden');
				leavefamilytab.removeAttr('hidden');*/
				requestedlisttab.removeAttr('hidden');
				uploadimagebtn.removeAttr('hidden');
				cancelbutton.removeAttr('hidden');
				savebutton.removeAttr('hidden');
				familyname.removeAttr('readonly');
				description.removeAttr('readonly');
				startdate.removeAttr('readonly');
			//	alert("is family creator");
				
			}
			
						
			$scope.famprofile = function(){
				familymemberinfo.attr('hidden', true);
				leavefamilyinfo.attr('hidden', true);
				requestfamilyinfo.attr('hidden', true);
				familyprofileinfo.removeAttr('hidden');
			};
			
			$scope.familymember = function(){
				leavefamilyinfo.attr('hidden', true);
				requestfamilyinfo.attr('hidden', true);
				familyprofileinfo.attr('hidden', true);
				familymemberinfo.removeAttr('hidden');
			};
			
			$scope.leavefamily = function(){
				requestfamilyinfo.attr('hidden', true);
				familyprofileinfo.attr('hidden', true);
				familymemberinfo.attr('hidden', true);
				leavefamilyinfo.removeAttr('hidden');
			};
			
			
			
			var familyDetails = familyProfileService.familyDetails(familyCode, token);
			familyDetails.then(function(response){
				/*DATAPASS.set(VARIABLES.CREATOR_ID, response.data.familyCreatorId);
				alert("creator " + response.data.familyCreatorId);*/
				
				$scope.createfamilyId = response.data.familyCode;
				$scope.createfamilyName = response.data.familyName;
				$scope.description = response.data.description;
				$scope.showDate = response.data.familyStartDate;
				
				var ttt = response.data.imageUrl;
				var profile_image = familyProfileService.getprofileimage(ttt, token);
				profile_image.then(function(res){
					
					$scope.familyprofilephoto = _arrayBufferToBase64(res.data);
				},function(err){
					alert("image error " + err.data.message);
				});
				
				var temp = response.data.members.length;
				var i;
				var memberArr = [];
				
				
				for(j=0; j<temp; j++){
					
					var obj = {
							"username": response.data.members[j].username,
							"photo": getImage(response.data.members[j].profile_image_url, j)
					}
					memberArr.push(obj);
				}
				$scope.members = memberArr;
				
				
				DATAPASS.set(VARIABLES.FAMILY_ID, response.data.id);
				
			//	console.log(JSON.stringify(response.data.members));
			},function(error){
				alert(error.data.message);
			});	
			
			
			function getImage(image){
				let tempimage;
				let getprofile_image = familyProfileService.getprofileimage(image, token);
				getprofile_image.then(function(response){
					
					tempimage = _arrayBufferToBase64(response.data);						
						
					}, function(error) {
		            
		            });
				
				return tempimage;
			};
			
			function _arrayBufferToBase64(buffer) {
			    var binary = '';
			    var bytes = new Uint8Array(buffer);
			    var len = bytes.byteLength;
			    for (var i = 0; i < len; i++) {
			      binary += String.fromCharCode(bytes[i]);
			    }
			    return window.btoa(binary);
			};
			
			$scope.save = function(){
				if($scope.familyprofile.$valid){
					alert("enter if ");
					$scope.profileimage = $('#base64image').val();
					
					$scope.selected_date=new Date($('#datepicker').val());
					$scope.day = $scope.selected_date.getDate();
					$scope.month = $scope.selected_date.getMonth() + 1;
					$scope.year = $scope.selected_date.getFullYear();
					$scope.date = [$scope.day, $scope.month, $scope.year].join('/');
					
					alert("date is " + $scope.selected_date + "\n" + $scope.date);
					var familyprofile = {
						"id": DATAPASS.get(VARIABLES.FAMILY_ID),
						"familyCode": DATAPASS.get(VARIABLES.FAMILY_CODE),
						"familyName": $scope.createfamilyName,
						"description": $scope.description,
						"familyStartDate": $scope.date,						
						"imageUrl": $scope.profileimage
					};
					
					var editFamilyProfile = familyProfileService.editFamilyProfile(familyprofile, token);
					editFamilyProfile.then(function(response){
						$window.location.reload();
					},function(error){
						alert(error.data.message);
					});
				}
				else {
					$scope.submit = true;
				}
				$scope.required_familyname = ERRORMESSAGES.FAMILY_NAME;
				$scope.required_startdate = ERRORMESSAGES.FAMILY_STARTDATE;
				$scope.required_description = ERRORMESSAGES.FAMILY_DESCRIPTION;
			};
			
			$scope.cancel = function(){
				var cancelEdit = familyProfileService.cancelEditFamilyProfile();
			};
					
			
			////
			////
			////add member
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
					$scope.submitted = true;
				}
			};
			$scope.invalid_email = ERRORMESSAGES.INVAILD_EMAIL;
			$scope.require_email = ERRORMESSAGES.FIELD_REQUIRED;
			

			$scope.required_familyname = ERRORMESSAGES.FAMILY_NAME;
			$scope.required_startdate = ERRORMESSAGES.FAMILY_STARTDATE;
			$scope.required_description = ERRORMESSAGES.FAMILY_DESCRIPTION;
			
			$scope.savemember = function(){
				var inputs = $document[0].querySelectorAll('#memberAddPanel input');
				var memberArr = [];
				var obj;
				inputs.forEach(function(input) {     
					memberArr.push(input.value);
			      });
				obj = memberArr.join();
				alert(obj);
				
				var members = {
						familyCode: familyCode,
						emails: obj
				};
				
				var saveMember = familyProfileService.saveMember(token, members);
				saveMember.then(function(response){
				//	alert(response.data.message);
					$window.location.reload();
				},function(error){
					alert(error.data.message);
				});
			};
			
			$scope.canceladdmember = function(){
				var cancelAddMember = familyProfileService.cancelAddMember();
			};
			
			////
			////
			////leave family
			var familyname = DATAPASS.get(VARIABLES.FAMILY_NAME);
			$scope.family_name = familyname;
			var leavefamilyobj = {
					familyCode: familyCode
			};
			
			$scope.leaveFamily = function(){
				var leave = familyProfileService.leaveFamily(token, leavefamilyobj);
				leave.then(function(response){
					alert(response.data.message);
				},function(error){
					alert(error.data.message);
				});
			};
			
			$scope.cancelLeave = function(){
				var cancelleavefamily = familyProfileService.cancelLeaveFamily();
			};
			
			
			/////
			////
			////requested member
			$scope.familyrequest = function(){
				familyprofileinfo.attr('hidden', true);
				familymemberinfo.attr('hidden', true);
				leavefamilyinfo.attr('hidden', true);
				requestfamilyinfo.removeAttr('hidden');
				
				var requestedMembers = familyProfileService.requestedMembers(familyCode, token);
				requestedMembers.then(function(response){
					if(response.data.length > 0){
						
						var temp;
						if(response.data.length > 5){
							temp = 5;
						}
						else{
							temp = response.data.length;
						}
						var temparr = [];
						var i;
						for(i=0; i<temp; i++){
							
							alert(response.data[i].requestDate);
							var obj = {
								"username": response.data[i].user.username.toUpperCase(),
								"requestDate": calculateTime(response.data[i].requestDate),
								"profile_image_url": response.data[i].user.profile_image_url,
								"acceptid": response.data[i].id,
								"cancelid": response.data[i].id
							};
							temparr.push(obj);
						}
						$scope.requestedmembers = temparr;
					}
					else{
						$scope.message = "NO REQUEST";
					}				
					
				},function(error){
					
				});
							
			};
			function calculateTime(time){
				alert("calculate time funciton");
				var temp = time.split(/\//);;
				var today = new Date();
				console.log("today date " + today);
				var req = [temp[1],temp[0],temp[2]].join('/');
				var reqDate = new Date(req);
				console.log(reqDate);
				console.log("time difference " + parseInt((today.getTime() - reqDate.getTime())/1000)/60);
				var mins =  Math.ceil(parseInt((today.getTime() - reqDate.getTime())/1000)/60);
				console.log('minutes ' + mins);
				var hours = 0;
				var period = mins + " MINS";
				var days = 0;
				var weeks = 0;
				var months = 0;
				
				var years = 0;
				
				if(mins > 60) {
					hours = Math.ceil(mins/60);
					period = hours + " HOURS";
				}
				if(hours > 24){
					days = Math.ceil(hours/24);
					period = days + " DAYS";
				}
				if(days > 7){
					weeks = Math.ceil(days/7);
					period = weeks + " WEEKS";
				}
				if(weeks > 4){
					months = Math.ceil(weeks/4);
					period = months + " MONTHS";
				}
				if(months > 12){
					years = Math.ceil(months/12);
					period = years + " YEARS";
				}
				
				return period;
			};
			
			$scope.acceptRequest = function(id){
				var repliedData = {
						"id": id,
						"joinStatus": "APPROVED"
				};
				var acceptReq = familyProfileService.acceptorcancelJoinRequest(repliedData, token);
				acceptReq.then(function(response){
					alert(response.data.message);
					alert("approve success");
					$window.location.reload();
				},function(error){
					alert(error.data.message);
					alert("approve error");
				});
			};
			
			$scope.cancelRequest = function(id){
				var repliedData = {
						"id": id,
						"joinStatus": "REJECT"
				};
				var acceptReq = familyProfileService.acceptorcancelJoinRequest(repliedData, token);
				acceptReq.then(function(response){
					alert(response.data.message);
					alert("reject success");
					$window.location.reload();
				},function(error){
					alert(error.data.message);
					alert("reject error");
				});
			};
			
			$scope.view_all_request = function(){
				var requestedMembers = familyProfileService.requestedMembers(familyCode, token);
				requestedMembers.then(function(response){
			
					if(response.data.length > 0){
						
						var temp = response.data.length;
						/*if(response.data.length > 10){
							temp = 10;
						}
						else{
							temp = response.data.length;
						}*/
						var temparr = [];
						var i;
						for(i=0; i<temp; i++){
							var obj = {
								"username": response.data[i].user.username.toUpperCase(),
								"requestDate": calculateTime(respose.data[i].requestDate),
								"profile_image_url": response.data[i].user.profile_image_url,
								"acceptid": response.data[i].id,
								"cancelid": response.data[i].id
							};
							temparr.push(obj);
						}
						$scope.members = temparr;
					}
					else{
						$scope.message = "NO REQUEST";
					}
					
					
				},function(error){
					
				});
			};
			
		});
	
})();