const createHttpError = require('http-errors')
const bcrypt = require('bcrypt');
const OrderModel = require('../model/order')
const BuyerModel = require('../model/buyer');
const PetModel = require('../model/ticket')

exports.create = async (req, res, next) => {
    const user_id = req.body.user_id
    const ticket_id = req.body.ticket_id
    try {
        if (!user_id || !ticket_id) {
            throw createHttpError(400, 'Missing required parameters')
        }

        const isUserAvailable = await BuyerModel.findOne({ _id: user_id }).exec();

        if (!isUserAvailable) {
            throw createHttpError(400, 'User doesnt exists')
        }

        const isTicket = await PetModel.findById(ticket_id).exec();

        if (!isTicket) {
            throw createHttpError(400, 'Pet doesnt exists')
        }


        const order = new OrderModel({
            user_id: user_id,
            user_name: isUserAvailable.name,
            ticket_id: ticket_id,
            ticket_name: isTicket.title,
            date: new Date().toISOString()
        })

        const result = await order.save();

        res.status(201).send(result);

    } catch (error) {
        next(error)

    }




}

exports.getAll = async (req, res, next) => {

    try {
        const result = await OrderModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}



