const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
const celebritiesRouter = require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRouter)

const movieRouter = require("./movies.routes.js")
router.use("/movies", movieRouter)

module.exports = router;
