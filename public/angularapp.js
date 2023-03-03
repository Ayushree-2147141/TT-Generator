
angular.module('mydeptapp',[])
.controller('deptctrldetails',function($scope,$http)
{
    
    $http.get('http://127.0.0.1:3000/getdepartment')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.department=response;
        $scope.count=$scope.table.length;
    })
});

var indexApp = angular.module('myindexapp',[]);
// indexApp.controller('indexctrldetails', function($scope, $http)
// {
//     $http.get('http://127.0.0.1:3000/getdepartment')
//     .success(function(response)
//     {
//         $scope.department=response;
//     })
// });

indexApp.controller('chooseDeptCtrlDetails', function($scope, $http)
{
    var dept;
    $http.get('http://127.0.0.1:3000/getdepartment')
    .success(function(response)
    {
        $scope.department=response;
    })

    // $scope.departments = [3,2,8,5]; //want this to come from DB
    $http.get('http://127.0.0.1:3000/getDepartmentId')
        .success(function(response){
            // console.log('hello');
            $scope.departments = response;
            // console.log(response);
        })
    // console.log('Hello');
    $scope.fetch = function(selectedDepartment){
        dept = selectedDepartment;
        // console.log('hello');
        // console.log(selectedDepartment);
        $http.get('http://127.0.0.1:3000/chooseDepartment/'+selectedDepartment)
        .success(function(response){
            $scope.programs = response;
            // console.log(response);
        })

    }

    $scope.getSemester = function(selectedProgram){
        console.log("this is :",selectedProgram);
        $http.get('http://127.0.0.1:3000/chooseSemester/'+selectedProgram)
        .success(function(response){
            $scope.semesters = response;
            console.log(response);
        })
    }

    $scope.getCourse = function(selectedSemester){
        // console.log(selectedSemester);
        // console.log("this is deptId : ",dept);
        $http.get('http://127.0.0.1:3000/showCourse/'+selectedSemester+'/'+dept)
        .success(function(response){
            $scope.courseTeachers = response;
            console.log(response);
        })
    }

    
})


var programApp = angular.module('myprogramapp',[]);
programApp.controller('programctrldetails',function($scope,$http)
{
    
    $http.get('http://127.0.0.1:3000/getprogram')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.program=response;
        $scope.count=$scope.table.length;
    })
});
programApp.controller('deptctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:3000/getdepartment')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.department=response;
        $scope.count=$scope.table.length;
    })    
})

angular.module('myteachersapp',[])
.controller('teachersctrldetails',function($scope,$http)
{
    
    $http.get('http://127.0.0.1:3000/getteachers')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.teachers=response;
        $scope.count=$scope.table.length;
    })
});

angular.module('mycourseapp',[])
.controller('coursectrldetails',function($scope,$http)
{
    
    $http.get('http://127.0.0.1:3000/getcourse')
    .success(function(response)
    {
        // console.log($scope.length);
        $scope.courses=response;
        $scope.count=$scope.table.length;
    })
});

angular.module('myroomsapp',[])
.controller('roomsctrldetails',function($scope,$http)
{
    
    $http.get('http://127.0.0.1:3000/getrooms')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.rooms=response;
        $scope.count=$scope.table.length;
    })
});

