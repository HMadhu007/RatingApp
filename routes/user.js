var express = require('express');
var router = express.Router();

// var database = require('../database')
var mysql = require('mysql');

var connection  = mysql.createConnection({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : 'Signiwis@123',
    database : 'signiwis_schema',
    port : 3306

});
/* GET users listing. */

router.get('/', function(req, res, next) {
    debugger
    var message = req.flash('success');
    connection.query('SELECT * FROM admin_notification', function(error, data){
        debugger
        connection.query('SELECT * FROM employee_table', function(err,data1){

            debugger
            connection.query('SELECT * FROM review_status', function(error,data2) {
                debugger   
                if (error) { throw error } else {
                    debugger
                    
                    res.render('user', { title: "Welcome to Signiwis", message, session: req.session, oReviewEmpData: data , oEmp_Data:data1, oEmp_ReviewStatus:data2})
                    debugger
                } 
            })  

        })
      
    //    res.render('user', {title:"Welcome to Signiwis", message,session:req.session, oReviewEmpData:data})
        
    })
});


module.exports = router;

