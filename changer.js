
const Koa = require('koa')
const app = new Koa()
//var orm = require('orm')

//next是koa传入的将要处理的下一个异步函数。
//上面的异步函数中，我们首先用
//处理下一个异步函数，然后，设置response的Content-Type和内容。
// app.use(async (ctx, next) => {
// 	await next()
// 	ctx.response.type = 'text/html'
// 	ctx.response.body = '<h1>Hello, koa2!</h1>'

// });
// app.listen(3002)
// console.log("server running on port 3000")


var orm = require("orm");
var fts = require("orm-mysql-fts");

// var opts = {  
//     database: "yourdb",  
//     protocol: "mysql",  
//     host: "127.0.0.1",  
//     username: "root",  
//     password: "root",  
//     query: {  
//         pool: true,  
//     },  
// };  

//orm.connect("mysql://username:password@host/database",
// let password = '123458'
//  console.log(password)
// orm.connect("mysql://root:87654321@localhost/Record", function (err, db) {
//     console.log(password)
// 	//console.log(err)
//     console.log(password)

//     // if (err) throw err;

//     db.use(fts);

//     var Person = db.define("Person", {
//         name      : String,
//         surname   : String,
//         age       : Number
//     });

//     // Person.match("name").against("john").limit(10).run(function (err, people) {
//     //     // .against() returns a ChainFind, you can use .limit() , .where() ..
//     //     // (by default it orders by best match)
//     // });
// });

orm.connect("mysql://root:87654321@localhost/Record", function (err, db) {
  if (err) throw err;

  var Person = db.define("person", {
    name      : String,
    surname   : String,
    age       : Number, // FLOAT
    male      : Boolean,
    continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antarctica" ], // ENUM type
    photo     : Buffer, // BLOB/BINARY
    data      : Object // JSON encoded
  }, {
    methods: {
      fullName: function () {
        return this.name + ' ' + this.surname;
      }
    },
    validations: {
      age: orm.enforce.ranges.number(18, undefined, "under-age")
    }
  });

  // add the table to the database
  db.sync(function(err) {
    if (err) throw err;

    // add a row to the person table
    Person.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
      if (err) throw err;

      // query the person table by surname
      Person.find({ surname: "Doe" }, function (err, people) {
        // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
        if (err) throw err;

        console.log("People found: %d", people.length);
        console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

        people[0].age = 16;
        people[0].save(function (err) {
          // err.msg == "under-age";
        });
      });
    });
  });
});
