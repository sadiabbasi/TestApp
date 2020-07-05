"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appointments = new mongoose.Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    phone: String,
    age: Number,
    slot: String,    
    // Appointment day
    date: String,
    status: {
        type:String,
        enum: ['accepted', 'rejected'],
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
);

module.exports = {
    Appointments: mongoose.model('Appointments', Appointments)
}
