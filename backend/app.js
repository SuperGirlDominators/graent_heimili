const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
// const jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
const firebaseAdmin = require('firebase-admin');
const app = express();
const port = 8080;
const APIPrefix = '/api';
const seacretPassword = 'pass12345678910';
const tokenCookieOptions = {
  // httpOnly: true,
  expires: 0,
  // secure: true
}

process.on ( 'uncaughtException', (err) => {
  console.log( err )
})


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
app.use(attachCsrfToken('/', 'csrfToken', (Math.random()* 100000000000000000).toString()));

const dbConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'heidrun_local',
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
  try {
    let sql = 'SELECT * FROM questions';
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
        return res.send(result); //always use return to send
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
});

// Get checklist from database
app.get(APIPrefix + '/checklist', (req, res) => {
  try {
    let sql = 'SELECT * FROM checklist';
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      return res.send(result);
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
});

// Get choices from database
app.get(APIPrefix + '/data', (req, res) => {
  try {
    let sql = 'SELECT * FROM quiz_data';
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      return res.send(result);
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
});

// send choices from database
app.post(APIPrefix + '/data', (req, res) => {
  try {
    // get the cookie from the req
    const token = req.cookies.green_home_token;
    if (token) {
      // idToken comes from the client app (shown above)
      firebaseAdmin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
          var uid = decodedToken.uid;
        }).catch(function(error) {
          return res.send(error);
        });
    } else {
      console.log("not found");
      return res.send("no token found");
    }
  // we ask fireadminn is the cookie ok?
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
});
/*
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
*/
/*
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
*/

/** Get profile endpoint. */
app.get('/profile', function (req, res) {
  // Get session cookie.
  var sessionCookie = req.cookies.session || '';
  // Get the session cookie and verify it. In this case, we are verifying if the
  // Firebase session was revoked, user deleted/disabled, etc.
  admin.auth().verifySessionCookie(sessionCookie, true /** check if revoked. */)
    .then(function(decodedClaims) {
      // Serve content for signed in user.
      // return serveContentForUser('/profile', req, res, decodedClaims);
    }).catch(function(error) {
      // Force user to login.
      // res.redirect('/');
    });
});

/** Session login endpoint. */
app.post('/sessionLogin', function (req, res) {
  // Get ID token and CSRF token.
  var idToken = req.body.idToken.toString();
  var csrfToken = req.body.csrfToken.toString();
  
  // Guard against CSRF attacks.
  if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
    return;
  }
  // Set session expiration to 5 days.
  var expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // We could also choose to enforce that the ID token auth_time is recent.
  admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
    // In this case, we are enforcing that the user signed in in the last 5 minutes.
    if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
      return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
    }
    throw new Error('UNAUTHORIZED REQUEST!');
  })
  .then(function(sessionCookie) {
    // Note httpOnly cookie will not be accessible from javascript.
    // secure flag should be set to true in production.
    var options = {maxAge: expiresIn, httpOnly: true, secure: false /** to test in localhost */};
    res.cookie('session', sessionCookie, options);
    res.end(JSON.stringify({status: 'success'}));
  })
  .catch(function(error) {
    res.status(401).send('UNAUTHORIZED REQUEST!');
  });
});

/** User signout endpoint. */
app.get('/logout', function (req, res) {
  // Clear cookie.
  var sessionCookie = req.cookies.session || '';
  res.clearCookie('session');
  // Revoke session too. Note this will revoke all user sessions.
  if (sessionCookie) {
    admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
      return admin.auth().revokeRefreshTokens(decodedClaims.sub);
    })
    .then(function() {
      // Redirect to login page on success.
      res.redirect('/');
    })
    .catch(function() {
      // Redirect to login page on error.
      res.redirect('/');
    });
  } else {
    // Redirect to login page when no session cookie available.
    res.redirect('/');
  }
});

// create a new user in the database and return a access token cookie
/*
<<<<<<< Updated upstream
app.post(APIPrefix + '/adduser', (req, res) => {
  try {
    // finding the user
    getFirebaseUser(req.body.user.uid, (error, userData) => {
      // if no user found create it ?
      if(error) {
        createFirebaseUser(req.body.user,(error, userRecord) => {
          if (error) {
            return res.send(error);
          } else {
            createCustomToken(req.body.user.uid, (error, token) => {
              if (error) {
                return res.send(error);
              } else {
                res.cookie('green_home_token', token, tokenCookieOptions);
                return res.send("token returned! yey!");
              }
            });
          }
        });
      } else {
        res.cookie('green_home_token', req.body.realToken, tokenCookieOptions);
        // res.send("token returned! yey!");
        storeUserInDatabase(req.body.user.uid, req.body.user.displayName, req.body.user.photoURL, res );
      }
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
=======*/
/*app.post(APIPrefix + '/adduser', (req, res) => {
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
      /*res.cookie('green_home_token', req.body.realToken, tokenCookieOptions);
      // res.send("token returned! yey!");
      storeUserInDatabase(req.body.user.uid, req.body.user.displayName, req.body.user.photoURL, res );
    }
  });
>>>>>>> Stashed changes
});
*/
function storeUserInDatabase(userId, username, picture, res) {
  let sql = `INSERT INTO user_info (userID, username, userImage) VALUES ('${userId}', '${username}', '${picture}')`;
  dbConnection.query(sql, (err, result) => {
    if(err) console.log( err );
    return res.send(result);
  });
}


// Post choices from database
app.post(APIPrefix + '/userchoices', (req, res) => {
  try {
    const data = req.body;
    let values = [];
    req.body.unSelectedChoices.map((choice)=>{
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
          });
        }
      });
    });

    let valuesStr = values.join(', ');
    sql = `SELECT * FROM quiz_data WHERE choiceID IN (${valuesStr})`;
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      return res.send(result);
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
  
});

// Get user checklist from database
app.get(APIPrefix + '/userchecklist', (req, res) => {
  try {
    let sql = 'SELECT * FROM user_checklist';
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      return res.send(result);
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  }
});

// Get checklist steps from database
app.get(APIPrefix + '/checkliststeps', (req, res) => {
  try {
    let sql = 'SELECT * FROM checklist_steps';
    dbConnection.query(sql, (err, result) => {
      if(err) throw err;
      return res.send(result);
    });
  } catch(error) {
      return res.send('sorry, something went wrong')
  } 
});


app.listen(port, ()=>{
  console.log("listening to port: " + port)
})
