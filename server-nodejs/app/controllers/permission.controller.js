const db = require("../models");
const Permission = db.permission;
const User = db.user;
const Op = db.Op;
const { getPagination, getPagingData } = require("../helpers/pagination");
const { messageError } = require("../helpers/messageError");

exports.create = (req, res) => {
    Permission.create(req.body)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            messageError(res, err)
        });
};

const getAllReceiverId = async (sharerId) => {
    let data = await Permission.findAll({ 
        attributes: ['userId'],
        where: {
        sharerId
    }})
    let userIds = [];
    data.forEach((item, index) => {
        userIds[index] = item.userId;
    })
    return userIds;
}

exports.getAllUserByReceiverId = async (req, res) => {
    const { sharerId } = req.query;
    let userIds = await getAllReceiverId(sharerId);
    let users = await User.findAll({
        where: {
            id: userIds
        }
    })
    return res.send(users);
}

exports.findAll = (req, res) => {
    const name = req.query.name;
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    var condition = name ? { name: { [Op.like]: '%' + name + '%' } } : null;

    Permission.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            messageError(res, err)
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Permission.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Permission with id = ${id}`
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Permission.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                Permission.findByPk(id)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: `Error retrieving Permission with id = ${id}`
                        });
                    });
            } else {
                res.send({
                    message: `Cannot update Permission with id=${id}. Maybe Permission was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Permission with id=" + id
            });
        });
};

exports.deleteBySharerId = (req, res) => {
    const sharerId = req.query.sharerId;

    Permission.destroy({
        where: { sharerId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Permission with id=${sharerId}. Maybe Permission was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Permission with id=" + sharerId
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Permission.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Permission was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Permission with id=${id}. Maybe Permission was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Permission with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Permission.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Permissions were deleted successfully!` });
        })
        .catch(err => {
            messageError(res, err)
        });
};