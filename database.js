//log help message is user type[es server.js

var argv = require('minimist')(process.argv.slice(2));

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

//ensures no failures
"use strict";

const Database = require('better-sqlite3');
const db = new Database('log.db');
const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='logdata1';`
    );
let row = stmt.get();
if (row == undefined) {
    const sqlInit = `
        CREATE TABLE logdata1 ( 
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status INTEGER,
            referer TEXT,
            useragent TEXT
            );
    `;
    // Execute SQL commands that we just wrote above.
    db.exec(sqlInit);
    // Echo information a
}
//export all of the above as a module so that we can use it elsewhere

module.exports = db

//use db.exect('COMMAND') to execute sql commands

