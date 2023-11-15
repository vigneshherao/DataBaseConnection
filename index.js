const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'student',
    password:'Vignesh@2019'
  })
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

  let q = "INSERT INTO students (id,userName,email,password) VALUES ?;"
  let user = [];




  
let getRandomUser = () => {
    return [
    faker.string.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
    faker.internet.password(),
    ]

  }



// try {
//     connection.query(q,[user],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//     });
// } catch (error) {
//     console.log(error);
// }



// connection.end();
  
app.listen(port,()=>{
    console.log("port is started " + port);
})


app.get("/",(req,res)=>{
    q = "SELECT COUNT(*) FROM students";
    try {
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let count = result[0]["COUNT(*)"];
            res.render("home.ejs",{count});
        })
    } catch (error) {
        console.log(error);
    }
})


app.get("/users",(req,res)=>{
    q = "SELECT * FROM students";
    try {
        connection.query(q,(err,result)=>{
            res.render("users.ejs",{result});
        })
    } catch (error) {
        console.log(error);
    }
})


app.get("/users/edit/:id",(req,res)=>{
    let {id} = req.params;
    q = `SELECT * FROM students WHERE id = '${id}'`;
    try {
        connection.query(q,(err,result)=>{
            res.render("edit.ejs",{result});
            console.log(result[0].userName);
        })
    } catch (error) {
        console.log(error);
    }
})