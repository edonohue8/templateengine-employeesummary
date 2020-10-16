// Code to define and export the Manager class

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNo) {

        super(name, id, email);

        this.officeNumber = officeNo;

    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return "Manager";
    }
}

module.exports = Manager;