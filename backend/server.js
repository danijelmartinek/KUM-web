// setting ENV --------------------
const dotenv = require('dotenv')
dotenv.config()

// importing modules --------------------
const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")

var graph = require('fbgraph')

// create express app
const app = module.exports = express()

const configDB = require('./config/database.js')
const controllerAuth = require("./controllers/auth.js")
const { usersData, userById, deleteUser, multiUserDelete } = require("./controllers/users.js")

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






const getFbDataParams = (fb, fbParams) => {
	fbParams.user.accessToken = fb.access_token

	let options = {
		timeout: 3000,
		pool: { maxSockets:  Infinity },
		headers: { connection:  "keep-alive" }
	};
	 
	graph.setOptions(options)
	.get("/me",(err, res) => {
		fbParams.user.name = res.name
		fbParams.user.id = res.id
	})

	graph.setOptions(options)
	.get("/me/accounts",(err, res) => {
		res.data.forEach(acc => {
			if(acc.name == fbParams.page.name){
				fbParams.page.accessToken = acc.access_token
				fbParams.page.id = acc.id
			}		
		})
	})
}






let facebookAuth = {
	clientId: "350914115517680",
	clientSecret: "4b058b0af94d8dc1a76250b279d3e8a1",
	redirectUri: "https://b38a5fe6.ngrok.io/fbauthorize",
	accessTokenUser: null,
	accessTokenPage: null,
}

let fbDataParams = {
	user: {
		name: null,
		accessToken: null,
		id: null
	},
	page: {
		name: "Križevačka udruga mladih",
		accessToken: null,
		id: null
	}
}




// get authorization url
var authUrl = graph.getOauthUrl({
	"client_id": facebookAuth.clientId,
	"redirect_uri": facebookAuth.redirectUri
});


app.get("/getfbaccesstoken", (req, res) => {
	res.redirect(authUrl)
})

app.get("/fbauthorize", (req, res) => {
	graph.authorize({
		"client_id": facebookAuth.clientId,
		"redirect_uri": facebookAuth.redirectUri,
		"client_secret": facebookAuth.clientSecret,
		"code": req.query.code
	}, (err, fbRes) => {
		facebookAuth.accessTokenUser = fbRes.access_token
		getFbDataParams(fbRes, fbDataParams)
	})
})

app.get("/o", (req, res) => {
	res.send(fbDataParams)
})


// app.get("/extendfbaccesstoken", (req, res) => {

// 	// extending specific access token
// 	graph.extendAccessToken({
// 		"access_token": facebookAuth.accessTokenUser,
// 		"client_id": facebookAuth.clientId,
// 		"client_secret": facebookAuth.clientSecret
// 	}, function (err, fbRes) {
// 		console.log(facebookAuth.accessTokenUser)
// 		console.log(fbRes.access_token)
// 	})
// })
















app.listen(PORT, () => {
  console.log(`App running on localhost:${PORT}.`)
})
