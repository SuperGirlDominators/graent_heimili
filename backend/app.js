const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// const jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
const firebaseAdmin = require('firebase-admin');
const app = express();
const port = 3001;
const APIPrefix = '/api';
const seacretPassword = 'pass12345678910';
const tokenCookieOptions = {
  // httpOnly: true,
  expires: 0,
  // secure: true
 }

const serviceAccount = require('./key/graent-heimili-firebase-adminsdk-cn78s-c7a801171f.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://graent-heimili.firebaseio.com"
});

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, postman-token, Access-Control-Allow-Origin");
  next();
})

app.use(bodyParser.json());
app.use(cookieParser());

// Create Database Connection
// const dbConnection = mysql.createConnection({
//   host     : '212.48.71.86',
//   user     : 'judynjeru_user',
//   password : ')KGB2r985$vZ',
//   port     :3306,
//   database : 'judynjeru_greenhome'
// })

const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'judy_local',
  password : '',
  port     :8889,
  database : 'green_home'
})

//Connect to Database
dbConnection.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySql Connected');
})

// Get questions from database
app.get(APIPrefix + '/questions', (req, res) => {
  let sql = 'SELECT * FROM questions';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});

// Get checklist from database
app.get(APIPrefix + '/checklist', (req, res) => {
  let sql = 'SELECT * FROM checklist';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});

// Get choices from database
app.get(APIPrefix + '/data', (req, res) => {
  let sql = 'SELECT * FROM quiz_data';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

// send choices from database
app.post(APIPrefix + '/data', (req, res) => {
  //res.send('not Implementd');
  // get the cookie from the req
  const token = req.cookies.green_home_token;
  if (token) {
    // idToken comes from the client app (shown above)
    firebaseAdmin.auth().verifyIdToken(token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        // console.log(uid);
      }).catch(function(error) {
        // Handle error
        console.log(error);
        res.send(error);
      });
  } else {
    console.log("not found");
    res.send("no token found");
  }
  // we ask fireadminn is the cookie ok?

});

// send choices from database
app.post(APIPrefix + '/data', (req, res) => {

  //res.send('not Implementd');
  // get the cookie from the req
  const token = req.cookies.green_home_token;
  if (token) {
    // idToken comes from the client app (shown above)

    firebaseAdmin.auth().verifyIdToken(token)
      .then(function(decodedToken) {
        var uid = decodedToken.uid;
        // console.log(uid);
      }).catch(function(error) {
        // Handle error
        console.log(error);
        res.send(error);
      });
  } else {
    console.log("not found");
    res.send("no token found");
  }
  // we ask fireadminn is the cookie ok?
});

function getFirebaseUser(uid, cb) {
  firebaseAdmin.auth().getUser(uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
    cb(null, userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
    cb(error, null);//if no error pass null
  });
}

function createFirebaseUser(user, cb) {
  firebaseAdmin.auth().createUser({
    email: user.email,
    emailVerified: user.emailVerified,
    // phoneNumber: user.phoneNumber ,
    // password: "secretPassword",
    displayName: user.displayName,
    photoURL: user.photoURL,
    disabled: false
  })
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully created new user:", userRecord.uid);
    cb(null, userRecord);
  })
  .catch(function(error) {
    console.log("Error creating new user:", error);
    cb(error);
  });
}

function createCustomToken(uid, cb) {
  firebaseAdmin.auth().createCustomToken(uid)
    .then(token => {
      // Send token back to client
      cb(null, token);
    })
    .catch(function(error) {
      console.log("Error creating custom token:", error);
      cb(error);
    });
}

// create a new user in the database and return a access token cookie
app.post(APIPrefix + '/adduser', (req, res) => {
  // finding the user
  getFirebaseUser(req.body.user.uid, (error, userData) => {
    // if no user found create it ?
    if(error) {
      createFirebaseUser(req.body.user,(error, userRecord) => {
        if (error) {
          res.send(error);
        } else {
          createCustomToken(req.body.user.uid, (error, token) => {
            if (error) {
              res.send(error);
            } else {
              res.cookie('green_home_token', token, tokenCookieOptions);
              res.send("token returned! yey!");
            }
          });
        }
      });
    } else {
      // if user is found give user an access token
      /*createCustomToken(req.userData.uid, (error, token) => {
        if (error) {
          res.send(error);
        } else {
          res.cookie('green_home_token', token, tokenCookieOptions);
          res.send("token returned! yey!");
        }
      });*/
      // console.log("STARTING REQUEST BODY")
      // console.log(req.body);
      // console.log("returning cookie");
      res.cookie('green_home_token', req.body.realToken, tokenCookieOptions);
      // res.send("token returned! yey!");
      storeUserInDatabase(req.body.user.uid, req.body.user.displayName, req.body.user.photoURL, res );
    }
  });
});

function storeUserInDatabase(userId, username, picture, res) {
  let sql = `INSERT INTO user_info (userID, username, userImage) VALUES ('${userId}', '${username}', '${picture}')`;
  dbConnection.query(sql, (err, result) => {
    if(err) console.log( err );
    res.send(result);
  });
}

// gives the calling user an authentication token
/*app.post(APIPrefix + '/authenticate', (req, res) => {

});*/

// Post choices from database
app.post(APIPrefix + '/userchoices', (req, res) => {
  const data = req.body;
  let values = [];
  req.body.unSelectedChoices.map((choice)=>{
    //values += choice.choiceID + ", ";
    values.push(choice.choiceID);
    let sql = `INSERT INTO user_checklist (userID, choiceID, choice, checklistID, checklistStep, checklistItem, checklistTip ) VALUES ('${data.userID}', '${choice.choiceID}', '${choice.choice}', '${choice.checklistID}', '${choice.checklistStep}', '${choice.checklistItem}', '${choice.checklistTip}')`;
    let sqlSelect = `SELECT * FROM user_checklist`;
    let shouldInsert = true;
    dbConnection.query(sqlSelect, (err, result) => {
      if(err) throw err;
      result.forEach ((row) => {
        if( row.userID === data.userID && row.choiceID === row.choiceID) {
          shouldInsert = false;
        }
      });
      if (shouldInsert) {
        dbConnection.query(sql, (err, result) => {
          if(err) throw err;
          // console.log(result);
          // res.send(result);
          // values = values.slice(0, -3);
        });
      }
    });
  });

  let valuesStr = values.join(', ');
  sql = `SELECT * FROM quiz_data WHERE choiceID IN (${valuesStr})`;
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

// Get user checklist from database
app.get(APIPrefix + '/userchecklist', (req, res) => {
  let sql = 'SELECT * FROM user_checklist';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

// Get checklist steps from database
app.get(APIPrefix + '/checkliststeps', (req, res) => {
  let sql = 'SELECT * FROM checklist_steps';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});





app.listen(port, ()=>{
  console.log("listening to port: " + port)
})

