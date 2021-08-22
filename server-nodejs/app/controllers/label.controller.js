const db = require("../models")
const Label = db.label
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")

exports.create = (req, res) => {
    Label.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.findAll = (req, res) => {
    const name = req.query.name
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)

    var condition = name ? { name: { [Op.like]: '%' + name + '%' } } : null

    Label.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
            const response = getPagingData(data, page, limit)
            res.send(response)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.getAllByUserId = (req, res) => {
     const { userId } = req.query
  Label.findAll({
    where: {
            userId: userId
        }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      messageError(res, err)
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Label.findOne({
        where: { id: id }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Label with id = ${id}`
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    Label.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Label was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Label with id=${id}. Maybe Label was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Label with id=" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Label.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Label was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete Label with id=${id}. Maybe Label was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Label with id=" + id
            })
        })
}

exports.deleteAll = (req, res) => {
    Label.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Labels were deleted successfully!` })
        })
        .catch(err => {
            messageError(res, err)
        })
}