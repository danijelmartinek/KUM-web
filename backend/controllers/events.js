const Event = require('./../models/event.js')

const eventsData = (req, res) => {
    Event.find({}, (err, events) => {
        if(err){
            throw new Error(`Can't get events data.`);
        }
    
        return res.status(200).send({
            success: true,
            events: events
        })
    })
}

const eventById = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
        if(err){
            return res.status(200).send({
                success: false,
                message: "Can't get event data."
            })
        }

        return res.status(200).send({
            success: true,
            event: event
        })

    })
}

const deleteEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, user) => {
        if(err){
            return res.status(200).send({
                success: false,
                message: "Can't delete event."
            })
        }

        return eventsData(req, res)
    })
}

const multiEventDelete = (req, res) => {
    const eventIds = req.body.events
    
    Event.deleteMany({_id: {$in: eventIds}}, (err, event) => {
        if(err){
            return res.status(200).send({
                success: false,
                message: "Can't delete events."
            })
        }

        return eventsData(req, res)
    })
}

module.exports = {
    eventsData,
    eventById,
    deleteEvent,
    multiEventDelete
}