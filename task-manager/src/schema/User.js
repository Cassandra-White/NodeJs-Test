const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

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
    unique:true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error("Email non valide");
    },
  },
  password: {
    type: String,
    required: true,
    // trim: true,
    minlength: 7,
    validate(value) {
    //   console.log("Valeur", value);
      if (value.toLowerCase().includes("password"))
        throw new Error("Mot de passe non valide");
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({email});
    
    if(!user)
        throw new Error('Mauvais login ou mot de passe');

    const isMatch = await bcrypt.compareSync(password, user.password);
    if(!isMatch)
        throw new Error('Mauvais login ou mot de passe');
    return user;

}


userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password'))
        user.password = await bcrypt.hashSync(user.password, 8); 
    next();
})




const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
