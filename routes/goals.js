var express = require("express");
var router =  express.Router();

    let goals=[];

//Creara ruta. GET
router.get("/getGoals", function(req,res,next){
        res.json(goals)
})

//Para crear metas
router.post("/addGoal",function(req,res,next){

    //let timesTamp=Date.now() + Math.random();
    const generarId = () => {
        const min = 1000;
        const max = 9999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };


    if(req.body&&req.body.nombre && req.body.descripcion && req.body.fechaEntrega){
        req.body.id=generarId();
        goals.push(req.body)
        res.status(200).json(goals)
    }else{
        res.status(400).json({error:"No se estan enviando los parametros..."})
    }  
})



//Para eliminar metas
 router.delete("/removeGoal/:id",function(req,res,next){

    if(req.params && req.params.id){
        let id = parseInt(req.params.id)
        goals=goals.filter(goal=>goal.id!==id)
        res.status(200).json(goals)
    }else{
        res.status(400).json({})
    }
})

module.exports = router;