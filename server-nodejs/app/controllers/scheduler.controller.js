const db = require("../models")
const Scheduler = db.scheduler
const RecipientSchedule = db.recipients_schedule
const { Op } = require("sequelize")
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")
const { query } = require("express")

const emailController = require("./mail.controller")

exports.createGroup = (req, res) => {
    let { schedule, userSelecteds } = req.body

    Scheduler.create(schedule)
        .then(async (data) => {
            for (const user of userSelecteds) {
                const recipient_schedule = {
                    userId: user.id,
                    SchedulerId: data.id,
                    noti_time: schedule.start_time,
                    notification: schedule.notification,
                    note: schedule.note,
                    status: user.id == schedule.userId ? "agree" : "confirm"
                }
                await RecipientSchedule.create(recipient_schedule)
            }
            emailController.sendMail(userSelecteds, schedule)
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.createSingle = (req, res) => {
    let schedule = req.body

    Scheduler.create(schedule)
        .then(async (data) => {
            const recipient_schedule = {
                userId: schedule.userId,
                SchedulerId: data.id,
                noti_time: schedule.start_time,
                notification: schedule.notification,
                discription: schedule.discription,
                status: "agree"
            }
            await RecipientSchedule.create(recipient_schedule)
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })
}

exports.findAll = (req, res) => {
    const { page, size, name } = req.query
    const { limit, offset } = getPagination(page, size)

    var condition = name ? { name: { [Op.substring]: name } } : null

    Scheduler.findAndCountAll({
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

    Scheduler.findOne({
        include: [
            {
                model: db.user
            },
            {
                model: db.label
            }
        ], where: { id: id }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Scheduler with id = ${id}`
            })
        })
}

const getAllSchedulerByTypeAndDate = async (type, start_date, end_date, req, res) => {
    if (type == undefined || start_date == undefined || end_date == undefined) {
        res.status(500).send({
            error: "Type and date is required."
        })
    }
    let condition = type != "all" ? [
        { type },
        {
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        }
    ] : [
        {
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        }
    ]

    var data = await Scheduler.findAll({
        attributes: ['id'],
        where: {
            [Op.and]: condition
        },
    })
    let schedulerIds = []
    data.forEach((item, index) => {
        schedulerIds[index] = item.id
    })
    return schedulerIds

}

const getAllSchedulerIsMemberGroup = async (userId, schedulerIds) => {
    var data = await RecipientSchedule.findAll({
        attributes: ['SchedulerId'],
        where: {
            userId,
            SchedulerId: schedulerIds,
            status: {
                [Op.ne]: "refuse",
            }

        }
    })
    let schedulerIdIsMembers = []
    data.forEach((item, index) => {
        schedulerIdIsMembers[index] = item.SchedulerId
    })
    return schedulerIdIsMembers
}

const getAllUserIsMember = async (schedulerId) => {
    var users = await RecipientSchedule.findAll({
        include: [
            {
                model: db.user
            }
        ], where: {
            SchedulerId: schedulerId
        }
    })
    var data = []
    users.forEach((item, index) => {
        data[index] = item.user
    })
    return data
}

const getAllSchedulerIsConfirm = async (userId, schedulerIds) => {
    var data = await RecipientSchedule.findAll({
        attributes: ['SchedulerId'],
        where: {
            userId,
            SchedulerId: schedulerIds,
            status: "confirm"
        }
    })
    let schedulerIdIsConfirms = []
    data.forEach((item, index) => {
        schedulerIdIsConfirms[index] = item.SchedulerId
    })
    return schedulerIdIsConfirms
}

exports.getAllSchedulerIdIsConfirm = async (req, res) => {
    const { type, start_date, end_date, userId } = req.query
    var schedulerIds = await getAllSchedulerByTypeAndDate(type, start_date, end_date, req, res)
    var data = await getAllSchedulerIsConfirm(userId, schedulerIds)
    res.send(data)
}

exports.getAllIsGroup = async (req, res) => {
    const { type, start_date, end_date, userId } = req.query
    var schedulerIds = await getAllSchedulerByTypeAndDate(type, start_date, end_date, req, res)
    var shedulerIdIsMembers = await getAllSchedulerIsMemberGroup(userId, schedulerIds)

    let condition = type != "all" ? [
        {
            type,
            userId,
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        },
        {
            type,
            id: shedulerIdIsMembers,
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        },
    ] : [
        {
            userId,
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        },
        {
            id: shedulerIdIsMembers,
            date: {
                [Op.gte]: parseInt(start_date),
                [Op.lte]: parseInt(end_date)
            }
        },
    ]
    var data = await Scheduler.findAll({
        include: [
            {
                model: db.user
            }
        ],
        where: {
            [Op.or]: condition
        },
        order: [['date'], ['start_time']]
    })
    res.send(data)
}


exports.getAllByTypeAndUserId = (req, res) => {
    const { type, userId, start_date, end_date } = req.query
    if (type == undefined || userId == undefined) {
        res.send({
            error: "Type or userId is required."
        })
    }

    Scheduler.findAll({
        include: [
            {
                model: db.user
            }
        ],
        where: {
            [Op.and]: [
                { type },
                { userId },
                {
                    date: {
                        [Op.gte]: parseInt(start_date),
                        [Op.lte]: parseInt(end_date)
                    }
                }
            ]
        },
        order: [['date'], ['start_time']]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            messageError(res, err)
        })
}

const removeMember = async (users, schedulerId, schedule) => {
    var userIds = []
    for (const u of users) {
        userIds.push(u.id)
    }
    RecipientSchedule.destroy({
        where: {
            userId: userIds,
            SchedulerId: schedulerId,
        }
    })
    emailController.sendMailWhenDeleteMember(users, schedule)
}

const addMember = async (users, schedulerId, schedule) => {
    for (let user of users) {
        let newRecipient = {
            userId: user.id,
            SchedulerId: schedulerId,
            status: user.id == schedule.userId ? "agree" : "confirm"
        }
        await RecipientSchedule.create(newRecipient)
    }
    emailController.sendMailWhenAddMember(users, schedule)
}

exports.updateGroup = async (req, res) => {
    const id = req.params.id
    const { schedule, userIdUpdates } = req.body

    Scheduler.update(schedule, {
        where: { id: id }
    })
        .then(async (num) => {
            if (num == 1) {
                console.log("userIdUpdates : ", userIdUpdates)
                if (userIdUpdates?.userDeletes.length > 0) {
                    await removeMember(userIdUpdates?.userDeletes, id, schedule)
                }
                if (userIdUpdates?.userAdds.length > 0) {
                    await addMember(userIdUpdates?.userAdds, id, schedule)
                }
                res.send({
                    message: "Scheduler was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Scheduler with id=${id}. Maybe Scheduler was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Scheduler with id=" + id
            })
        })
}

exports.updateSingle = async (req, res) => {
    const id = req.params.id
    const schedule = req.body

    Scheduler.update(schedule, {
        where: { id: id }
    })
        .then(async (num) => {
            if (num == 1) {
                res.send({
                    message: "Scheduler was updated successfully."
                })
            } else {
                res.send({
                    message: `Cannot update Scheduler with id=${id}. Maybe Scheduler was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Scheduler with id=" + id
            })
        })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    await RecipientSchedule.destroy({
        where: {
            SchedulerId: id
        }
    })
    var num = await Scheduler.destroy({
        where: {
            id
        }
    })
    if (num > 0) {
        res.send({
            message: "Scheduler was delete successfully."
        })
    }
}

exports.deleteAll = (req, res) => {
    Scheduler.destroy({
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