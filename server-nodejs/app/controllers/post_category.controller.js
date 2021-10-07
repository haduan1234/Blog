const db = require("../models");
const Post_category = db.post_category;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");

exports.findAll = (req, res) => {
    const search = req.query.search;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var condition = search ? { name: { [Op.like]: '%' + search + '%' } } : null;

    Post_category.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response)
        })
        .catch(err => {
            messageError(res, err)
        });
};

exports.create = (req, res) => {
    Post_category.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            messageError(res, err)
        });
};



exports.findOne = (req, res) => {
    const id = req.params.id;

    Post_category.findOne({
        where: { id: id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Post_category with id = ${id}`
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Post_category.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Post_category was update successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Post_category with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error  updating Post_category with id =" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id

    Post_category.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Post_category was deleted successfully."
                })
            } else {
                res.send({
                    message: `Cannot delete Post_category with id=${id}`
                })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Post_category with id=" + id
            });
        });
};