var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    fbId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    startTime: { 
        type: Date
    },
    endTime: { 
        type: Date
    },
    eventTimes: [{
        startTime: { 
            type: Date
        },
        endTime: { 
            type: Date
        },
        id: {
            type: String,
        }
    }],
    place: {
        name: {
            type: String
        },
        location: {
            city: {
                type: String
            },
            country: {
                type: String
            },
            latitude: {
                type: Number
            },
            longitude: {
                type: Number
            },
            street: {
                type: String
            },
            zip: {
                type: String
            },
        },
        id: {
            type: String,
        }
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    publishStatus: {
        type: String
    },
    attendingCount: {
        type: Number,
        default: '0'
    },
    maybeCount: {
        type: Number,
        default: '0'
    },
    interestedCount: {
        type: Number,
        default: '0'
    },
    declinedCount: {
        type: Number,
        default: '0'
    },
    noreplyCount: {
        type: Number,
        default: '0'
    },
    cover: {
        offsetX: {
            type: Number,
            default: 50
        },
        offsetY: {
            type: Number,
            default: 50
        },
        source: {
            type: String
        },
        id: {
            type: String,
            unique: true
        }
    },
    admins: [{
        name: {
            type: String,
            required: true
        },
        username: {
            type: String
        },
        profileType: {
            type: String
        },
        picLarge: {
            type: String
        },
        picSmall: {
            type: String
        },
        link: {
            type: String
        },
        id: {
            type: String
        }
    }],
    ticketUri: {
        type: String
    },
    ticketUriStartSalesTime: { 
        type: Date
    },
    ticketingPrivacyUri: {
        type: String
    },
    ticketingTermsUri: {
        type: String
    },
    fbUpdatedTime: {
        type: Date
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

var Event = mongoose.model('Event', EventSchema);
module.exports = Event;