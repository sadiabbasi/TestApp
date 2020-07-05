"use strict";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "User Name required"]
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "User Email required"]
    },
    role:{
      type: String,
      enum: ["buyer", "seller"],
    },
    password: {
      type: String,
      trim: true
    },

    token: { type: String },
    availability: {
      "Monday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Tuesday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Wednesday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Thursday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Friday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Saturday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      },
      "Sunday": {
        startTime: String,
        endTime: String,
        duration: String,
        status: {type: Boolean, default: false},
        slots: [String]
      }
    },
    updatedAt: {
      type: Date,
    },
    createdAt: {
        type: Date, default: Date.now
    }
  },
  { versionKey: false }
);

User.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, config.get("webServer.secretKey"));
  } catch (error) {
    return Promise.reject(error);
  }

  return User.findOne({
    _id: decoded._id,
    token: token
  });
};

mongoose.model("User", User);
