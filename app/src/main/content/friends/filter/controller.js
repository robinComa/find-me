'use strict';

angular.module('app').controller('FriendsFilterCtrl', function(settings, $scope, $mdDialog){

    $scope.socials = settings.socials;

    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.submit = function(answer) {
        $mdDialog.hide(answer);
    };

});