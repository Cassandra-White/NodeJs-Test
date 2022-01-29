const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const TaskModel = require('./Task');
const { sendEmailPasswordChange } = require('../email/account');

// require('dotenv').config()
const authToken = process.env.AUTH_TOKEN

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
  tokens: [{
    token: {
        type: String,
        required: true
    },
  }],
  avatar:{
    type: Buffer,
    
  }

},
  {   
    timestamps: true
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
});

userSchema.methods.generateTokenAuth = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id.toString()}, authToken); 
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
}

userSchema.methods.toJSON =  function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

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
    if(user.isModified('password')){
        user.password = await bcrypt.hashSync(user.password, 8);
        sendEmailPasswordChange(user.email, user.name);
      } 
    next();
})

//Supprimer les Tâches lorsqu'un utilisateur supprime ses données
userSchema.pre('remove', async function(next){
  const user = this;
  await TaskModel.deleteMany({owner: user._id});
  next();
})



const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
