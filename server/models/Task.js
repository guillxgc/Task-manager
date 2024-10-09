const mongoose = require('mongoose');

/*SCHEMA FOR TASKS*/
/*
    - Title
    - Description
    - Complete (?)
    - Date
*/
const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date
    }

});

/*CREATE MODEL BASED ON SCHEMA*/
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
