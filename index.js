const express = require('express')
const app = express()
const port = 3333

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const oraPasswd="passw0rd";
const oraUser="system";
const connectUrl="192.168.1.184/xe";

const fs = require("fs");

const indexPage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Search,Add ,Edit,Delete </BODY></HTML>";
const PageEend="</BODY></HTML>";
const searchPagefiles = fs.readFileSync("search.html");
const updatePagefiles = fs.readFileSync("edit.html");
const addPagefiles = fs.readFileSync("add.html");
//const addPage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  add</BODY></HTML>";
//const updatePage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Update</BODY></HTML>";
//const deletePage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Delete</BODY></HTML>";
app.get('/', (req, res) => {
  res.send(indexPage)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//Search User Screen
app.get('/search', (req, res) => {
  //run();
  res.setHeader("Content-Type", "text/html");
  res.end(searchPagefiles+PageEend);
})

app.post('/search', (req, res) => {
  //run();
  res.setHeader("Content-Type", "text/html");

  let serachResult="";
  res.send(searchPagefiles+ serachResult+PageEend)
})
//Add User Screen
app.get('/add', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(addPagefiles+PageEend);
})

app.post('/add', (req, res) => {
  
  res.redirect("/search");
})
// Update User
app.get('/update', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  let form=" <form method=\"post\" action=\"/update\"> "
      +"<table>"
      +"<tr><td>User Name :</td><td>  <input type=\"text\" name=\"userName\"  value=\"\"></td></tr>"
      +"<tr><td>first Name :</td><td> <input type=\"text\" name=\"first_name\" value=\"\"></td></tr>"
      +"<tr><td>last Name :</td><td>   <input type=\"text\" name=\"last_name\" value=\"\"></td></tr>"
      +"<tr><td>Email:</td><td>     <input type=\"text\" name=\"email\" value=\"\"></td></tr>"
     + "<tr><td>Address :</td><td>     <input type=\"text\" name=\"email\" value=\"\"></td></tr>"
     + "<tr><td>Provicne</td><td>     <input type=\"text\" name=\"provice\" value=\"\"></td></tr>"
      +"<tr><td>Khet</td><td>     <input type=\"text\" name=\"khet\" value=\"\"></td></tr>"
      +"<tr><td>Khawang</td><td>    <input type=\"text\" name=\"khwang\" value=\"\"></td></tr>"
     + "<tr><td>zipcode</td><td>         <input type=\"text\" name=\"zipcode\" value=\"\"></td></tr>"
    +"</table> "
    +"<input type=\"submit\" value=\"Save\">"
+"</form>"
  res.end(updatePagefiles+form+PageEend);
  
})
app.post('/update', (req, res) => {
  //res.setHeader("Content-Type", "text/html");
  //Update Process
  res.redirect("/search");
})


//Delete User Screen
app.post('/delete', (req, res) => {
  //res.setHeader("Content-Type", "text/html");
  //Delete Process
  res.redirect("/search");
})

async function run() {

  let connection;

  try {
    connection = await oracledb.getConnection( {
      user          : oraUser,
      password      : oraPasswd,
      connectString : connectUrl
    });

     const result = await connection.execute(
       `SELECT 1 from dual`,
      // [103],  // bind value for :id
     );
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}






