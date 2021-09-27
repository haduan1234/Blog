const db = require("../models");
const Post = db.post;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");

exports.findAll = (req, res )=> {
    const search = req.query.search;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var condition = search ? { name: { [Op.like]: '%' + search + '%' } } : null;

    Post.findAndCountAll({
        include: [
            {
              model: db.user,
              model: db.post_category
            }
        ],where: condition, limit, offset})
    .then(data => {
        const response = getPagingData(data, page, limit);
        res.send(response)
    })
    .catch(err =>{
        messageError(res, err)
    })
}

exports.create = (req, res) => {
    console.log("data body :" , req.body)
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
    console.log("id", req.body)
    const content = req.body.content
    console.log(typeof content)

    Post.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1 ){
            res.send({
                message: " Post was updated successfully. "
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
        if(data.length == 0){
            res.send({
                message:" Can not find Post with id =" +id
            })
        }
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