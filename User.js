const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    adress: String,
    specialty: String,
    email: String,
    phone: Number,
});

module.exports = mongoose.model('User', userSchema);