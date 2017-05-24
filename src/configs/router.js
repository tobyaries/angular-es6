app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'login',
            url: '/',
            component: 'login'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
}]);