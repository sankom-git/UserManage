const express = require('express')
const app = express()
const port = 3333

const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const oraPasswd="passw0rd";
const oraUser="system";
const connectUrl="192.168.1.184/xe";

const indexPage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Search,Add ,Edit,Delete </BODY></HTML>";
const searchPage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Search</BODY></HTML>";
const addPage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  add</BODY></HTML>";
const updatePage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Update</BODY></HTML>";
const deletePage="<HTML><HEAD><TITLE>User Manage</TITLE></HEAD><BODY>  Delete</BODY></HTML>";
app.get('/', (req, res) => {
  res.send(indexPage)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
//Search User Screen
app.get('/search', (req, res) => {
  run();
  res.send(searchPage)
})
//Add User Screen
app.get('/add', (req, res) => {
  res.send(addPage)
})
// Update User
app.get('/update', (req, res) => {
  res.send(updatePage)
})

//Delete User Screen
app.get('/delete', (req, res) => {
  res.send(deletePage)
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






