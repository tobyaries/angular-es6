app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', ($stateProvider, $locationProvider, $urlRouterProvider) => {
    $stateProvider
        .state({
            name: 'login',
            url: '/',
            component: 'login'
        })
        .state({
            name: 'hello',
            url: '/hello',
            component: 'hello'
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
}]);