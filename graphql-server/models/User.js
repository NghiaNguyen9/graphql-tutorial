const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
})

module.exports = mongoose.model('User', UserSchema);