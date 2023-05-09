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


//POST "/movies/create"=> envia los datos del formularo a la ruta para crear la pelicula y guardarla en la DB

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
// GET "/movies/:id	"=> renderiza un formulario de edit (con los valores actuates del libro)
router.get("/:id", (req, res, next)=>{
    Movie.findById(req.params.id)
    .populate("cast")
    .then((moviesDetails)=>{
        console.log(moviesDetails)
        res.render("movies/movie-details", {
            moviesDetails: moviesDetails
        })
    })
    .catch((err)=>{
        next(err)
    })
})
//POST "/movies/:id/delete"=> borrar una movie
router.post("/:Id/delete", (req, res, next) => {

    console.log(req.params)
    Book.findByIdAndDelete(req.params.bookId)
    .then((response) => {
      res.redirect("/book")
    })
    .catch((error) => {
      next(error)
    })
  
  })
module.exports = router