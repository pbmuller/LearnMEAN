const express = require('express');
const router = express.Router();
const Customer = require('../models/customer').Customer;
const validateCustomer = require('../models/customer').validateCustomer;

router.get('/', async (req,res) =>{
    try{
        const customers = await Customer.find().sort('name');
        res.send(customers);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const customer = await Customer.findById(req.params.id);
        res.send(customer);
    }
    catch (err){
        res.status(404).send(err.message);
    }
});

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    try{
        let customer = new Customer({
            isGold: req.body.isGold, 
            name: req.body.name,
            phoneNumber: req.body.phoneNumber
        });
        customer = await customer.save();
        res.send(customer);
    } 
    catch (err){
        res.status(400).send(err.message);
    }
});

router.put('/:id', async (req, res) =>{
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    try{
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, 
            {
                isGold: req.body.isGold, 
                name: req.body.name, 
                phoneNumber: req.body.phoneNumber
            }, {
                new: true
            });
        res.send(customer);
    }
    catch (err) {
        res.status(400).send(customer);
    }
})

router.delete('/:id', async (req, res) =>{
    try {
        let customer = await Customer.findByIdAndDelete(req.params.id);
        res.send(customer);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;