const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api",{
    // useNewUrlParser:true,
    // useCreateIndex:true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true,
    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value < 0)
                throw new Error("Age inférieur à 0");
        }
    },
    email: {
        type: String,
        required: true,
        lowercase:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value))
             throw new Error('Email non valide');
        }
    },
    password:{
        type:String,
        required: true,
        trim:true,
        lowercase:true,
        minlength: 7,
        validate(value){
            console.log("Valeur", value);
            if(value.includes("password"))
                throw new Error("Mot de passe non valide");
        }
    }
})



const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type:Boolean,
        default:false
    }


})

// const UserModel = mongoose.model('User', userSchema);

const TaskModel = mongoose.model('Task', taskSchema);


// const addUser = new UserModel({
//     name : "Moi",
//     email: "tRUC@gmail.com",
//     password:"  passwrd",
    
// })
const addTask = new TaskModel({
    description : "      Manger une brioche     ",
    
})

// addUser.save()
// .then((result) => {
//     console.log(result)
// })
// .catch((error) => {
//     console.log('\n\n\n')
//     console.log('Error: ', error)
// })


addTask.save()
.then((result) => {
    console.log(result)
})
.catch((error) => {
    console.log('\n\n\n')
    console.log('Error: ', error)
})