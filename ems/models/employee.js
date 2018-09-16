// required
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// define the employeeSchema
var employeeSchema = new Schema({
    firstName: String,
    lastName: String
});


// define the employee model
var Employee = mongoose.model("Employee", fruitSchema);


// expose the employee to calling files
module.exports = Employee;

var employee = new Employee({

    name: "Dave"
});