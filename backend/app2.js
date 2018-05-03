var express = require('express');
var cookieParser = require('cookie-parser')
var http = require('http');
var https = require('https');
var app = express();
var admin = require('firebase-admin');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const serviceAccount = require('./key/graent-heimili-firebase-adminsdk-cn78s-c7a801171f.json');
const serverPort = 3003;
const APIPrefix = '/api';
const cookieName = 'green_home_token';

/**
 * Attaches a CSRF token to the request.
 * @param {string} url The URL to check.
 * @param {string} cookie The CSRF token name.
 * @param {string} value The CSRF token value to save.
 * @return {function} The middleware function to run.
 */
function attachCsrfToken(url, cookie, value) {
  return function(req, res, next) {
    if (req.url == url) {
      res.cookie(cookie, value);
    }
    next();
  }
}

/**
 * Checks if a user is signed in and if so, redirects to profile page.
 * @param {string} url The URL to check if signed in.
 * @return {function} The middleware function to run.
 */
function checkIfSignedIn(url) {
  return function(req, res, next) {
    if (req.url == url) {
      var sessionCookie = req.cookies.session || '';
      // User already logged in. Redirect to profile page.
      admin.auth().verifySessionCookie(sessionCookie).then(function(decodedClaims) {
        res.redirect('/profile');
      }).catch(function(error) {
        next();
      });
    } else {
      next();
    }
  }
}

function storeUserInDatabase(userId, username, picture, cb) {
  let sql = `INSERT INTO user_info (userID, username, userImage) VALUES ('${userId}', '${username}', '${picture}')`;
  dbConnection.query(sql, (err, result) => {
    if (cb) 
      cb(err);
  });
}

function getUserFromDatabase(userId, cb) {
  let sql = `select userID, username, userImage from user_info where userID = '${userId}'`;
  dbConnection.query(sql, (err, result) => {
    if (cb) 
      cb(err, result);
  });
}

function handleUserRegistration(claims) {
  getUserFromDatabase(claims.sub, (err, res) => {
    if(err) throw err;
    if (res[0]) {
      return /* user found no need to carry on*/;
    } else {
      /* we register the new user */
      storeUserInDatabase(claims.sub, claims.name, claims.picture, (err, result) => {
        console.log('User Registered with id: ' + claims.sub);
      });
    }
  });
} 

const dbConnection = mysql.createConnection({
  // host     : 'kcpgm0ka8vudfq76.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
  // user     : 'qfsaae7nziqd5iub',
  // password : 'n7lrum0xc1ei1fzo',
  // port     : 3306,
  // database : 'rj5703edlgmbgefv'
  host     : 'localhost',
  user     : 'hrefna_local',
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

// Initialize Admin SDK.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://graent-heimili.firebaseio.com"
});

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control, postman-token, Access-Control-Allow-Origin");
  next();
})
// Support JSON-encoded bodies.
app.use(bodyParser.json());
// Support URL-encoded bodies.
app.use(bodyParser.urlencoded({
  extended: true
}));
// Support cookie manipulation.
app.use(cookieParser());
// Attach CSRF token on each request.
// app.use(attachCsrfToken('/', 'csrfToken', (Math.random()* 100000000000000000).toString()));

// TODO create auth checker middleware
// keep login infront of auth middleware

/** Get profile endpoint. */
app.get(APIPrefix + '/profile', (req, res) => {
  // Get session cookie.
  const sessionCookie = req.cookies[cookieName];
  if(!sessionCookie) {
    res.status(401).send("user not logged in");
  }
  // Get the session cookie and verify it. In this case, we are verifying if the
  // Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true /* check if revoked. */)
    .then((decodedClaims) => {
      // Serve content for signed in user.
      // return serveContentForUser('/profile', req, res, decodedClaims);
      res.send(decodedClaims);
    }).catch((error) => {
      res.status(500).send(error);
      // Force user to login.
      // res.redirect('/');
    });
});

/** Session login endpoint. */
app.post(APIPrefix + '/sessionLogin', function (req, res) {
  // Get ID token and CSRF token.
  const idToken = req.body.idToken.toString();
  // const image = req.body.idToken.toString();
  // var csrfToken = req.body.csrfToken.toString();
  
  // Guard against CSRF attacks.
  /* if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  } */
  // Set session expiration to 5 days.
  var expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // We could also choose to enforce that the ID token auth_time is recent.
  admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
    // In this case, we are enforcing that the user signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
      console.log(decodedClaims);
      handleUserRegistration(decodedClaims);
      return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
    }
    throw new Error('UNAUTHORIZED REQUEST!');
  })
  .then((sessionCookie) => {
    // Note httpOnly cookie will not be accessible from javascript.
    // secure flag should be set to true in production.
    var options = {maxAge: expiresIn, httpOnly: true, secure: false /** to test in localhost */};
    res.cookie(cookieName, sessionCookie, options);
    res.end(JSON.stringify({status: 'success'}));
  })
  .catch((error) => {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  });
});

/** User signout endpoint. */
app.get(APIPrefix + '/logout', function (req, res) {
  // Clear cookie.
  var sessionCookie = req.cookies[cookieName] || '';
  res.clearCookie(cookieName);
  // Revoke session too. Note this will revoke all user sessions.
  if (sessionCookie) {
    admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(function() {
      // Redirect to login page on success.
      // res.redirect('/');
      res.send('ok');
    })
    .catch(function(err) {
      // Redirect to login page on error.
      // res.redirect('/');
      res.status(500).send(err)
    });
  } else {
    // Redirect to login page when no session cookie available.
    // res.redirect('/');
    res.send('ok');
  }
});

/** User delete endpoint. */
app.get(APIPrefix + '/delete', function (req, res) {
  const sessionCookie = req.cookies[cookieName] || '';
  res.clearCookie(cookieName);
  if (sessionCookie) {
    // Verify user and then delete the user.
    admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
      return admin.auth().deleteUser(decodedClaims.sub);
    })
    .then(() => {
      // Redirect to login page on success.
      res.redirect('/');
    })
    .catch(() => {
      // Redirect to login page on error.
      res.redirect('/');
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/');
  }
});

// Get questions from database
app.get(APIPrefix + '/questions', (req, res) => {
  let sql = 'SELECT * FROM questions';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});

// Get question choices from database
app.get(APIPrefix + '/questionChoices', (req, res) => {
  let sql = 'SELECT * FROM quiz_data';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

// Post choices to database
app.post(APIPrefix + '/questionChoices', (req, res) => {
  // const data = res.body;
  const sessionCookie = req.cookies[cookieName];
  admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
    const values = [];
    req.body.unSelectedChoices.map((choice)=>{
      values.push(choice.choiceID);
      const sql = `INSERT INTO user_checklist (
                  userID, 
                  choiceID, 
                  choice, 
                  checklistID, 
                  checklistStep, 
                  checklistItem
                ) VALUES (
                  '${decodedClaims.sub}', 
                  '${choice.choiceID}', 
                  '${choice.choice}', 
                  '${choice.checklistID}', 
                  '${choice.checklistStep}', 
                  '${choice.checklistItem}'
                )`;
      const sqlSelect = `SELECT * FROM user_checklist`;
      let shouldInsert = true;
      dbConnection.query(sqlSelect, (err, result) => {
        if(err) throw err;
        result.forEach ((row) => {
          if( row.userID === decodedClaims.sub && row.choiceID === row.choiceID) {
            shouldInsert = false;
          }
        });
        if (shouldInsert) {
          dbConnection.query(sql, (err, result) => {
            if(err) 
              throw err;
          });
        }
      });
    });

    const valuesStr = values.join(', ');
    const sql = `SELECT * FROM quiz_data WHERE choiceID IN (${valuesStr})`;
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })
});

// Get checklist from database
app.get(APIPrefix + '/checklist', (req, res) => {
  let sql = 'SELECT * FROM checklist';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});

// Get user checklist from database
// what choices a user has made
app.get(APIPrefix + '/userchecklist', (req, res) => {
  let sql = 'SELECT * FROM user_checklist';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
    res.send(result);
  });
});

// Gets checklist steps from database
// stages of the checklist
app.get(APIPrefix + '/checkliststeps', (req, res) => {
  let sql = 'SELECT * FROM checklist_steps';
  dbConnection.query(sql, (err, result) => {
    if(err) throw err;
      res.send(result);
    });
});

// Start http server and listen to port.
app.listen(serverPort, () => {
  console.log('Green home app listening on port ' + serverPort)
})
