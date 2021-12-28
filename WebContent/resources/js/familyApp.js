(function() {
	var app = angular.module('familyApp', ['ui.router']);

    /*app.run(function($state, $rootScope, authentication, AuthTokenFactory, CartService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            var loggedIn = authentication.isLoggedIn();
            
            if (!loggedIn) {
                alert(toState.name);
                event.preventDefault();
                $state.go('login');   
            }
        });
        
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            if(next == current) {
                  event.preventDefault();
                  $state.go('home');
              }
         });

        if (authentication.isLoggedIn()) {
            var user = JSON.parse(AuthTokenFactory.getCredentials());
            $rootScope.isLoggedIn = authentication.isLoggedIn();
            $rootScope.user_name = authentication.getUserName();
            var promise = CartService.refreshCart_2();
            
            promise.then(function(response) {
                $rootScope.$apply();
            }, function(reason) {
                console.log(reason);
            });
        }
    });
*/
    app.config(function($stateProvider,$locationProvider, $sceProvider,$urlRouterProvider, $controllerProvider) {
        $sceProvider.enabled(false);
        /*$stateProvider.state('login', {
        	url:'/views/login.html',
        	cache: false,
        	templateUrl: 'views/login.html',
        	controller: 'loginController'
        });*/
        var origController = app.controller;
        
        app.controller = function(name, constructor) {
            $controllerProvider.register(name, constructor);
            return origController.apply(this, arguments);
        }
     });

    app.filter('hrefToJS', function($sce, $sanitize) {
        return function(text) {
        	var regex_link = /href="(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})"/g;
            var newString = $sanitize(text).replace(regex_link, "onClick=\"window.open('$1', '_blank', 'location=yes')\"");
            return $sce.trustAsHtml(newString);
        };
    });

    app.constant('WEBAPI', (function() {
       var uri = "https://famapp.qarah5.com:8443/FamilyApp_WebApp";
     	
        return {
        	URL: uri,
        	
        	//For User - SignUp
        	SIGNUP: uri +'/api/user/signup',
        	CHECK_EMAIL_VALIDITY: uri +'/api/user/check-email',
        	RESENT_EMAIL_VERIFICATION: uri +'/api/user/resend-email',
        	
        	//For User - Login
        	USER_LOGIN : uri +'/api/user/login',
        	FB_LOGIN : uri +'/api/user/facebook/login',
        	GOOGLE_LOGIN : uri +'Family_WebApp/api/user/google/login',
        	SKIP_FAMILY_JOIN : uri +'/api/auth/user/change-firsttime-status',
        	
        	//User - My Profile
        	GET_MYPROFILE : uri +'/api/auth/user/myprofile',
        	EDIT_MYPROFILE : uri +'/auth/user/myprofile',
        	
        	//User - Password
        	RESET_PASSWORD : uri +'/api/user/forgot-update-password',
        	FORGET_PASSWORD : uri +'/api/user/forgot-password',
        	CHANGE_PASSWORD: uri +'/api/auth/user/changepassword',
        	
        	//DISCUSSION
        	CREATE_TOPIC : uri +'/api/auth/topic/create',
        	EDIT_TOPIC : uri +'/api/auth/topic/edit',
        	REMOVE_TOPIC : uri +'/api/auth/topic/delete',
        	CREATE_COMMENT : uri +'/api/auth/comment/create',
        	VIEW_TOPIC : uri +'/api/auth/topic/view',
        	GET_COMMENTS : uri +'/api/auth/comment?',
        	REFRESH_COMMENTS : uri +'/api/auth/comment/reload',
        	LOAD_MORE_COMMENTS : uri +'/api/auth/comment/loadmore',
        	VIEW_TOPIC_DETAIL : uri +'/api/auth/topic/view/detail',
        	
        	//IMAGES
        	DOWNLOAD_IMAGE : uri ,
        	
        	// CALENDAR EVENT
        	CREATE_EVENT : uri +'/api/auth/schedules/create',
        	EDIT_EVENT : uri +'/api/auth/schedules/edit',
        	DELETE_EVENT : uri +'/api/auth/schedules/delete',
        	GET_EVENT_DETAIL : uri +'/api/auth/schedules/view/detail',
        	GET_INBOX_EVENT_LIST : uri +'/api/auth/schedules/view/inbox',
        	SEARCH_EVENT_BY_TITLE : uri +'/api/auth/schedules/search',
        	GET_SCHEDULE_LIST_DATE : uri +'/api/auth/schedules/search',
        	GET_ALERT_LIST : uri +'/api/auth/schedules/alerts',
        	
        	//FAMILY PROFILE
        	CREATE_FAMILY_PROFILE : uri +'/api/auth/familyprofile/create',
        	EDIT_FAMILY_PROFILE : uri +'/api/auth/familyprofile/edit',
        	FAMILY_PROFILE_DETAILS : uri +'/api/auth/user/familyprofile/details',
        	GET_FAMILY_NAME : uri +'/api/auth/familyprofile/get-familyname',
        	INVITE_FAMILY_MEMBER : uri +'/api/auth/familyprofile/invite',
        	JOIN_FAMILY : uri +'/api/auth/familyprofile/join',
        	FAMILY_JOIN_REQUEST_LIST : uri +'/api/auth/familyprofile/join-request-list',
        	GET_FAMILY_MEMBER : uri +'/api/auth/get-family-member',
        	APPROVE_REJECT_FAMILY_REQUEST : uri +'/api/auth/familyprofile/reply-joinrequest',
        	CANCEL_FAMILY_JOIN_REQUEST : uri +'/api/auth/familyprofile/cancel',
        	REMOVE_FAMILY_MEMBER : uri +'/api/auth/familyprofile/remove-member',
        	LEAVE_FAMILY : uri +'/api/auth/familyprofile/leave-family',
        	FAMILY_ENQUIRY: uri +'/api/auth/familyprofile/family-enquiry'
        	
        };
    })());


    app.constant('ERRORMESSAGES', (function() {
        return {
            DUPLICATE_EMIAL: "Email is already in use for this application.",
            SIGNUP_FAILED: "Failed to signup.",
            SIGNUP_SUCCESS: "Sign Up successfully.",
            FAILED_GEERAL: "Failed!",
            LOGIN_FAILED: "Failed to login.",
            LOGIN_REMIND: "Please login!",
            RESETED_PASSWORD: "Please check your mail.",
            FAILED_RESETED_PASSWORD: "Your email is invalid.",
            CHECK_CONNECTION: "Check your connection.",
            INVALID_FILE_EXTENSION : "Invalid file extension.",
            INVAILD_EMAIL: "Invalid Email.",
            
            //thiri
            REQUIRED_EMAIL: "Email is required!",
            REQUIRED_PASSWORD: "Enter password!",
        	FAMILY_NAME: "Enter FamilyName!",
        	FAMILY_STARTDATE: "Choose Family StartDate",
        	FAMILY_DESCRIPTION: "Enter Description",
        	FIELD_REQUIRED: "Email field cannot be empty!",        		
       	 	INVALID_PASSWORD : "Invalid Password",
       	 	REQUIRED_OTP: "Enter One-Time-Pin",
       	 	MIN_CHARACTER: "Your password must have at least 8 characters.",
       	 	CONFIRM_PASSWORD: "Confirm your password",
       	 	PASSWORD_NOT_MATCH: "Passwords do not match."
        };
    })());
    
    //thiri
    app.constant('VARIABLES', (function() {
        return {
            TOKEN: "token",
            EMAIL: "useremail",
            ISLOGIN: "islogin",
            FAMILY_CODE: "familyCode",
            PROFILE_IMAGE: "profile_image",
            COVER_IMAGE: "cover_image",
            USER_GENDER: "gender",
            USER_NAME: "username",
            USER_BIRTHDAY: "user_birthday",
            USER_PHONE_NO: "user_phone",
            PENDING_FAMILY_CODE: "pending_family_code",
            	
            FAMILY_IMAGE: "familyImage",
            TEMP: "temporary",
            IS_FAMILY_CREATOR: "family_creator",
            FAMILY_ID: "family_id",
            FAMILY_NAME: "family_name",
            USER_ID: "user_id",
            CREATOR_ID: "creator_id",
            FAMILY_DETAILS: "family_details"
           
        };
    })());
    
    
   
    app.factory('DATAPASS', ['$window', function($window){
	    	
	    	return {
	    	    set: function(key, value) {
	    	      $window.localStorage[key] = value;
	    	    },
	    	    get: function(key, defaultValue) {
	    	      return $window.localStorage[key] || defaultValue || false;
	    	    },
	    	    setObject: function(key, value) {
	    	      $window.localStorage[key] = JSON.stringify(value);
	    	    },
	    	    getObject: function(key, defaultValue) {
	    	      if($window.localStorage[key] != undefined){
	    	          return JSON.parse($window.localStorage[key]);
	    	      }else{
	    	        return defaultValue || false;
	    	      }
	    	    },
	    	    remove: function(key){
	    	      $window.localStorage.removeItem(key);
	    	    },
	    	    clear: function(){
	    	      $window.localStorage.clear();
	    	    }
	    	  }
    }]);
    
    
    //thiri
    //match new password and confirm password
    app.directive('valueMatches', ['$parse', function ($parse) {
        return {
          require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
              var originalModel = $parse(attrs.valueMatches),
                  secondModel = $parse(attrs.ngModel);
              // Watch for changes to this input
              scope.$watch(attrs.ngModel, function (newValue) {
                ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
              });
              // Watch for changes to the value-matches model's value
              scope.$watch(attrs.valueMatches, function (newValue) {
                ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
              });
            }
          };
        }]);

    app.directive('updateTitle', ['$rootScope', '$timeout',
        function($rootScope, $timeout) {
            return {
                link: function(scope, element) {
                    var listener = function(event, toState) {
                        var title = 'Project Name';
                        if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + ' - ' + title;
                        $timeout(function() {
                            element.text(title);
                        }, 0, false);
                    };

                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            };
        }
    ]);

    app.directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    app.directive('dateTimePicker', function(){
        return {
                restrict: "A",
                require: "ngModel",
                link: function (scope, element, attrs, ngModelCtrl) {
                    var parent = $(element).parent();
                    var dtp = parent.datetimepicker({
                        format: "LL",
                        showTodayButton: true
                    });
                    dtp.on("dp.change", function (e) {
                        ngModelCtrl.$setViewValue(moment(e.date).format("LL"));
                        scope.$apply();
                    });
                }
            };
    })

    app.directive('ngUpdateHidden', function() {
        return function(scope, el, attr) {
            var model = attr['ngModel'];
            scope.$watch(model, function(nv) {
                el.val(nv);
                if (nv != undefined || null) {
                    scope.onChange(scope.current_item, nv);
                }
            });
        };
    });

    app.directive('disableAnimation', function($animate){
	    return {
	        restrict: 'A',
	        link: function($scope, $element, $attrs){
	            $attrs.$observe('disableAnimation', function(value){
	                $animate.enabled(!value, $element);
	            });
	        }
	    }
	});
}());
