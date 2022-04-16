//log help message is user type[es server.js

var argv = require('minimist')(process.argv.slice(2));
//console.log(argv);

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

const db = require("./database.js")
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Server port
var HTTP_PORT = 5555 

// Start server
const server = app.listen(HTTP_PORT, () => {
   console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.use( (req, res, next) => {
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }
    //console.log(logdata.httpversion)
    const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    //res.status(200).json(info)
    next()
})
//create endpoints when --debug is true
if (argv['debug']) {

    app.get("/app/error", (req, res) => {
        throw new Error('BROKEN')
    })

    app.get ("/app/log/access", (req, res) => {
        const stmt = db.prepare("SELECT * FROM accesslog").all()
        res.status(200).json(stmt)
    })
} 
if (argv['log']) {
    // Use morgan for logging to files
    // Create a write stream to append (flags: 'a') to a file
    const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' })
    // Set up the access logging middleware
    app.use(morgan('combined', { stream: accessLogStream }))
}
