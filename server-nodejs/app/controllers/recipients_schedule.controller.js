const db = require("../models")
const RecipientSchedule = db.recipients_schedule
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")

exports.create = (req, res) => {
    console.log("req.body :", req.body)
    RecipientSchedule.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.updateStatus = (req, res) => {
    RecipientSchedule.update(req.body, {
        where: {
            userId: req.body.userId,
            SchedulerId: req.body.SchedulerId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RecipientSchedule was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update RecipientSchedule. Maybe RecipientSchedule was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating RecipientSchedule with id="
            })
        })

}

exports.findAll = (req, res) => {
    const name = req.query.name
    const { page, size } = req.query
    const { limit, offset } = getPagination(page, size)

    var condition = name ? { name: { [Op.like]: '%' + name + '%' } } : null

    RecipientSchedule.findAndCountAll({
        include: [
            {
                model: db.user
            }
        ], where: condition, limit, offset
    })
        .then(data => {
            const response = getPagingData(data, page, limit)
            res.send(response)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    RecipientSchedule.findOne({
        include: [
            {
                model: db.user
            }
        ], where: { id: id }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving RecipientSchedule with id = ${id}`
            })
        })
}

exports.getUserIdBySchedulerId = (req, res) => {
    const { schedulerId } = req.query
    console.log("===================getBySchedulerId")
    RecipientSchedule.findAll({
        include: [
            {
                model: db.user
            }
        ], where: { SchedulerId: schedulerId }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving RecipientSchedule with id = ${schedulerId}`
            })
        })
}

exports.getStatus = (req, res) => {
    const { schedulerId, userId } = req.query
    RecipientSchedule.findOne({
        where: { SchedulerId: schedulerId, userId: userId }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving RecipientSchedule with id = ${schedulerId}`
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id

    RecipientSchedule.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RecipientSchedule was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update RecipientSchedule with id=${id}. Maybe RecipientSchedule was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating RecipientSchedule with id=" + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    RecipientSchedule.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RecipientSchedule was deleted successfully!",
                    ok: true
                })
            } else {
                res.send({
                    message: `Cannot delete RecipientSchedule with id=${id}. Maybe RecipientSchedule was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete RecipientSchedule with id=" + id
            })
        })
}

exports.deleteBySchedulerIdAndUserId = (req, res) => {
    console.log("=================== delete ")
    const { schedulerId, userId } = req.query

    RecipientSchedule.destroy({
        where: {
            SchedulerId: schedulerId,
            userId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "RecipientSchedule was deleted successfully!",
                    ok: true
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error"
            })
        })
}

exports.deleteAll = (req, res) => {
    RecipientSchedule.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Schedulers were deleted successfully!` })
        })
        .catch(err => {
            messageError(res, err)
        })
}