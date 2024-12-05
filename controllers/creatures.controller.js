const Creature = require("../models/Creature.model");
const mongoose = require("mongoose");

// The creature directory: where you can see all the pokemons
module.exports.list = (req, res, next) => {
  Creature.find()
    .then((creatures) => {
      res.render("creatures/list", { creatures }); // Render a view with all creatures
    })
    .catch((err) => next(err)); // Handle errors gracefully ;)
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params;
  Creature.findById(id)
    .then((creature) => {
      res.render("creatures/details", { creature }); //show the deatils of this creature
    })
    .catch((err) => next(err));
};
