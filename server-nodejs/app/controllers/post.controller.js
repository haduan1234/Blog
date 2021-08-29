const db = require("../models");
const Post = db.post;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");

exports.findAll = (req, res )=> {
    const name = req.query.name;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var condition = name ? { name: { [op.like]: '%' + name + '%' } } : null;

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