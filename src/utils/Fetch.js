app.factory('Fetch', ['$http', ($http) => {
    let fetch = ({
        method = 'POST',
        url,
        data,
        headers = {
            'Content-Type': 'application/json'
        }
    }) => {
        return $http({
            method: method,
            url: url,
            data: data,
            headers: headers
        });
    };
    return {
        fetch: fetch
    };
}]);