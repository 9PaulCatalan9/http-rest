var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var cors = require("cors")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks')
var usersGoals = require('./routes/goals')
const mysql = require('mysql')
var connection = mysql.createConnection({
  host:"localhost",
  user:"root",
  database:"todolistdb"
});

connection.connect(function(err){
  if(err){
    console.err("error connecting "+err.stack);
    return;
  }
  console.log("Connected as id "+ connection.threadId);
})

let queryCreateBd = 'CREATE DATABASE IF NOT EXISTS todolistdb'
let queryCreateTableMetas = 'CREATE TABLE IF NOT EXISTS `metas` ( \
  `id` int(11) NOT NULL auto_increment, \   \
  `nombre` varchar(250) NOT NULL default \'\', \
  `descripcion` varchar(250) NOT NULL default \'\', \
  `fechaEntrega` varchar(250) NOT NULL default \'\', \
  PRIMARY KEY (`id`) \
);'
let queryCreateTableTareas = 'CREATE TABLE IF NOT EXISTS `tareas` ( \
  `id` int(11) NOT NULL auto_increment, \   \
  `nombre` varchar(250) NOT NULL default \'\', \
  `descripcion` varchar(250) NOT NULL default \'\', \
  `fechaEntrega` varchar(250) NOT NULL default \'\', \
  PRIMARY KEY (`id`) \
);'

connection.query(queryCreateBd,function(err, results, filds){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})
connection.query(queryCreateTableMetas,function(err, results, filds){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})
connection.query(queryCreateTableTareas,function(err, results, filds){
  if(err){
    console.log(err);
    return;
  }else{
    console.log(results);
  }
})

connection.destroy();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());// se pueden hacer peticiones unicamente desde algunos sitios frontend
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.use((req,res,next)=>{
  if(req.headers.authorization && req.headers.authorization==="9MyAPIkey9"){
    next();
  }else{
    res.status(401).json({"err":'No se encontro autorizacion!!!'})
  }

})

app.use('/',router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks',usersTasks);
app.use('/goals',usersGoals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
