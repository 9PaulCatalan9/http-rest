var express = require ("express");
var router = express.Router();

let tasks = [];

//Crear ruta: GET
 router.get("/getTasks",function(req,res,next){ 
    res.json(tasks)
 })

//Para crear tareas
 router.post("/addTask",function(req,res,next){
   
    //let timesTamp = Date.now() + Math.random();
    const generarId = () => {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      

    if(req.body&&req.body.nombre && req.body.descripcion && req.body.fechaEntrega){
        req.body.id=generarId();
        tasks.push(req.body);
        res.status(200).json(tasks);
    }else{
        res.status(400).json({error:"No se estan enviando los parametros..."})
} 
})


 router.delete("/removeTask/:id", function(req,res,next){
       
    if(req.params && req.params.id){
            let id = parseInt(req.params.id)
            tasks = tasks.filter(task=>task.id!==id)
            res.status(200).json(tasks)
        }else{
            res.status(400).json({})       
     }

    })

 module.exports = router;