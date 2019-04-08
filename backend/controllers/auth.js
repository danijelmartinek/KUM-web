const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const app = require('./../server.js')
const helpers = require('./../util/helpers.js')
const User = require('./../models/user.js')

const saltRounds = 10


const register = (req, res) => {
    // making sure none of the fields are empty
    if (
        helpers.isEmpty(req.body.email) ||
        helpers.isEmpty(req.body.password)
    ) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }
  
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        var userData = {
            email: req.body.email,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: '',
            phoneNumber: '',
            about: '',
            membershipFeePaid: false,
            role: {
                roleLevel: 1,
                roleCaption: ''
            }
        }
  
        User.create(userData, (err, user) => {
            if (err) {
                return next(err);
            } else {
    
                const userObject = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    phoneNumber: user.phoneNumber,
                    about: user.about,
                    membershipFeePaid: user.membershipFeePaid,
                    role: {
                        roleLevel: user.role.roleLevel,
                        roleCaption: user.role.roleCaption
                    }
                }
        
                // create token
                let token = jwt.sign(userObject, app.get("appSecret"));
        
                return res.status(200).cookie('access_token', token, {
                    maxAge: 3600000,
                    httpOnly: true,
                    // secure: true
                }).json({
                    success: true
                })
            }

        })
    })
}

const takenEmails = (req, res) => {
    User.find({}, (err, users) => {
        if(err){
            throw new Error(`Can't get user data.`);
        }

        var userEmails = []
    
        users.forEach((user, index) => {
            userEmails[index] = user.email
        })
    
        return res.status(200).send({
            success: true,
            userEmails: userEmails
        })
    })
}


const login = (req, res) => {

    if (
        helpers.isEmpty(req.body.email) ||
        helpers.isEmpty(req.body.password)
    ) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }
  
    User.findOne({email: req.body.email}, (err, user) => {
        if (err) {
            throw err
        } else {
            if (user == undefined) {
                return res.json({
                    success: false,
                    message: "Sorry, wrong email"
                })
            }
    
            let authenticated = bcrypt.compareSync(req.body.password, user.password)
            delete user.password;
    
            if (authenticated) {
                const userObject = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    avatar: user.avatar,
                    phoneNumber: user.phoneNumber,
                    about: user.about,
                    membershipFeePaid: user.membershipFeePaid,
                    role: {
                        roleLevel: user.role.roleLevel,
                        roleCaption: user.role.roleCaption
                    }
                }
        
                // create token
                let token = jwt.sign(userObject, app.get("appSecret"))
        
                return res.status(200).cookie('access_token', token, {
                    maxAge: 3600000,
                    httpOnly: true,
                    // secure: true
                }).json({
                    success: true
                })
            }
        
            return res.json({
                success: false,
                message: "Wrong Password, please retry"
            })
        
        }
    })
}

const logout = (req, res) => {
    let token = req.cookies.access_token
  
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get("appSecret"), (err) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                })
            } else {
                return res.status(200).cookie('access_token', token, {
                    maxAge: Date.now(),
                    httpOnly: true,
                    // secure: true
                }).clearCookie("access_token").json({
                    success: true,
                    message: "Logged out successfully."
                })
            }
        })
    } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    }
}

const authentication = (req, res) => {
    let token = req.cookies.access_token
  
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get("appSecret"), (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                })
            } else {
                // if everything is good, save to request for use in other routes
                return res.status(200).send({
                    success: true,
                    userData: decoded
                })
            }
        })
    } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: "No token provided."
        })
    }
}

// middleware for protecting routes --------------------
const authMiddleware = (req, res, next) => {
    let token = req.cookies.access_token
  
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get("appSecret"), (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                });
            } else {
                // if everything is good, save to request for use in other routes
                res.locals.user = decoded
                res.locals.success = true
                next()
            }
        })
    } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: "No token provided."
        })
    }
}

module.exports = {
    register,
    takenEmails,
    login,
    logout,
    authentication,
    authMiddleware
}