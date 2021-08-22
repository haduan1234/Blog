const db = require("../models")
const { Op } = require("sequelize")
const RecipientSchedule = db.recipients_schedule


exports.run = (admin) => {
    sendNotification(admin)
}

const getCurrentCalendarNeedNoti = async () => {
    let currentDate = new Date()
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    const cuurentTime = currentDate.getTime()
    let recipient_schedules = await RecipientSchedule.findAll({
        include: [
            {
                model: db.scheduler
            },
            {
                model: db.user
            }
        ],
        where: {
            [Op.and]: [
            {
                noti_time: cuurentTime
            },
            {
                notification: true
            }
            ]
            
        }
    })
    return recipient_schedules
}

const sendNotification = async (admin) => {
    let recipient_schedules = await getCurrentCalendarNeedNoti()
    for (let rs of recipient_schedules) {
        admin.messaging().send({
            token: rs.user.token_notification,
            data: {
                customData: "Toan",
                id: "1",
                ad: "ad",
                subTitle: "subtitle"
            },
            android: {
                notification: {
                    body: !!rs.Scheduler.discription ? rs.Scheduler.discription : "",
                    title: !!rs.Scheduler.schedule_name ? rs.Scheduler.schedule_name : "",
                    color: "#ffa64d",
                    priority: "high",
                    sound: "default",
                    vibrateTimingsMillis: [200, 500, 800],
                    // imageUrl: "https://images.unsplash.com/photo-1585597833169-a7071a12324d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                }
            }
        }).then((msg) => {
            console.log(msg)
        })
    }
}