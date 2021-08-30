const db = require("../models");
const Post = db.post;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");

exports.findAll = (req, res )=> {
    const name = req.query.name;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var condition = name ? { name: { [Op.like]: '%' + name + '%' } } : null;

    Post.findAndCountAll({ where: condition, limit, offset})
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response)
    })
    .catch(err =>{
        messageError(res, err)
    })
}

exports.create = (req, res) => {
    Post.create(req.body)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        messageError(res, err)
    });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1 ){
            res.send({
                message: " Role was updated successfully. "
            });
        }else {
            res.send({
                message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Post with id =" +id
        })
    })
}

exports.findOne = (req, res) => {
    const id  = req.params.id;
    Post.findOne({
        where : { id : id } 
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrievinig Post with id =" +id
        })
    })
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where : { id: id}
    })
    .then(num =>{
        if( num == 1) {
            res.send({
                message: " Post was deleted successdully!"
            });
        }
        else {
            res.send({
                message: `Can not delete Post with id=${id}. Maybe Post was not found!`
            });
        }
    })
    .catch(err =>{
        res.send(500).send({
            message: "Error delete Post with id=" +id
        })
    })
}

exports.deleteAll =( req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    })
    .then(num => {
        res.send({ message: `${num} Post were deleted successfully!`});
    })
    .catch(err => {
        messageError(res, err)
    })
}