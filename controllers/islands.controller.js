const mongoose = require("mongoose");
const Island = require("../models/Island.model");
const Creature = require("../models/Creature.model");

module.exports.renderMainIsland = (req, res, next) => {
  Island.findOne({ guardian: req.currentUser.id })
    .then((island) => {
      res.render("island/main", { island });
    })
    .catch((error) => {
      res;
      next(error);
    });
};

module.exports.formCreate = (req, res, next) => {
  res.render("island/form");
};
module.exports.doFormCreate = (req, res, next) => {
  req.body.guardian = req.currentUser.id;

  Island.create(req.body)
    .then(res.redirect("/my-island"))
    .catch((error) => {
      console.log("Error details:", error.message, error.errors);

      const values = { ...req.body };

      if (error instanceof mongoose.Error.ValidationError) {
        res.render("island/form", {
          errors: error.errors,
          values,
        });
      } else if (error.code && error.code === 11000) {
        const errors = {};

        if (error.keyValue.name) {
          errors.email = "Ya existe un usuario con este nombre";
        }
        res.render("island/form", { errors, values });
      } else {
        next(error);
      }
    });
};

module.exports.myIsland = (req, res, next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island) => {
      console.log("Island creatures-->:", island.creatures);
      const creaturesPromisesArray = island.creatures.map((creatureId) =>
        Creature.findById(creatureId)
      );

      Promise.all(creaturesPromisesArray)
        .then((creaturesArray) => {
          console.log("**Island creature IN ARRAY-->:", creaturesArray);
          res.render("island/my-island", { island, creatures: creaturesArray });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.editMyIsland = (req, res, next) => {
  Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island) => {
      res.render("island/edit-my-island", { island });

    })
    .catch((error) => {
      next(error);
    });

};

module.exports.doEditMyIsland = (req, res , next) => {
  Island.findOneAndUpdate({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) },req.body)
    .then (()=>{
      res.redirect("/my-island")
    })
}
