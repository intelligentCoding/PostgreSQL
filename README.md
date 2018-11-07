# PostgreSQL"

#Things to Install</br>
**npm install express**</br>
**npm install body-parser**</br>

To handle HTTP POST request in Express.js version 4 and above, you need to install middleware module called body-parser.</br>
body-parser extract the entire body portion of an incoming request stream and exposes it on req.body.</br>
The middleware was a part of Express.js earlier but now you have to install it separately.</br>
This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request. Install body-parser using NPM as shown below.
</br>
</br>
**npm install --save express-handlebars**

##Sequelize
Like all modules in node.js, we will have to use **Node Package Manager (npm)** to acquire the module from the online package collection. With your application folder open in Visual Studio Code, open the integrated terminal and enter the command

**npm install sequelize --save**
followed by the command: 

**npm install pg pg-hstore --save**
This will add both the sequelize and the pg / pg-hstore modules to our node_modules folder, as well as add their names & version numbers to our package.json file under "dependencies".
