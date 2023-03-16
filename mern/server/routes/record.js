const express = require("express");
const jwt = require('jsonwebtoken');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Verification //

// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(' ')[1];
//   jwt.verify(token, 'mysecret', function(err, decoded) {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }

//     req.userId = decoded.id;
//     next();
//   });
// }





// This section will help you get a list of all the records.
// recordRoutes.route("/record").get(function (req, res) {
//   let db_connect = dbo.getDb("employees");
//   db_connect
//     .collection("records")
//     .find({})
//     .toArray(function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
// });

recordRoutes.route('/record').get( function(req, res) {
  let db_connect = dbo.getDb('employees');
  db_connect.collection('records').find({}).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});


// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Region: req.body.Region,
    Rating: req.body.Rating,
    Fee: req.body.Fee,
    Sale: req.body.Sale,

  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post( function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Region: req.body.Region,
    Rating: req.body.Rating,
    Fee: req.body.Fee,
    Sale: req.body.Sale,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


// Login
recordRoutes.route("/login").post(async function (req, res) {
  let db_connect = dbo.getDb();
  const { email, password } = req.body;
  const user = await db_connect.collection("users").findOne({ "email": email });
  
  if (!user) {
  return res.status(400).json({ message: "Invalid email or password" });
  }
  
  if (password !== user.password) {
  return res.status(400).json({ message: "Invalid email or password" });
  }
  
  res.json(true);
  });
  


  // recordRoutes.route('/login').post(async function(req, res) {
  //   let db_connect = dbo.getDb();
  //   const { email, password } = req.body;
  //   const user = await db_connect.collection('users').findOne({ email: email });
  
  //   if (!user || password !== user.password) {
  //     return res.status(401).json({ message: 'Invalid email or password' });
  //   }
  
  //   const token = jwt.sign({ id: user._id }, 'mysecret', { expiresIn: '1h' });
  //   res.json({ token: token });
  // });


// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});


// This section will help you create a new user.
recordRoutes.route("/users/add").post( function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    
  };
  db_connect.collection("users").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});


module.exports = recordRoutes;
