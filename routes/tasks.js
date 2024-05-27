var express = require ("express");
var router = express.Router();
var mysql = require("mysql2");

var connection = mysql.createConnection({
   host:"localhost",
   user:"root",
   database:"todolistdb",
   password:"galileo",
   port:"3307"
 });
 connection.connect(function(err){
   if(err){
     console.error("error connecting "+err.stack);
     return;
   }
   console.log("Connected as id "+ connection.threadId);
 })


let tasks = [];

//Crear ruta: GET
 router.get("/getTasks",function(req,res,next){ 
   let queryGetTareas = 'SELECT * FROM tareas';
   connection.query(queryGetTareas,function(err, results, filds){
      if(err){
        res.status(500).json(err);
      }else{
        res.status(200).json(results);
      }
    })
 })

//Para crear tareas
 router.post("/addTask",function(req,res,next){
   

   if(req.body&&req.body.nombre && req.body.descripcion && req.body.fechaEntrega){
      let queryCreateTarea = 'INSERT INTO tareas (nombre,descripcion,fechaEntrega) \
      VALUES("'+req.body.nombre+'","'+req.body.descripcion+'","'+req.body.fechaEntrega+'")';
      connection.query(queryCreateTarea,function(err, results, filds){
          if(err){
            res.status(500).json(err);
          }else{
            res.status(200).json(results);
          }
        })
  } 
})


 router.delete("/removeTask/:id", function(req,res,next){
       
   if(req.params && req.params.id){
      let id = parseInt(req.params.id)
      let queryDeleteTarea = 'DELETE FROM tareas WHERE id="'+id+'"';
      connection.query(queryDeleteTarea,function(err, results, filds){
          if(err){
            res.status(500).json(err);
          }else{
            res.status(200).json(results);
          }
        })
  }else{
      res.status(400).json({})
  }

    })

 module.exports = router;