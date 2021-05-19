const express = require('express')
const account = require('./account')
const admin = require('./admin')
const game = require('./game')
const jwt = require('jsonwebtoken')
// const middleware = require('../middleware/request')

function route(app) {


    app.use(function (req, res, next) {
        const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
        if (tokenFromClient) {
            // Nếu tồn tại token
            try {
                // Thực hiện giải mã token xem có hợp lệ hay không?
                const token = jwt.verify(tokenFromClient, 'lemon');
                next();
            } catch (error) {
                // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
                // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
                return res.status(401).json({
                    message: 'Unauthorized.',
                });
            }
        }
    })
    
    app.use('/account', account)
    app.use('/admin', admin)
    app.use('/game', game)
}

module.exports = route;