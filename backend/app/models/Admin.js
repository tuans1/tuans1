const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Admin = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, },
    email: { type: String, required: true, },
    token: { type: String},
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now }
});

Admin.pre('save', async function (next) {
    // Hash the password before saving the admin model
    const admin = this
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
})

Admin.methods.generateAuthToken = async function() {
    // Generate an auth token for the admin
    const admin = this
    const token = jwt.sign({_id: admin._id}, process.env.JWT_KEY)
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

Admin.methods.findByCredentials = async (name, password) => {
    // Search for a admin by name and password.
    const admin = await Admin.findOne({ name} )
    if (!admin) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, admin.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return admin
}

module.exports = mongoose.model('Admin', Admin);