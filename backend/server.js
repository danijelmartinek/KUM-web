// setting ENV --------------------
const dotenv = require('dotenv')
dotenv.config()

// importing modules --------------------
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// create express app
const app = module.exports = express()

const configDB = require('./config/database.js')
const controllerAuth = require("./controllers/auth.js")
const { usersData, userById, deleteUser, multiUserDelete } = require("./controllers/users.js")
const { facebookApiAuth, saveFacebookEvents } = require("./controllers/fbGraphApi.js")

// set ENV --------------------
const IPADDRESS = process.env.IPADDRESS || 'localhost'
const PORT = process.env.PORT || 3000




// server config --------------------
app.use(cors({
  origin:[`http://${IPADDRESS}:${PORT}`],
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set("appSecret", "secretforinvoicingapp")



// set database --------------------
mongoose.set('useCreateIndex', true)

mongoose.connect(configDB.url, {useNewUrlParser: true}, function(err) {
  if (err) {
    return next(err)
  } else {
    console.log("Connected successfully to MongoDB.")
  }
});


// application auth routes --------------------

app.post("/register", controllerAuth.register)
app.get("/emails", controllerAuth.takenEmails)

app.post("/login", controllerAuth.login)

app.get("/logout", controllerAuth.logout)

app.get("/auth", controllerAuth.authentication)

// other routes --------------------
app.get("/", (req, res) => {
  res.end("Main server route")
})

app.get("/users",controllerAuth.authMiddleware, usersData)
app.get("/user/:id", userById)
app.get("/user/:id/delete", deleteUser)
app.post("/users/multidelete", multiUserDelete)


// Facebook graph api routes  --------------------
app.get("/fb/auth", facebookApiAuth)
app.get("/fb/events/get", saveFacebookEvents)




app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}.`)
})
