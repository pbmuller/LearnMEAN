const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const customerSchema = new mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: {type: String, required: true, pattern: /[A-z]+ [A-z- ]+/},
    //This is a clunky regex for phone numbers
    phoneNumber: {type: String, required: true, pattern: /[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/}
})

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        isGold: Joi.boolean().required(),
        name: Joi.string().regex(/[A-z]+ [A-z- ]+/).required(),
        phoneNumber: Joi.string().regex(/[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}/).required()
    });

    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;