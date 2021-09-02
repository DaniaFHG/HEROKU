const mysql=require('mysql');
const express=require('express');
const bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());

var mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin21",
    database:"escuela"
});

/*CRUD-Get*/
app.get('/estudiante',(req,res)=>{
    console.log('get lista estudiante')
    mysqlConnection.query('Select * from estudiante',(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Get-id*/
app.get('/estudiante/:id',(req,res)=>{
    console.log('get estudiante')
    mysqlConnection.query('Select * from estudiante where id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            res.send(rows);
        }else{
            console.log(err);
            res.send('Error');
        }
    })
});
/*CRUD-Insert*/
app.post('/estudiante',(req,res)=>{
    console.log('Insert estudiante')
    let emp=req.body;
    console.log(emp);
    mysqlConnection.query('insert into estudiante (nombre, apellido, edad, grado) values (?,?,?,?)',
    [emp.Nombre,emp.Apellido,emp.Edad,emp.Grado],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('created Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Update*/
app.put('/estudiante/:id',(req,res)=>{
    console.log('Update estudiante')
    let emp=req.body;
    mysqlConnection.query('update estudiante set nombre=?, apellido=?, edad=?, grado=? where id=?',
    [emp.Nombre,emp.Apellido,emp.Edad,emp.Grado,req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Updated Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

/*CRUD-Delete*/
app.delete('/estudiante/:id',(req,res)=>{
    console.log('Delete estudiante')
    mysqlConnection.query('delete from estudiante where id = ?',[req.params.id],(err,result)=>{
        if(!err){
            console.log(result);
            res.send('Deleted Successfully');
        }else{
            console.log(err);
            res.send('Error'+err);
        }
    })
});

app.listen(3000);