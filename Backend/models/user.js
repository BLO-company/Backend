

const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    verify: {
        type: Boolean,
        default: false
    },
    license: {
        type: Boolean,
        default: false
    },
    creditCard: {
        type: Boolean,
        default: false
    }

});

UserSchema.method('toJSON', function() {
    const { __v, _id, password, verify, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);