const express = require('express');
const router = express.Router();
const Movie = require("../models/Movie.model.js");
const Celebrity = require('../models/Celebrity.model.js');

//GET "/movies/create"=> renderiza la info del formulario de crear pelicula
router.get("/create", (req, res, next)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("movies/new-movies.hbs",{ 
          allCelebrities: allCelebrities
        })
    })
    .catch((err)=>{
        next(err)
    })
})


//POST "/movies/create"=> envia los datos del formulario a la ruta para crear la pelicula y la guarda en la DB

router.post("/create", (req, res, next)=>{
    console.log(req.body)
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })
})
// GET "/movies"=> renderiza y muestra las movies
router.get("/", (req, res, next)=>{
    Movie.find()
    .then((allMovies)=>{
    
        res.render("movies/movies.hbs",{
            allMovies: allMovies
        })
    })
    .catch((err)=>{
        next(err)
    })
    })
// GET "/movies/:id	"=> renderiza un los detalles de movie
router.get("/:id/details", (req, res, next)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((moviesDetails)=>{
        console.log(moviesDetails)
        res.render("movies/movie-details.hbs", {
            moviesDetails: moviesDetails
        })
    })
    .catch((err)=>{
        next(err)
    })
})
//GET "/movies/:id"=> renderiza un formulario
router.get("/:id/edit", (req, res, next)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((moviesDetails)=>{
        res.render("movie/edit-movie.hbs", {
            moviesDetails: moviesDetails
        })
    })
    .catch((err)=>{
        next(err)
    })
})

// POST "/movies/:id" => recibe la info a editar del libro y lo actualizará eb ka DB
router.post("/:id/edit", (req, res, next)=>{
    Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    .then(()=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        next(err)
    })
})
//POST "/movies/:id/delete"=> borrar una movie
router.post("/:id/delete", (req, res, next) => {

    console.log(req.params)
    Book.findByIdAndDelete(req.params.id)
    .then((response) => {
      res.redirect("/movies")
    })
    .catch((err) => {
      next(err)
    })
  
  })
module.exports = router