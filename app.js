const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const cors=require('cors');
app.use(cors({
    orgin: "*",
}))


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = require('./database');

app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html')
})

app.get('/department',function(req, res) {
    res.sendFile(path.join(__dirname,'/department.html'))
});

app.get('/course',function(req, res) {
    res.sendFile(path.join(__dirname,'/course.html'))
});

app.get('/teacher',function(req, res) {
    res.sendFile(path.join(__dirname,'/teachers.html'))
});

app.get('/rooms',function(req, res) {
    res.sendFile(path.join(__dirname,'/rooms.html'))
});

app.get('/program',function(req, res) {
    res.sendFile(path.join(__dirname,'/program.html'))
});


app.get('/getdepartment',(req, res)=>{
    let sql = 'SELECT * FROM department';
    connection.query(sql, function(err,results){
        if(err) throw err;
        res.send(results);
    })
    })

//display department for particular id
app.get('/getdepartment/:id',(req, res)=>{
    let sql = `SELECT * FROM department where deptId = ${req.params.id}`;
    connection.query(sql, (err,results)=> {
        if(err) throw err;
        res.send(results);
        // console.log('Results fetched');
    })
});


app.get('/getdepartment',(req, res)=>{
    let sql = 'SELECT * FROM department';
    connection.query(sql, function(err,results){
        if(err) throw err;
        res.send(results);
    })
})
    
app.get('/getProgram', (req, res)=>
{
    let sql = `SELECT * from program`;
    connection.query(sql, function(err,results)
    {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/getTeachers', (req, res)=>
{
    let sql = `SELECT * from teachers`;
    connection.query(sql, function(err,results)
    {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/getCourse', (req, res)=>
{
    let sql = `SELECT * from course`;
    connection.query(sql, function(err,results)
    {
        if (err) throw err;
        res.send(results);
    })
});


app.get('/getRooms', (req, res)=>
{
    let sql = `SELECT * from room`;
    connection.query(sql, function(err,results)
    {
        if (err) throw err;
        res.send(results);
    })
});

app.get('/chooseDepartment/:id',(req, res)=>{
    // console.log(req.params.id);

    var deptId = req.params.id;
    let sql = `select * from program where programDeptId = ${deptId}`;
    connection.query(sql, function(err, results)
    {
        if(err) throw err;
        // console.log(results);
        res.send(results);
    })
})

//POST methods
app.post('/addDepartment',function(req, res) {
    var deptName = req.body.deptName;
    console.log(deptName);
    let sql = `insert into department (deptName) values (?)`;
    connection.query(sql,[deptName], function(err,results) {
        if(err) throw err;
        res.sendFile(__dirname+'/department.html')
    })
})


app.post('/addProgram',function(req,res){
    var programName = req.body.programName;
    var programAbbr = req.body.programAbbr;
    var programYear = req.body.programYear;
    var programId = programAbbr + programYear;
    var programDeptId = req.body.programDeptId;
    // console.log(programId);
    let sql = `insert into program (programId, programName, programAbbr, programYear, programDeptId) values(?,?,?,?,?)`;
    connection.query(sql, [programId, programName, programAbbr, programYear, programDeptId],function(err, result){
        if(err) throw err;
        res.sendFile(__dirname+'/program.html');
    })

})

app.post('/addTeacher',function(req,res){
    var teacherSalutation = req.body.teacherSalutation;
    var teacherFirstName = req.body.firstName;
    var teacherMiddleName = req.body.middleName;
    var teacherLastName = req.body.lastName;
    var teacherHours = req.body.teacherHours;
    var teacherDeptId = req.body.teacherDeptId;

    var teacherShortName, teacherFullName;

    teacherShortName = teacherFirstName.substring(0,1)+teacherMiddleName.substring(0,1)+teacherLastName.substring(0,1);
    teacherFullName = teacherSalutation +' '+ teacherFirstName + ' ' + teacherMiddleName.substring(0,1) + '. ' + teacherLastName;

    // console.log(teacherFullName);
    // console.log(programId);
    let sql = `insert into teachers (teacherSalutation, teacherFullName, teacherShortName, teacherHours, teacherDeptId) values(?,?,?,?, ?)`;
    connection.query(sql, [teacherSalutation, teacherFullName, teacherShortName, teacherHours, teacherDeptId],function(err, result){
        if(err) throw err;
        res.sendFile(__dirname+'/teachers.html');
    })

});

app.post('/addCourse',function(req,res){
    var courseName = req.body.courseName;
    var courseAbbr = req.body.courseAbbr;
    var courseSem = req.body.courseSem;
    var courseType = req.body.courseType;
    var courseHours = req.body.courseHours;
    var courseCredits = req.body.courseCredits;

    var courseId;
    courseId = courseAbbr + courseSem;
    console.log(courseId);
   
    let sql = `insert into course (courseId, courseName, courseAbbr, courseSem, courseType, courseHours, courseCredits) values(?,?,?,?,?,?,?)`;
    connection.query(sql, [courseId, courseName, courseAbbr, courseSem, courseType, courseHours, courseCredits],function(err, result){
        if(err) throw err;
        res.sendFile(__dirname+'/course.html');
    })

});

app.post('/addRoom', function(req, res){
    var roomId = req.body.roomId;
    var roomVenue = req.body.roomVenue;
    var roomCapacity = req.body.roomCapacity;

    
    let sql = `insert into room (roomId, roomVenue, roomCapacity) values(?,?,?)`;
    connection.query(sql, [roomId, roomVenue, roomCapacity],function(err, result){
        if(err) throw err;
        res.sendFile(__dirname+'/rooms.html');
    })
})

//database connection
app.listen('3000', ()=>{
    console.log('Server started on port 3000 -> http://localhost:3000');
    connection.connect(function(err){
      if(err)  throw err;
        console.log('Database connected');
    })
});