const User = require('./../models/user.js')

const allowedRoles = [0, 1, 2, 3, 4, 5]

const usersData = (req, res) => {
    if(allowedRoles.includes(res.locals.user.role)){
        User.find({}, (err, users) => {
            if(err){
                throw new Error(`Can't get user data.`);
            }
    
            var usersArray = []
        
            users.forEach((user, index) => {
                usersArray[index] = {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
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

module.exports = {
    usersData
}