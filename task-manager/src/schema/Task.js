const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  owner: {
      type: ObjectId,
      required:true,
      ref: 'User'
  }},
    {  
    timestamps: true
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
