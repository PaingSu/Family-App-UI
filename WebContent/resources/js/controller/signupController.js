(function(){
	angular.module('familyApp')
		.controller('registerController', function($scope,signupService, ERRORMESSAGES){
			$scope.user = {
					
			};
			
			$scope.useremail = function(email) {
	            console.log("Checking duplicate email..."+email);
	            var check_email = signupService.checkEmail(email);

	            check_email.then(function(response) {
	                if (response.is_exist) {
	                    $scope.duplicate_email = ERRORMESSAGES.DUPLICATE_EMIAL;
	                    console.log("Error occurs with existing email. "+$scope.duplicate_email );
	                } else {
	                    $scope.duplicate_email = "";
	                }

	            }, function(error) {
	                $scope.duplicate_email = ERRORMESSAGES.DUPLICATE_EMIAL;
	                console.log("Error occurs..."+$scope.duplicate_email);
	            });
	        };
	        
	        
	        $scope.signup = function(){		
	    		
	    		//date
	    		$scope.selected_date=new Date($('#datepicker').val());
	    		$scope.day = $scope.selected_date.getDate();
	    		$scope.month = $scope.selected_date.getMonth() + 1;
	    		$scope.year = $scope.selected_date.getFullYear();
	    		$scope.date = [$scope.day, $scope.month, $scope.year].join('/');
	    	
	    		
	    		
	    		//image
	    		$scope.image =$('#base64image').val();
	    		
	    		
	    		$scope.coverimage =$('#base64coverimage').val();
	    		
	    		
	    		
	    		
	    		if( $scope.user.upassword == $scope.user.retypepassword){
	    		var user = {
	    			
	    				'username' : $scope.user.uname,
	    				'codeword' : $scope.user.upassword,
	    				'profile_image_url' : $scope.image,
	    				/*profile_image_url : encodeImageFileAsURL($scope.user.profilephoto),*/
	    				'email': $scope.user.uemail,
	    				'gender': $scope.user.gender,
	    				'birthday':$scope.date,
	    				
	    				'phone_no': $scope.user.phonenum,
	    				'cover_image_url':$scope.coverimage,
	    		};	
	    		}
	    		
	    		/*alert($scope.user.selected_date);*/
	    		
	    		/*console.log("data obj: "+user)*/
	    		/*var params = JSON.stringify(user);*/
	    		/*console.log("data obj: "+params)*/
	    		var signup =signupService.signupProfile(user);
	    		
	    		signup.then(function(response) {
	    			window.location = "/FamilyApp_WebUI/views/success_signup.html";

		            }, function(error) {
		                alert("error");
		            });
	    		
	    		/*signup.success(function(data, status, headers, config) {
	    			window.location = "/FamilyApp_WebUI/views/login.html";
	    			$scope.message = data;
	    			console.log("message from server: "+data)
	    			
	    		});
	    		signup.error(function(data, status, headers, config) {
	    			alert( "failure message: " + JSON.stringify({data: data}));
	    			
	    		});	*/	
	    		
	    	
	    	};
	    	$scope.signupcancel = function(){	
	    		window.location = "/FamilyApp_WebUI/views/login.html";
	    	};
	        
	        
		
	        
	        
		})
})();

/*
var helloAjaxApp = angular.module("SignUp", []);

helloAjaxApp.controller("registerController",function($scope, $http, dateFilter) {
	$scope.signup = function(){		
		// Writing it to the server
		//date
		$scope.selected_date=new Date($('#datepicker').val());
		$scope.day = $scope.selected_date.getDate();
		$scope.month = $scope.selected_date.getMonth() + 1;
		$scope.year = $scope.selected_date.getFullYear();
		$scope.date = [$scope.day, $scope.month, $scope.year].join('/');
		
		//image
		$scope.image =$('#base64image').val();
		alert($scope.image);
		
		$scope.coverimage =$('#base64coverimage').val();
		alert($scope.coverimage);
		
		if( $scope.user.upassword == $scope.user.retypepassword){
		var user = {
				username : $scope.user.uname,
				codeword : $scope.user.upassword,
				profile_image_url : $scope.image,
				//profile_image_url : encodeImageFileAsURL($scope.user.profilephoto),
				email: $scope.user.uemail,
				gender: $scope.user.gender,
				birthday:$scope.date,
				
				phone_no: $scope.user.phonenum,
				cover_image_url:$scope.coverimage,
		};	
		}
		
		//alert($scope.user.selected_date);
		
		console.log("data obj: "+user)
		var params = JSON.stringify(user);
		console.log("data obj: "+params)
		var res = $http.post('http://192.168.2.104:8080/FamilyApp_WebApp/api/user/signup', params); // request body parameter
		
		res.success(function(data, status, headers, config) {
			window.location = "/FamilyApp_WebUI/views/login.html";
			$scope.message = data;
			console.log("message from server: "+data)
			
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
			
		});		
		
		
		
		/*return $http({
			method: 'POST',
			url : 'http://192.168.2.104:8080/FamilyApp_WebApp/api/user/signup',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: params,
            transformRequest: function(data) {
                return "data="+encodeURIComponent(data.data);
            }
		}).then(function success(response){
			console.log(response.data);
          //  resolve(response);
		}, function error(error) {
			console.log("Error")
            //reject(error);
        });
		
		// Making the fields empty
		//
		/*$scope.uname = '';
		$scope.upassword = '';
		$scope.uemail = '';
		$scope.gender = '';
		$scope.selected_date = '';
		$scope.phonenum  = '';
	};*/
	
	
	/*$scope.signupcancel = function(){	
		window.location = "/FamilyApp_WebUI/views/login.html";
		//$location.path('/views/login.html');
	};*/
	
	/*
	$scope.useremail = function(){
		$scope.uemail = $('#email').val();
		$http.get("http://192.168.2.104:8080/FamilyApp_WebApp/api/user/check-email"+"?email="+ $scope.uemail).success(function(response){
		}).error(function(){
			$("#checkemail").css('color', 'red','font-family', 'ChalkboardSE');
			$("#checkemail").css('font-family', 'ChalkboardSE');
			$("#checkemail").css('font-size', '14px');
			$("#checkemail").css('margin-left', '40px');
			$("#checkemail").text("Email already exist");
		});
	};
});*/
