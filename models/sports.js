const sportSchema = new Schema ({
    code: {
        type: String,
        required: true,
        min: 2,
        max: 4
    },

    de: {
        type: String,
        required: true
    },

    en: {
        type: String,
        default: ""
    }
}, {
    timestamp: true
});

