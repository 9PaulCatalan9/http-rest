var express = require("express");
var router =  express.Router();
var mysql = require ("mysql2");

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
  
    let goals=[];

//Creara ruta. GET
router.get("/getGoals", function(req,res,next){
    let queryGetMetas = 'SELECT * FROM metas';
    connection.query(queryGetMetas,function(err, results, filds){
        if(err){
            console.log(err);
          res.status(500).json(err);
        }else{
            console.log(results);
          res.status(200).json(results);
        }
      })

})

//Para crear metas
router.post("/addGoal",function(req,res,next){



    if(req.body&&req.body.nombre && req.body.descripcion && req.body.fechaEntrega){
        let queryCreateMeta = 'INSERT INTO metas (nombre,descripcion,fechaEntrega) \
        VALUES("'+req.body.nombre+'","'+req.body.descripcion+'","'+req.body.fechaEntrega+'")';
        connection.query(queryCreateMeta,function(err, results, filds){
            if(err){
                console.log(err);
              res.status(500).json(err);
            }else{
                console.log(results);
              res.status(200).json(results);
            }
          })
    } 
})



//Para eliminar metas
 router.delete("/removeGoal/:id",function(req,res,next){

    if(req.params && req.params.id){
        let id = parseInt(req.params.id)
        let queryDeleteMetas = 'DELETE FROM metas WHERE id="'+id+'"';
        connection.query(queryDeleteMetas,function(err, results, filds){
            if(err){
                console.log(err);
              res.status(500).json(err);
            }else{
              res.status(200).json(results);
            }
          })
    }else{
        console.log(results);
        res.status(400).json({})
    }
})

module.exports = router;