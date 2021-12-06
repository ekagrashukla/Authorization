const express = require('express')
const Employee = require('../models/Employee')
const { indexService, showService, storeService, updateService, destroyService } = require('../services/EmployeeService')

//show the list of employees
const index = (req,res) => indexService(req,res)
const show = (req,res) => showService(req,res)

// add a new employee

const store = (req,res) => storeService(req,res)

//update an employee

const update = (req,res) => updateService(req,res)

// delete an employee

const destroy = (req,res) => destroyService(req,res)

module.exports = {
    index,show,store, update, destroy
}