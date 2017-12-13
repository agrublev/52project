$(function(){
    console.log("%c 52PROJECT ready to go!","background-color:#444; text-shadow:0 1px 0 #000; color:#fff; line-height:30px; padding:15px 300px; font-size:25px; font-family: -apple-system, BlinkMacSystemFont, sans-serif;letter-spacing: 2px;");

});


// Declare app level module which depends on views, and components
let app = angular.module('FiftyTwoApp', ['firebase']);

app.controller('MyController', function ($scope, $rootScope, $firebaseObject) {
    let ref = firebase.database().ref();
    $scope.data = $firebaseObject(ref);
    console.log($scope.data);
    $scope.myVar = '52project love';
    $scope.tellMe = function(){
        setTimeout(function(){
            $scope.myVar = "52project love ...";
        },1000);
    };
});


