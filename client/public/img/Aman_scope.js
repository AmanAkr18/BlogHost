var myApp = angular.module("myModule", []);

myApp.run(function($rootScope){
    $rootScope.name = "XYZ";
    $rootScope.age = 150;
})


myApp.controller("myController", function($scope){
    $scope.name = "Aman";
    $scope.age= "21";
    $scope.subject = "AngularJS";
    $scope.stu_detail = {name:"Akr", Age: 21, course: "B.Tech"};
});


myApp.controller("myController1", function($scope){
    $scope.name = "Aman Hotchandani";
    $scope.age = 2023;
})