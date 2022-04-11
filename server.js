//log help message is user type[es server.js

var argv = require('minimist')(process.argv.slice(2));
console.log(argv);

const help_message = "\n" +
"  --port	Set the port number for the server to listen on. Must be an integer\n" +
"            between 1 and 65535.\n" +
"\n" +
"--debug	If set to `true`, creates endlpoints /app/log/access/ which returns\n" +
"            a JSON access log from the database and /app/error which throws\n" +
'            an error with the message "Error test successful." Defaults to\n' +
"            `false`.\n" +
"\n" +
"--log		If set to false, no log files are written. Defaults to true.\n" +
"           Logs are always written to database.\n" +
"\n"
"--help	Return this message and exit.\n"

if (argv['help']) {
    console.log(help_message);
}

var express = require("express")
var app = express()

const db = require("/Users/raventaylor/COMP 426/a04-ravent61/database.js")
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Server port
var HTTP_PORT = 5000 
// Start server
const server = app.listen(HTTP_PORT, () => {
   console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

if (argv['debug']) {
    console.log('debug was true');
}