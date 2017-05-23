app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'login',
            url: '/',
            component: 'login'
        })
        .state({
            name: 'register',
            url: '/register',
            component: 'register'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
}]);