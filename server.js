const express = require("express");
const app = express();
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

app.get("/", (req, res) => {
  res.send("Well Hello");
});
app.listen(HTTP_PORT, onHttpStart);
