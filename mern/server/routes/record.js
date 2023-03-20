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


// records employees //
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


// Login //

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
  

// const payload = { id: 1234 }; // data you want to include in the token
// const secret = 'rocket'; // a secret key to sign the token
// const options = { expiresIn: '24h' }; // token expiration time

// const token = jwt.sign(payload, secret, options);

//   recordRoutes.route("/login").post(async function (req, res) {
//     let db_connect = dbo.getDb();
//     const { email, password } = req.body;
//     const user = await db_connect.collection("users").findOne({ "email": email });
    
//     if (!user) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
    
//     if (password !== user.password) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
    
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });
  
//     res.json({ token });
//   });

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




// Transaction routes //
recordRoutes.route('/transaction').get(function(req, res) {
  let db_connect = dbo.getDb('employees');
  db_connect.collection('transaction').find({}).sort({date: -1}).limit(10).toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});


// This section will help you create a new record.
recordRoutes.route("/transaction/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    
    agent_name: req.body.agent_name,
    transaction_number: req.body.transaction_number,
    sale: req.body.sale,
    date: new Date(),
    
  };
  db_connect.collection("transaction").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// validation //

recordRoutes.route("/validate_token", async (req, res) => {
  try {
    const sessionToken = req.query.token;
    const session = await db.collection("sessions").findOne({
      session_token: sessionToken,
      expiration_date: { $gt: new Date() },
    });
    if (session) {
      const user = await db.collection("users").findOne({ _id: session.user_id });
      if (user) {
        res.json({
          status: "ok",
          data: {
            valid: true,
            user: {
              first_name: user.first_name,
              last_name: user.last_name,
              id: user._id.toString(),
            },
            message: "Token is valid.",
          },
        });
      } else {
        res.json({
          status: "error",
          data: { valid: false, message: "Invalid token." },
        });
      }
    } else {
      res.json({
        status: "error",
        data: { valid: false, message: "Invalid token." },
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", data: { message: err.message } });
  }
});

console.log(process.env.JWT_SECRET);


module.exports = recordRoutes;

