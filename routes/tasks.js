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
      


    if(req.body&&req.body.name && req.body.description && req.body.dueDate){
        req.body.id=generarId();
        tasks.push(req.body);
        res.json(tasks);

    }else{
        res.status(400).json({})
} 
})

    router.delete("/removeTask/:id", function(req,res,next){
        if(req.params && req.params.id){
            let id = parseInt(req.params.id)
            tasks = tasks.filter(task=>task.id!==id)
            res.json(tasks)
        }else{
            res.status(400).json({})       
     }

    })

 module.exports = router;