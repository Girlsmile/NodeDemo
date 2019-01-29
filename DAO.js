
var orm = require("orm");
var fts = require("orm-mysql-fts");
orm.connect("mysql://root:87654321@localhost/Record", function (err, db) {
    console.log(password)
	//console.log(err)
    console.log(password)

    // if (err) throw err;

    db.use(fts);

    var Person = db.define("Person", {
        name      : String,
        surname   : String,
        age       : Number
    });

    // Person.match("name").against("john").limit(10).run(function (err, people) {
    //     // .against() returns a ChainFind, you can use .limit() , .where() ..
    //     // (by default it orders by best match)
    // });
});
