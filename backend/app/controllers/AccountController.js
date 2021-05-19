const Account = require('../models/Account')

class AccountController {
    index(req, res, next) {
        Account.find({})
            .then(acc => res.send(acc))
    }
    create(req, res, next) {
        const formData = req.body;
        const account = new Account(formData);
        account.acc = account.game + " " + Math.floor(Math.random() * Math.floor(9999));
        account.save()
        res.status(200).send({ message: "success" });
    }

    edit(req, res) {
        try {
            console.log(req.body)
            Account.findByIdAndUpdate(req.body.id, req.body, (err, result) => {
                if (err) {
                    return res
                        .status(500)
                        .send({ error: "unsuccessful" })
                };
                res.send({ success: "success" });
            })
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error EDIT',
            })
        }
    }

    delete(req, res) {
        try {
            Account.findOne({ _id: req.body.id }).deleteOne().exec();
            res.status(200).send({ message: "success" });
        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: 'Error DELETE',
            })
        }
    }
    // function name(params) {

    // }
}
module.exports = new AccountController;