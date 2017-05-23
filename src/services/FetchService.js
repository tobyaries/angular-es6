app.service('FetchService', ['Fetch', 'jsonPath', 'API', function (Fetch, jsonPath, API) {
    let {
        fetch
    } = Fetch;
    this.getLocationList = () => {
        return fetch({
            method: 'GET',
            url: jsonPath + API.locationList
        });
    };
    this.getCountryList = () => {
        return fetch({
            method: 'GET',
            url: jsonPath + API.countryList
        });
    };
}]);