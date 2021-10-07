const countrySchema = new Schema ({
    id: Number,
    phoneCode: Number,
    countryCode: {
        type: String,
        required: true,
        length: 2
    },

    countryNameEn: String,

    counryNameDe: String,

    alpha_3: {
        type: String,
        length: 3
    },

    continentCode: String,

    continentNameEn: String
}, {
    timestamp: true
});