'use strict';

// Config params for the Angular App
var template_ext = '';
var host = 'http://localhost:3000/';

// TODO: better way to pass these between MainCtrl and ProjectCtrl scopes?
var selectedProjNum = -1;
var totalProjects = 0;

// Declare app level module which depends on views, and components
/*
 * 'mainApp.blog',
 'mainApp.post',
 'mainApp.project',
 'mainApp.gallery',
 'mainApp.contact',
 'postServices'
 * */
angular.module('mainApp', ['ui.router','ngSanitize','ngTouch'])

	//.run(['', function() {}])
	
    .config(function($sceDelegateProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://www.youtube.com/**'
        ]);

        // The blacklist overrides the whitelist so the open redirect here is blocked.
        $sceDelegateProvider.resourceUrlBlacklist([
            'http://myapp.example.com/clickThru**'
        ]);
		
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("");

		$stateProvider
			.state('app', {
				url: "/",
				//abstract: true,
				//template: '<ui-view/>'
			})
			.state('app.project', {
				url: "project/:slug"
			})

		//$locationProvider.html5Mode(true).hashPrefix('!')
    })

	.controller('ProjectCtrl', function($scope, $timeout, $stateParams, $state) {
		console.log($stateParams.slug);
        // modulo function that handles negative numbers (good for wrap-around stuff)
        // http://javascript.about.com/od/problemsolving/a/modulobug.htm
        // TODO: put somewhere else?
        Number.prototype.mod = function(base) {
            return ((this % base) + base) % base;
        };
		
		$scope.slideTo = function(direction){
			$('.carousel').carousel(direction);
		}

        $("#myCarousel").on('slid.bs.carousel', function (event) {
			var nextProjIncrement = (event.direction == 'left') ? 1 : -1;

			selectedProjNum = (selectedProjNum + nextProjIncrement).mod(totalProjects);
			$state.go('app.project', {slug: $scope.projects[selectedProjNum].slug});

			adjustSizes();
        });
		
        function adjustSizes() {
            var rows = ['.row1','.row2','.row3'];

            rows.forEach(function(row) {
                var columnDivs = $('#proj-' + selectedProjNum + ' ' + row);
                var heights = columnDivs.map(function () {
                    return $(this).height();
                }).get();

                var maxHeight = Math.max.apply(null, heights) + 0;

                columnDivs.height(maxHeight);
            });
        }

		$scope.init = function(){
			$timeout(function () {
                adjustSizes();
            });
		}
	})
	
    .controller('MainCtrl', function($rootScope, $scope, $state, $timeout, $window, $location, $sce) {
		$scope.showCarousel = false;
		var _projectLookup = {};

		$rootScope.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams, options){
				//console.log(event, toState, toParams, fromState, fromParams);
				var project = _projectLookup[toParams.slug];
				if (project) { $scope.showProject(project, project.index); } else { $scope.showCarousel = false; $('#signup, #convo').show(); }
			})
		
		$scope.setProjects = function(projects){
			projects.forEach(function(project, i) {
				project.index = i;
				_projectLookup[project.slug] = project;				
			});
			$scope.projects = projects;
		}
		
		$scope.showProject = function(project,projNum){
			$scope.showCarousel = true;
			$scope.selectedProject = project;
            selectedProjNum = projNum;
            totalProjects= $scope.projects.length;
			
			$state.go('app.project', {slug:project.slug});

            $('#signup').hide();
            $('#convo').hide();
		}

		$scope.hideProject = function(){
			$scope.showCarousel = false;
			$('#signup').show();
			$('#convo').show();
			$state.go('^');

			$timeout(function () {
				$window.showViewport();
				$scope.$apply();
			}, 100)
		}
		
		$scope.nextProject = function(){
			if(selectedProjNum >= $scope.projects.length-1){
				return $scope.projects[0];				
			}else{
				return $scope.projects[selectedProjNum+1];				
			}
		}

		$scope.prevProject = function(){
			if(selectedProjNum <= 0){
				return $scope.projects[$scope.projects.length-1];
			}else{
				return $scope.projects[selectedProjNum-1];
			}
		}
		
		/* seth test
		$(".modal-fullscreen").on('show.bs.modal', function () {
			setTimeout( function() {
				$(".modal-backdrop").addClass("modal-backdrop-fullscreen");
			}, 0);
		});
		$(".modal-fullscreen").on('hidden.bs.modal', function () {
			$(".modal-backdrop").addClass("modal-backdrop-fullscreen");
		});*/

        /*$scope('#myCarousel').on('slide.bs.carousel', function () {
            // do something…
            console.log("slid");
        })*/
	})

	.directive('countdown', ['Util','$interval', function (Util, $interval) {
		return {
			restrict: 'A',
			scope: { date: '@' },
			link: function (scope, element) {
				var future;
				future = new Date(scope.date);
				$interval(function () {
					var diff;
					diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
					return element.text(Util.dhms(diff));
				}, 1000);
			}
		};
	}])

    .factory('Util', [function () {
		return {
			dhms: function (t) {
				var days, hours, minutes, seconds;
				days = Math.floor(t / 86400);
				t -= days * 86400;
				hours = Math.floor(t / 3600) % 24;
				t -= hours * 3600;
				minutes = Math.floor(t / 60) % 60;
				t -= minutes * 60;
				seconds = t % 60;
				/*
				 *  + 'd',
				 hours + 'h',
				 minutes + 'm',
				 seconds + 's'
				 * */
				return [
					days
				];
			}
		};
	}]);

