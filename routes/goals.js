var express = require("express");
var router =  express.Router();

    let goals=[];

//Creara ruta. GET
router.get("/getGoals", function(req,res,next){
        res.json(goals)
})

//Para crear metas
router.post("/addGoal",function(req,res,next){

    let timesTamp=Date.now() + Math.random();

    if(req.body&&req.body.name && req.body.description && req.body.dueDate){
        req.body.id=timesTamp.toString();
        goals.push(req.body)
    }
        res.json(goals)
})


//Para eliminar metas
 router.delete("/removeGoal/:id",function(req,res,next){

    if(req.params && req.params.id){
        let id=req.params.id;
        goals=goals.filter(goal=>goal.id!==id)
        res.json(goals)
    }else{
        res.json([{}])
    }
})

module.exports = router;