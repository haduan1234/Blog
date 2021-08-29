const db = require("../models")
const User = db.user
const RecipientSchedule = db.recipients_schedule
const Scheduler = db.scheduler
const Permission = db.permission
const Op = db.Op
const { getPagination, getPagingData } = require("../helpers/pagination")
const { messageError } = require("../helpers/messageError")
const bcrypt = require("bcryptjs")

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.")
}

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.")
}

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.")
}

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.")
}

exports.updatePassWord = async (req, res) => {
  let { userId, oldPass, newPass } = req.body
  var user = await User.findOne({
    where: { id: userId }
  })

  let passwordIsValid = bcrypt.compareSync(
    oldPass,
    user.password
  )

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Mật khẩu cũ không đúng",
      error: true
    })
  }
  var password = bcrypt.hashSync(newPass, 8)
  user.gender = "female"
  delete user.id
  User.update({
    password: password
  }, {
    where: { id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật mật khẩu thành công.",
          error: false
        })
      } else {
        res.send({
          message: `Cannot update User with . Maybe User was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id="
      })
    })

}



exports.findAll = (req, res) => {
  const display_name = req.query.display_name
  const { page, size }  = req.query
  const { limit, offset } = getPagination(page, size)

  var condition = display_name ? { display_name: { [Op.eq]: display_name } } : null

  User.findAndCountAll({
    include: [
      {
        model: db.role
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

exports.getAllUserFreeTimes = async (req, res) => {
  const { date, start_time, end_time } = req.query
  Scheduler.findAll({
    attributes: ['id'],
    where: {
      [Op.or]: [
        {
          date,
          start_time: {
            [Op.lte]: parseInt(start_time)
          },
          end_time: {
            [Op.gte]: parseInt(end_time)
          }
        },
        {
          date,
          start_time: {
            [Op.lte]: parseInt(start_time)
          },
          end_time: {
            [Op.gte]: parseInt(start_time)
          }
        },
        {
          date,
          start_time: {
            [Op.lte]: parseInt(end_time)
          },
          end_time: {
            [Op.gte]: parseInt(end_time)
          }
        },
        {
          date,
          start_time: {
            [Op.gte]: parseInt(start_time)
          },
          end_time: {
            [Op.lte]: parseInt(end_time)
          }
        }
      ]
    }
  })
    .then(data => {
      let schedulerIds = []
      data.forEach((item, index) => {
        schedulerIds[index] = item.id
      })
      getAllUserIdBusys(schedulerIds, res)
    })
    .catch(err => {
      messageError(res, err)
    })
}

exports.getAllExceptMy = (req, res) => {
  const myId = req.query.myId

  User.findAll({
    where: {
      id: {
        [Op.ne]: myId
      }
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      messageError(res, err)
    })
}

const getUserIdShareScheduleForMes = async (myId) => {
  var data = await Permission.findAll({
    attributes: ['sharerId'],
    where: {
      userId: myId
    }
  })

  let userIds = []
  data.forEach((item, index) => {
    userIds[index] = item.sharerId
  })
  return userIds
}

exports.getAllUserShareScheduleForMe = async (req, res) => {
  const myId = req.query.myId
  let userIds = await getUserIdShareScheduleForMes(myId)

  User.findAll({
    where: {
      id: userIds
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      messageError(res, err)
    })
}

const getAllUserIdBusys = (schedulerIds, res) => {
  RecipientSchedule.findAll({
    attributes: ['userId'],
    where: {
      SchedulerId: schedulerIds,
      status: {
        [Op.ne]: "refuse"
      }
    },
    group: ['userId']
  })
    .then(data => {
      let userIds = []
      data.forEach((item, index) => {
        userIds[index] = item.userId
      })
      getUserFreeTimesByUserId(userIds, res)
    })
    .catch(err => {
      res.status(500).send({
        message: `Error`
      })
    })
}

const getUserFreeTimesByUserId = (userIds, res) => {
  User.findAll({
    where: {
      id: {
        [Op.notIn]: userIds
      }
    }
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: `Error`
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: `Error`
      })
    })
}

exports.getByUserId = async (id) => {
  return await User.findByPk(id)
}

exports.update = (req, res) => {
  const id = req.params.id
  let {display_name, email, phone, birthday, gender, avatar, address, RoleId} = req.body
  if (req.body.hasOwnProperty('password')) {
    newUser.password = bcrypt.hashSync(req.body.password, 8)
  }
  User.update({
    ... req.body
  }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      })
    })
}

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` })
    })
    .catch(err => {
      messageError(res, err)
    })
}

exports.resetPassWord = async (req, res) => {
  let { userId, newPass } = req.body
  var user = await User.findOne({
    where: { id: userId }
  })

  var password = bcrypt.hashSync(newPass, 8)
  User.update({
    password: password
  }, {
    where: { id: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cập nhật mật khẩu thành công.",
          error: false
        })
      } else {
        res.send({
          message: `Cannot update User with . Maybe User was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id="
      })
    })

}