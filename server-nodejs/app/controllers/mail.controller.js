const nodemailer = require('nodemailer')
const userController = require("./user.controller")
const moment = require('moment')

const formatTime = (date, type = "date") => {
    var result = ""
    if (type === "time") {
        result = moment(date).format('HH:mm')
    }
    else if (type === "date") {
        result = moment(date).format("DD/MM/YYYY")
    }
    return result
}

const userAdmin = 'thahuy920@gmail.com'
const passwordAdmin = 'TOAN0167'
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: userAdmin,
        pass: passwordAdmin,
    },
})

exports.sendMail = async (userSelecteds, schedule) => {
    let user = await userController.getByUserId(schedule.userId)
    let email_recipients = ""
    let userName = ""
    let index = 0
    for (var u of userSelecteds) {
        if (index == 0) {
            userName += `${u.display_name}`
            index += 1
        }
        else {
            userName += `, ${u.display_name}`
        }
        email_recipients += `, ${u.email}`
    }

    const subject = user.display_name + " đã thêm bạn vào lịch nhóm " + schedule.schedule_name
    const contentHtml = `<h3>
      Thông tin lịch nhóm:  
      </h3>
      <p> Tên lịch: ${schedule.schedule_name} </p>
      <p>Người tạo: ${user.display_name}</p>
      <p>Chú thích: ${schedule.discription}</p>
      <p>Ngày: ${formatTime(schedule.date)}</p>
      <p>Thời gian: ${formatTime(schedule.start_time, "time")} -  ${formatTime(schedule.end_time, "time")}</p>
      <p>Thành viên: ${userName}</p>`
    const msg = {
        from: userAdmin,
        to: email_recipients,
        subject: subject + " ✔",
        html: contentHtml,
    }
    const info = await transporter.sendMail(msg)
    return info
}

exports.sendMailWhenDeleteMember = async (userDeletes, schedule) => {
    let user = await userController.getByUserId(schedule.userId)
    let email_recipients = ""
    for (var u of userDeletes) {
        email_recipients += `, ${u.email}`
    }

    const subject = user.display_name + " đã xóa bạn khỏi lịch nhóm " + schedule.schedule_name
    const contentHtml = `<h3>
      Thông tin lịch nhóm:  
      </h3>
      <p> Tên lịch: ${schedule.schedule_name} </p>
      <p>Người tạo: ${user.display_name}</p>
      <p>Chú thích: ${schedule.discription}</p>
      <p>Ngày: ${formatTime(schedule.date)}</p>
      <p>Thời gian: ${formatTime(schedule.start_time, "time")} -  ${formatTime(schedule.end_time, "time")}</p>`
    const msg = {
        from: userAdmin,
        to: email_recipients,
        subject: subject,
        html: contentHtml,
    }
    const info = await transporter.sendMail(msg)
    return info
}

exports.sendMailWhenAddMember = async (userDeletes, schedule) => {
    let user = await userController.getByUserId(schedule.userId)
    let email_recipients = ""
    for (var u of userDeletes) {
        email_recipients += `, ${u.email}`
    }

    const subject = user.display_name + " đã thêm bạn vào lịch nhóm " + schedule.schedule_name
    const contentHtml = `<h3>
      Thông tin lịch nhóm:  
      </h3>
      <p> Tên lịch: ${schedule.schedule_name} </p>
      <p>Người tạo: ${user.display_name}</p>
      <p>Chú thích: ${schedule.discription}</p>
      <p>Ngày: ${formatTime(schedule.date)}</p>
      <p>Thời gian: ${formatTime(schedule.start_time, "time")} -  ${formatTime(schedule.end_time, "time")}</p>`
    const msg = {
        from: userAdmin,
        to: email_recipients,
        subject: subject,
        html: contentHtml,
    }
    const info = await transporter.sendMail(msg)
    return info
}