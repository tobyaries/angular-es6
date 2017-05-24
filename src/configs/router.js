import '../controller/Ctrl.js';

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
        })
        .state({
            name: 'ctrl',
            url: '/ctrl',
            template: '<div>hello {{name}}</div>',
            controller: Ctrl
        });
    $urlRouterProvider.otherwise('/');
    $locationProvider.hashPrefix('');
}]);