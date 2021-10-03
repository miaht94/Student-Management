var express = require('express');
var app = express();
var router = express.Router();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const authRouter = require('./routers/auth');
const registerRouter = require('./routers/register');
const DBConnection = require('./module/DBModule/DBConnection');
(async () => {
  app.use((req, res, next) => {
    console.log(`New request \n\tTYPE: ${req.method} \n\tParam: ${JSON.stringify(req.params)} \n\tBody: ${JSON.stringify(req.body)}`)
    next();
  })
  app.use(authRouter);
  app.use(registerRouter);
  await DBConnection.Init();
  var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)
  });
})()