const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

UserSchema.pre('save', async function (next) {
    try {
        if (this.role === 'admin') {
            // Only hash the password if the user is an admin
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(this.password, salt);
            this.password = passwordHash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
