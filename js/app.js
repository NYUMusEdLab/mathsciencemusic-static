/* Static public project catalogue. No database or deployment access. */
'use strict';
angular.module('mainApp', ['ui.router', 'ngSanitize', 'ngTouch'])
.config(function ($sceDelegateProvider, $stateProvider, $urlRouterProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://www.youtube.com/**']);
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('app', {url: '/'}).state('app.project', {url: 'project/:slug'});
})
.controller('MainCtrl', function ($scope, $state, $timeout, $window) {
  var lookup = {}, returnSlug = null, pendingFocus;
  $scope.showCarousel = false;
  $scope.setProjects = function (projects) {
    $scope.projects = projects;
    projects.forEach(function (project, index) { project.index = index; lookup[project.slug] = project; });
  };
  function focusAfterRender(id) {
    if (pendingFocus) $timeout.cancel(pendingFocus);
    pendingFocus = $timeout(function () {
      var target = document.getElementById(id);
      if (target) target.focus();
    });
  }
  $scope.$on('$stateChangeSuccess', function (event, state, params) {
    var project = lookup[params.slug];
    $scope.routeMissing = !!params.slug && !project;
    $scope.selectedProject = project || null;
    $scope.showCarousel = !!project;
    document.title = project ? project.title + ' | MathScienceMusic' : 'MathScienceMusic';
    if (project) {
      returnSlug = project.slug;
      focusAfterRender('project-title');
    } else {
      $timeout(function () { if ($window.showViewport) $window.showViewport(); });
      if (returnSlug) focusAfterRender('tile-' + returnSlug);
    }
  });
  $scope.slideTo = function (offset) {
    var index = ($scope.selectedProject.index + offset + $scope.projects.length) % $scope.projects.length;
    $state.go('app.project', {slug: $scope.projects[index].slug});
  };
  $scope.hideProject = function () { $state.go('app'); };
});

// A skip link must move focus without being interpreted as a project hash route.
document.addEventListener('click', function (event) {
  if (event.target.closest && event.target.closest('.skip-link')) {
    event.preventDefault();
    document.getElementById('main-content').focus();
  }
});
