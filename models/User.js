const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
//    todoList: [{type: Types.ObjectId, ref: 'TodoList'}]
});

module.exports = model('User', schema)