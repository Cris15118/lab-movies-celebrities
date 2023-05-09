const express = require('express');
const router = express.Router();
const Celebrity = require("../models/Celebrity.model.js")
const Movie = require("../models/Movie.model.js")
// GET "/celebrities/create	" => renderiza un formulario para crear la celebrity

router.get("/create", (req, res, next)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("celebrities/new-celebrity.hbs",{ 
            allCelebrities: allCelebrities
        })
    })
    .catch((err)=>{
        next(err)
    })
})


//POST "/celebrities/create"=> envía los datos del formulario a la ruta para crear la celebrity y la guarda en la DB
router.post("/create", (req, res, next)=>{
    console.log(req.body)
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then(()=>{
        res.redirect("/celebrities")
    })
    .catch((err)=>{
        next(err)
    })
})

// GET "/celebrities"=> renderiza y muestra las celebrities
router.get("/", (req, res, next)=>{
Celebrity.find()
.then((allCelebrities)=>{

    res.render("celebrities/celebrities.hbs",{
        allCelebrities: allCelebrities
    })
})
.catch((err)=>{
    next(err)
})
})








module.exports = router