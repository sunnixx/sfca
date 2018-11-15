const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Fees = require('../models/Fees');

router.get('/test/login', (req, res, next) => {
    res.sendFile(__dirname.split('/Routes')[0] + '/test/pages/login.html');
})

router.post('/api/addstudents', (req, res, next) => {
    let fees = new Fees();

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);

        if (user !== null) {

            fees.uid = user._id;
            fees.firstName = req.body.fname;
            fees.lastName = req.body.lname;
            fees.grade = req.body.grade;

            fees.save((err) => {
                if (err) return next(err);

                return res.json({ msg: true })
            })
        }
    })
})

router.post('/api/signup', (req, res, next) => {
    let userinfo = new User();

    userinfo.title = req.body.title;
    userinfo.name = req.body.name;
    userinfo.email = req.body.email;

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);

        if (user === null) {
            userinfo.save((err) => {
                if (err) return next(err);

                return res.json({ msg: true })
            })
        } else {
            return res.json({ msg: false })
        }
    })
});

router.post('/api/existingemail', (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return next(err);
        console.log(user);
        if (user == null) {
            return res.json({ msg: false })
        } else {
            return res.json({ msg: true, user })
        }
    })
})

module.exports = router;