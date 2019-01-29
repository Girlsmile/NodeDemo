
const Koa = require('koa')
const app = new Koa()
//var orm = require('orm')

//next是koa传入的将要处理的下一个异步函数。
//上面的异步函数中，我们首先用
//处理下一个异步函数，然后，设置response的Content-Type和内容。
// app.use(async (ctx, next) => {
//  await next()
//  ctx.response.type = 'text/html'
//  ctx.response.body = '<h1>Hello, koa2!</h1>'

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
orm.connect("mysql://root:12345678@localhost/Record", function (err, db) {
    console.log(err)
    // if (err) throw err;

    // db.use(fts);

    // var Person = db.define("Person", {
    //     name      : String,
    //     surname   : String,
    //     age       : Number
    // });

    // Person.match("name").against("john").limit(10).run(function (err, people) {
    //     // .against() returns a ChainFind, you can use .limit() , .where() ..
    //     // (by default it orders by best match)
    // });
});
