const {Schema, model, Types} = require('mongoose')

const CONTENT_PAGE_STATUS_ACTIVE = 1;
const CONTENT_PAGE_STATUS_DELETED = 2;
const CONTENT_PAGE_STATUSES = [
    CONTENT_PAGE_STATUS_ACTIVE,
    CONTENT_PAGE_STATUS_DELETED
]

const CONTENT_PAGE_LANGUAGE_EN = 'en'
const CONTENT_PAGE_LANGUAGE_DE = 'de'
const CONTENT_PAGE_LANGUAGE_NL = 'nl'
const CONTENT_PAGE_LANGUAGE_ES = 'es'
const CONTENT_PAGE_ALLOWED_LANGUAGES = [
    CONTENT_PAGE_LANGUAGE_EN,
    CONTENT_PAGE_LANGUAGE_DE,
    CONTENT_PAGE_LANGUAGE_NL,
    CONTENT_PAGE_LANGUAGE_ES
]

module.exports.CONTENT_PAGE_STATUS_ACTIVE = CONTENT_PAGE_STATUS_ACTIVE
module.exports.CONTENT_PAGE_STATUS_DELETED = CONTENT_PAGE_STATUS_DELETED
module.exports.CONTENT_PAGE_STATUSES = CONTENT_PAGE_STATUSES

module.exports.CONTENT_PAGE_ALLOWED_LANGUAGES = CONTENT_PAGE_ALLOWED_LANGUAGES

const schema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    content: {type: Map, of: String, required: true},
    status: {type: Number, required: true, enum: CONTENT_PAGE_STATUSES}
});


module.exports.ContentPage = model('ContentPage', schema)
