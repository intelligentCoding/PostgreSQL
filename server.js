const express = require("express");
const app = express();
const Sequelize = require("Sequelize");
//We will be using handlebars so we are requiring the handle bars.
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

const HTTP_PORT = process.env.PORT || 8080;

//We call this function when we start our server

function onHttpStart() {
  console.log("Express http server listening on : " + HTTP_PORT);
}
//Instruct the app to use body-parsers middleware.
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

//              Establishing the connection
//                  and authenticating it.
/*========================================================================*/
//Now we will establish a connection and set up sequelize to point to our postgreSQL.

const database = "daqippamshkj3i";
const userName = "zgufxaqmixziao";
const password =
  "4602da84b12a8b06a904295b13004c7002f1c4545ffd80bd6b3fcb75e998378b";
const seq = new Sequelize(database, userName, password, {
  host: "ec2-23-21-192-179.compute-1.amazonaws.com",
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

//Now we will make sure that our connection is working.
seq
  .authenticate()
  .then(function() {
    console.log("We have established the connection");
  })
  .catch(function(err) {
    console.log(
      "We have failed to establish the connection with following error"
    );
    console.log(err);
  });
/*========================================================================*/

//                  We will now create the model
//                  (table) or as we say Define
//                        a Model "Employee"
/*========================================================================*/
const Employee = seq.define("Employee", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  city: Sequelize.STRING
});
/*========================================================================*/

// /*========================================================================*/
// //        synchronize the Database with our
// //        models and automatically add(insert) row to the model, if doesn't exist.
// seq.sync().then(function() {
//   // adding (insert) a "row to the model (table)"
//   Employee.create({
//     firstName: "Kashif",
//     lastName: "Mahmood",
//     city: "Karachi"
//   })
//     .then(function(newEmployee) {
//       // you can now access the newly created Project via the variable newEmployee
//       console.log("*******************success!*******************");
//     })
//     .catch(function(error) {
//       console.log("************something went wrong!*******************");
//     });
// });
// /*========================================================================*/

/*========================================================================*/
//                  Our get route will take all
//                   the data from the database
//                      and shows on webpage.
app.get("/", (req, res) => {
  console.log("IN get route / ");
  Employee.findAll({
    //We will order it by id, we can use any column in the model.
    order: ["id"]
  }).then(inComingData => {
    console.log("We accessed the Model");
    res.render("table", { data: inComingData });
  });
  // res.send("WEll Hello");
});
/*========================================================================*/

/*========================================================================*/
//                 Now we will make our post route which
//                       will update our Employee
app.post("/employeeUpdate", (req, res) => {
  if (req.body.delete) {
    Employee.destroy({
      where: { id: req.body.id }
    }).then(() => {
      console.log("remove ok");
      res.redirect("/");
    });
  } else {
    //if someone updates with empty name, we should not update it.
    if (
      req.body.firstName.trim().length != 0 &&
      req.body.firstName.trim().length != 0
    ) {
      Employee.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          city: req.body.city
        },
        /*WE can add conditions here*/ {
          where: { id: req.body.id }
        }
      )
        .then(function() {
          res.redirect("/");
        })
        .catch(function(reason) {
          res.render("table", { message: "We couldn't update" });
        });
    } else {
      res.redirect("/");
    }
  }
});

/*========================================================================*/
//                 Now we will make our post route which
//                       will Delete our Employee
app.post("/createEmployee", (req, res) => {
  if (
    req.body.firstName.trim().length != 0 &&
    req.body.firstName.trim().length != 0
  ) {
    Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      city: req.body.city
    }).then(function() {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

seq.sync().then(() => {
  app.listen(HTTP_PORT, onHttpStart);
});
