'use strict';

const    mongoose = require('mongoose'),
requireWalk = require('../src/utils/requireWalk').requireWalk;

// Mongoose connecting event
mongoose.connection.on('connecting', function () {
    console.log('Mongoose connecting to ');
});

// Mongoose conneccted event
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ');
});

// Mongoose open event
mongoose.connection.once('open', function () {
    console.log('Mongoose connection opened to ');
});

// Mongoose reconnected event
mongoose.connection.on('reconnected', function () {
    console.log('Mongoose reconnected to ');
});

// Mongoose disconnected event
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
    //console.log(dbURI);
});

// Mongoose error event
mongoose.connection.on('error', function (error) {
    console.log('Mongoose error: ' + error);
    mongoose.disconnect();
});

// Mongoose SIGINT event
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
// Create the database connection

mongoose.connect('mongodb://localhost:27017/testApp');

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});
  
let requireModels = requireWalk(__dirname +'/../src/model');
requireModels();
