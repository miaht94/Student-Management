var express = require('express');
var app = express();
var cookieParser = require('cookie-parser')
var router = express.Router();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const registerRouter = require('./routers/register');
const DBConnection = require('./module/DBModule/DBConnection');
app.use((req, res, next) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(`New request \n\tTYPE: ${req.method} \n\t URL: ${fullUrl} \n\tParam: ${JSON.stringify(req.params)} \n\tBody: ${JSON.stringify(req.body)} \n\tCookies: ${JSON.stringify(req.cookies)}`)
  next();
})
app.use(userRouter);
app.use(authRouter);
app.use(registerRouter);
(async () => {
  await DBConnection.Init();
  var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)
  });
})()