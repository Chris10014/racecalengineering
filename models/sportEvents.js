const raceSchema = new Schema ({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 5
    },

    sport: {
        //to do: enum validation based in sports collection
        type: String,
        required: true,
        min: 2,
        max: 4
    },

    endurance: {
        type: [{en: String, de: String }],
        default: []
    },

    start: {
        //To do: start date from sportEvent as default
        type= [{start: Date}],
        default: []
    },

    competition: {
        type: Boolean,
        default: true
    },

    multisport: {
        type: Boolean,
        default: false
    },

    virtual: {
        type: Boolean,
        default: false
    },

    courses: {
        type: [{course: String, distance: Number}],
        required: true
    }
}, {
    timestamp: true
});


const sportEventSchema = new Schema ({
    name: {
        type: String,
        unique: true,
        required: true,
        min: 5
    },

    host: {
        type: String,
        unique: true,
        required: true,
        min: 5
    },

    logo: {
        type: String,
        unique: false,
        default: ""
    },

    visual: {
        type: String,
        unique: false,
        default: ""
    },

    homepage: {
        type: URL,
        unique: false,
        required: true
    },

    start: {
        type: [{start: Date}],
        required: true
    },

    end: {
        type: [{end: Date}],
        default: []
    },

    city: {
        type: String,
        required: true,
        min: 3
    },

    postalCode: {
        type: Number,
        required: true,
        min: 3,
        max: 5
    },

    countryCode: {
        //To do: validate with enum from counries collection
        type: String,
        required: true,
        length: 2
    },

    private: {
        //true: only members of the host can choose the sportEvent
        type: Boolean,
        default: false
    },

    createdBy: {
        type: _id,
        required: true
    },

    maintainedBy: {
        type: [{userId: ObjectId}],
        default: []
    },

    races: [ raceSchema ]
}, {
    timestamp: true
});