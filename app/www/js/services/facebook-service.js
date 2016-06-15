'use strict'
angular.module('starter')
    .service('FacebookService', function(API_ENDPOINT, $http, $httpParamSerializerJQLike) {

      let addSportFacebookUser = (sport) => $http({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike({
              sport,
          }),
          url: `${API_ENDPOINT.url}/addSportFacebookUser`

      });

      let addTeamFacebookUser = (team) => $http({
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: $httpParamSerializerJQLike(team),
          url: `${API_ENDPOINT.url}/addTeamFacebookUser`

      });

      return {
        addTeamFacebookUser,
        addSportFacebookUser
      }


    });
