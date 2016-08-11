var asserts = require('assert');
var db = require('./db.js');
//require("must/register");
var sqlite3 = require('sqlite3');
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

// create test.db if it doesn't exist

describe('Db module', () => {
    var conn = new TransactionDatabase(
        new sqlite3.Database("test.db", 
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
        )
    );
    after(() => {
        conn.close();
    });
    
    // configure conn

    it('given team name, return all channel names of that team', () => {
        conn.beginTransaction(function(err, conn) {
            try {
                var teamName = 'Yankees';
                var expected = ['Orange', 'Blue', 'Red'];
                var actual = db.getChannels(tconn, teamName);
                assert(actual, expected);
            } finally {
                conn.rollback();
            }
        });
    });
});



// describe('Db module', () => {
//     var conn = db.getConnection('test.db');
//     before(() => {
//         //conn.transact();
//         console.log("BEFORE TEST");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });

//         conn.exec("BEGIN");
//     });
//     after(() => {
//         //conn.transaction.rollback();
//         console.log("DURING TEST");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });

//         conn.exec("ROLLBACK");
//         console.log("AFTER TEST & ROLLBACK");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });
//     });

//     it('given team name, return all channel names of that team', () => {

//         var teamName = 'Yankees';
//         var expected = ['Orange', 'Blue', 'Red', 'White'];
//         var actual = db.getChannels(conn, teamName);
//         asserts(actual, expected);
//         //actual.must.eql(expected);
//     });
// });
