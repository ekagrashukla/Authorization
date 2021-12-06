const express = require('express')
const Employee = require('../models/Employee')

//show the list of employees
const indexService = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        message: 'An error Occured'
    })
}

const showService = (req,res,next) => {
    console.log("inside")
    let employeeID = req.body.employeeID
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}

// add a new employee

const storeService = (req,res,next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    employee.save()
    .then(response => {
        res.json({
            message: "Employee added successfully"
        })
    })
    .catch(error => {
            res.json({
                message: "An error occured"
            })
        })
}

//update an employee

const updateService = (req,res,next) => {
    let employeeID = req.body.employeeID

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: "Employee updated successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured"
        })
    })
}

// delete an employee

const destroyService = (req,res,next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(()=>{
        res.json({
            message: "Employee deleted successfully"
        })
    })
    .catch(error => {
        res.json({
            message: "An error occured"
        })
    })
}

module.exports = {
    indexService,showService,storeService, updateService, destroyService
}