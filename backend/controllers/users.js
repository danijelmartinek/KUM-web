const User = require('./../models/user.js')

const allowedRoles = [0, 1, 2, 3, 4, 5]

const usersData = (req, res) => {
    if(allowedRoles.includes(res.locals.user.role.roleLevel)){
        User.find({}, (err, users) => {
            if(err){
                throw new Error(`Can't get users data.`);
            }
    
            var usersArray = []
        
            users.forEach((user, index) => {
                usersArray[index] = {
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
                    },
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
        
            return res.status(200).send({
                success: true,
                users: usersArray
            })
        })
    } else {
        return res.status(403).send({
            success: false,
            message: "Do not have permission!"
        })
    }
    
}

userById = (req, res) => {
    User.findById(req.params.id, function (err, user) {
        if(err){
            return res.status(200).send({
                success: false,
                message: "Can't get user data."
            })
        }

        userData = {
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
            },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }

        return res.status(200).send({
            success: true,
            user: userData
        })

    })
}

module.exports = {
    usersData,
    userById
}