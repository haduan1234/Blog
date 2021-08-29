const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const schedule = require('node-schedule')
const config = require("./app/config/config.js")
const scheduleJob = require("./app/controllers/schedule_job.controller.js")
var admin = require("firebase-admin")

var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

const app = express()

const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const corsOptions = {
  origin: "http://localhost:4200"
}

app.use(cors(corsOptions))

//setup firebase
var serviceAccount = require("./schedule-a4483-firebase-adminsdk-yd7mw-878f756725.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// io.on('connection', (socket) => {
//   console.log("=========================")
//   console.log('a user connected', socket.id)
// })

// io.emit("notification", { name: "schedule" })

// cứ 1s chạy lại 1 lần:  0-59/1 * * * * *
//cứ 1p chạy lại 1 lần: */1 * * * *
// schedule.scheduleJob('*/1 * * * *', function () {
//   scheduleJob.run(admin)
// })

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// database
const db = require("./app/models")
const Role = db.role
db.sequelize.sync().then(() => {
  initial() // Just use it in development, at the first time execution!. Delete it in production
})

app.post('/uploads', upload.single('image'), function (req, res, next) {
  const img = req.file
  res.send(img)
})

app.use(express.static('uploads'))
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial" })
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// api routes
require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/role.routes")(app)
require("./app/routes/permission.routes")(app)
require("./app/routes/scheduler.routes")(app)
require("./app/routes/recipients_schedule.routes")(app)
require("./app/routes/label.routes")(app)

require("./app/routes/post.routes")(app)

// set port, listen for requests
const PORT = config.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

function initial() {
  // Role.create({
  //   id: 1,
  //   name: "user",
  //   description: "normal"
  // });
  // Role.create({
  //   id: 3,
  //   name: "admin",
  //   description: "admin"
  // });
}
