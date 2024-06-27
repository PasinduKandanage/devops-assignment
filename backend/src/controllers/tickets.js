const createHttpError = require('http-errors')
const ProductModel = require('../model/ticket')
const mongoose = require('mongoose');

exports.create = async (req, res, next) => {
    const {         
        title,
        price,
        date,
        venue       
    } = req.body;

    try {
        const { image } = req.files;
        if (!image) {
            throw createHttpError(404, "Image not found")
        }
        if (!image.mimetype.startsWith('image')) {
            throw createHttpError(400, 'Only images are allowed');
        }
        let filepath = __dirname + '../../../public/tickets/' + image.name
        image.mv(filepath);

        let filepathtoUplaod = '/public/tickets/' + image.name

        if (!title || !price || !date || !venue ) {
            throw createHttpError(400, 'Please provide all the required fields');
        }

        const ticket = new ProductModel({
            title,
            price,
            date,
            venue,
            image: filepathtoUplaod,
        });

        const result = await ticket.save();

        res.status(201).send(result);





    } catch (error) {

        next(error)

    }

}

exports.update = async (req, res, next) => {

    const ticketId = req.params.id;

    const {
        title,
        price,
        date,
        venue        
    } = req.body;

    try {

        if (!ticketId) {
            throw createHttpError(400, 'Please provide ticket id');
        }

        //check mongoose id
        if (!mongoose.isValidObjectId(ticketId)) {
            throw createHttpError(400, 'Please provide valid ticket id');
        }

        //if req.files is not empty
        let pth;
        if (req.files) {
            const { image } = req.files;
            if (!image) {
                throw createHttpError(404, "Image not found")
            }
            if (!image.mimetype.startsWith('image')) {
                throw createHttpError(400, 'Only images are allowed');
            }
            let filepath = __dirname + '../../../public/tickets/' + image.name
            image.mv(filepath);

            pth = '/public/tickets/' + image.name
        }

        const ticket = await ProductModel.findById(ticketId).exec();

        if (!ticket) {
            throw createHttpError(404, 'Pet not found');
        }

        ticket.title = title || ticket.title;
        ticket.price = price || ticket.price;
        ticket.date = date || ticket.date;
        ticket.venue = venue || ticket.venue;
        ticket.image = pth || ticket.image;
     

        const result = await ticket.save();

        res.status(200).send(result);



    } catch (error) {

        next(error)

    }
}

exports.getAll = async (req, res, next) => {

    try {
        const result = await ProductModel.find().exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.getById = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await ProductModel.findById(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.delete = async (req, res, next) => {

    try {
        const id = req.params.id;
        const result = await ProductModel.findByIdAndDelete(id).exec();
        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}

exports.search = async (req, res, next) => {

    // const search = req.params.search;

    try {
        const search = req.params.search;
        
        //user regex to search for title,type,breed, case insensitive, and return all results
        const result = await ProductModel.find({ $or: [{ title: { $regex: search, $options: 'i' } }, { price: { $regex: search, $options: 'i' } }, { date: { $regex: search, $options: 'i' } }] }).exec();

        res.status(200).send(result);
    } catch (error) {
        next(error)
    }

}
