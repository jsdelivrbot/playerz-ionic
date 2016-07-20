'use strict';

angular.module('starter.controller.troop', [])
    .controller('TroopTabCtrl', function($ionicModal, $ionicPopup, TeamService, $scope, $timeout, $state, StorageService) {

        var self = this;

        $scope.player = {
            first_name: null,
            last_name: null,
            favourite_position: null
        };

        self.showDelete = false;

        $ionicModal.fromTemplateUrl('templates/add-player-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function() {
            if (self.showDelete) {
                self.showDelete = false;
            }
            $scope.modal.show();
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        self.addPlayer = function() {
            TeamService.addPlayer($scope.player)
                .success(function(data) {
                    self.getPlayers();
                    console.log(data);
                    $scope.player = {};
                    $scope.modal.hide();
                    $cordovaToast.showShortBottom(data.msg);
                })
                .error(function(data) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: data.msg
                    });
                    console.log(data);
                });

        };

        self.getPlayers = function() {
            TeamService.getPlayers()
                .success(function(data) {
                    console.log(data);
                    self.players = data.players;
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        self.popupRemovePlayer = (player) => {
          let confirmPopup = $ionicPopup.confirm({
            title: 'Suppression',
            template: `Etes-vous sur de vouloir supprimer
            ${player.first_name} ${player.last_name} ?`
          })

          confirmPopup.then((res) => {
            if(res){
                self.removePlayer(player._id);
            }else {

            }
          })
        };
        self.removePlayer = function(id) {
            TeamService.removePlayer(id)
                .success(function(data) {
                    console.log(data);
                    self.getPlayers();
                    $cordovaToast.showShortBottom(data.msg);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        self.goPlayer = (playerId) => {
            StorageService.addStoragePlayerId(playerId);
            $state.go('player', {
                playerId
            });
        };

        self.getPlayers();

    });
