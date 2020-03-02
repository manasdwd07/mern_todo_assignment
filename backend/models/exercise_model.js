const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
   
    description: { type: String },
    duration: { type: Number },
    date: { type: Date},
    status: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending',
        required: true
    },
    
},
    { timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;