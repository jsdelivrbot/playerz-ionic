'use strict'

angular.module('starter')
    .service('UserService', function(API_ENDPOINT, $http, $httpParamSerializerJQLike) {

        let changePassword = (settingsPassword) =>
            $http.post(`${API_ENDPOINT.url}/changePassword`, settingsPassword);

        let changeMail = (email) => $http.post(`${API_ENDPOINT.url}/changeEmail`, {
            email
        });

        let changeNumber = (number) => $http.post(`${API_ENDPOINT.url}/changeNumber`, {
            number
        });

        let getCountries = () => $http.get(`${API_ENDPOINT.url}/countries`);


        return {
            getCountries,
            changeNumber,
            changePassword,
            changeMail
        }
    });
