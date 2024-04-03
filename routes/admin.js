debugger
var express = require('express');
var router = express.Router();
var router2 = express.Router();

// var popup = require('popups');

// var database = require('../database')


debugger
const { request } = require('../app');
const session = require('express-session');
debugger
var mysql = require('mysql');
const app = require('../app');
var connection  = mysql.createConnection({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : 'Signiwis@123',
    database : 'signiwis_schema',
    port : 3306

});
debugger
/* GET users listing. */
router.get('/', function(req, res, next) {
    debugger
    var message = req.flash('success');
    var message1 = req.flash('success');
    var largestNumber = `SELECT MAX(Employee_Id) AS greatest_value
    FROM (
        SELECT Employee_Id FROM employee_table
        UNION
        SELECT Employee_Id FROM resign_employeetab
    ) AS Largest_value;`

    connection.query('SELECT * FROM employee_table', function(error, data){
        connection.query('SELECT * FROM review_status', function(error, data2){
            connection.query(largestNumber,function(error3,data3){
                debugger
                console.log(data3[0]);
                res.render('admin', {title:"Welcome to Signiwis", message ,session:req.session,sampleData:data, sampleData2:data2, newId:data3})

            })
            
         })
       
    //    res.render('admin', {title:"Welcome to Signiwis", session:req.session, sampleData:data})
       
    });

   
});

router.get('/resign', function(req, res, next){
    debugger
        
        // connection.query('SELECT * FROM employee_table', function(error, data){
            
          
                res.redirect('/resignEmpPopup')
                
           
    
    // })
    });

router.get('/admin/:id',function(req, res){
debugger
var id = request.params.id   

var query = `SELECT * FROM employee_table WHERE Employee_Id = ${id}`
    
    connection.query(query, function(error, data, rows){
debugger
        
        res.redirect('adminMDPopup', {title:"Welcome to Signiwis", session:req.session, sampleData:data})
        
     })
   
})

router.get('/fetchuser', (req, res)=>{
    debugger

    var UId = req.body.EmpIdForFeatchData

    var query = `SELECT * FROM employee_table WHERE Employee_Id = ${UId}`
    
    connection.query(query, function(error, data, rows){
debugger
        session.UId = UId
        res.render('admin', {title:"Welcome to Signiwis", sampleData:data})

      debugger 
        
     })
})
 router.get('/delete/:id', function(req,res,next){

    debugger
    var id = req.params.id;
    connection.query(`DELETE FROM review_status WHERE Unique_Id = ${id}`, function(error,data){
        debugger
        if(error)
        {
            debugger
            throw error;
            
            
           
        }
        else
        {
            debugger
            res.redirect("/admin")
        }
    })
 })

 router.post('/addEmployee',function(req,res,next){
    debugger
    var empId=req.body.Add_Employee_Id;
    var empName=req.body.Add_Employee_Name;
    var empDesignation=req.body.Add_Employee_Designation;
    var empEmail=req.body.Add_Employee_Email;
    var empDept=req.body.Add_Employee_Department;
    var empGender=req.body.Add_Employee_Gender
    var empPassword= 'Default@123';
    var empStatus='Working';
    var empMockTaken = 0;
    var empMockGiven = 0;
    

    var sql = `INSERT INTO employee_table (Employee_Id, Employee_Name, Employee_Designation, Employee_Email,
        Employee_Department, Employee_Password,
        Employee_Icon,Employee_Status,Employee_Mock_Taken,Employee_Mock_Given) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`;


    connection.query(sql,[empId,empName,empDesignation,empEmail,empDept,empPassword,empGender,empStatus,empMockTaken,empMockGiven],function(error, data, rows){
        if(error) 
    {
      debugger
      
      console.log(error);
                                 
    } 
    else 
    {
      debugger
        console.log('data created successfully');
        req.flash('success',"Employee Added Successfully");
        res.redirect("/admin")
        
    }
    })    
 }) 

module.exports = router;
