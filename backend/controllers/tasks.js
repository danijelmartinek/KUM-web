const Task = require('./../models/task.js')

const tasksData = (req, res) => {
    Task.find({}, (err, tasks) => {
        if(err){
            throw new Error(`Can't get events data.`);
        }
    
        return res.status(200).send({
            success: true,
            tasks: tasks
        })
    })
}

const createTask = (req, res) => {
    Task.create(req.body, (err, task) => {
        if (err) {
            return next(err);
        } else {
            return res.status(200).json({
                success: true
            })
        }
    })
}

const deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id, (err, task) => {
        if(err){
            return res.status(200).send({
                success: false,
                message: "Can't delete event."
            })
        }

        return tasksData(req, res)
    })
}

const assignTask = (req, res) => {
    Task.findOneAndUpdate({ _id: req.body._id }, { $set: { "assigned.users": req.body.assignedUsers}}, {new: true}, (err, doc) => {
        if (err) {
            return next(err);
        } else {
            return res.status(200).json({
                success: true
            })
        }
    });
}

module.exports = {
    tasksData,
    createTask,
    deleteTask,
    assignTask
}