/*
============================================
; Title:  Assignment 7.4
; Author: Timothy Wilson
; Date:   7 Aug 2018
; Modified By: Timothy Wilson
; Description: This program entails the employee.js program.
;===========================================
*/

// required
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// define the employeeSchema
var employeeSchema = new Schema({
    firstName: String,
    lastName: String
});


// define the employee model
var Employee = mongoose.model("Employee", employeeSchema);


// expose the employee to calling files
module.exports = Employee;

