const mongoose = require('mongoose');
const MongooseErrors = require('mongoose-errors');


//Modèle des informations requise pour ajouter une sauce à la bdd
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String] },
  usersDisliked:{ type: [String] }
});

sauceSchema.plugin(MongooseErrors);


module.exports = mongoose.model('Sauce', sauceSchema);