const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { reset } = require('nodemon');


class AdminController {
    index(req, res, next) {
        Admin.find({})
            .then(acc => res.send(acc))
    }
    async create(req, res, next) {
        try {
            const admin = new Admin(req.body);
            const token = await jwt.sign({ _id: admin._id }, 'lemon')
            admin.token = token
            admin.save()
            res.status(200).send({ admin, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }
    async login(req, res, next) {
        try {
            const { password, name } = req.body;
            const admin = await Admin.findOne({ name })
            if (!admin) {
                throw new Error({ error: 'Không tìm thấy tài khoản' })
            }
            const isPasswordMatch = await bcrypt.compare(password, admin.password)
            if (!isPasswordMatch) {
                res.status(400).send({ error: "Mật khẩu không hợp lệ" })
            }
            const token = await jwt.sign({ _id: admin._id }, 'lemon')
            admin.token = token
            admin.save()
            res.send({ admin })
        } catch (error) {
            res.status(400).send(error)
        }
    }
    async getEmail(req, res, next) {
        try {

        } catch (error) {

        }
    }
    async changePassword(req, res, next) {
        try {
            const { oldPW, confirmPW1, confirmPW2, token } = req.body

            const admin = await Admin.findOne({ token })
            if (confirmPW1 !== confirmPW2) {
                res.status(400).send({ error: "Mật khẩu không khớp" })
            }
            const isPasswordMatch = await bcrypt.compare(oldPW, admin.password)
            if (!isPasswordMatch) {
                res.status(400).send({ error: "Mật khẩu cũ không đúng" })
            }
            const newToken = await jwt.sign({ _id: admin._id }, 'lemon')
            admin.token = newToken
            admin.password = confirmPW1
            admin.save()
            res.send({ newToken })
        } catch (error) {
            res.status(400).send(error)
        }
    }
    // function name(params) {

    // }
}
module.exports = new AdminController;