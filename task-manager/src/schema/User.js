const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("Age inférieur à 0");
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email non valide");
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 7,
    validate(value) {
      console.log("Valeur", value);
      if (value.includes("password"))
        throw new Error("Mot de passe non valide");
    },
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
