const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast:[
        {
            type: mongoose.Schema.Types.ObjectId,
            Ref: "Celebrities"
        }
    ]
})
const Movie = mongoose.model("Movie", movieSchema);
module.exports= Movie