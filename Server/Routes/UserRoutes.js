const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Fees = require('../models/Fees');

router.get('/test/login',(req,res,next) => {
    res.sendFile(__dirname.split('/Routes')[0] + '/test/pages/login.html');
})

router.post('/api/addstudents',(req,res,next) => {
    let fees = new Fees();

    fees.firstName = req.body.fname;
    fees.lastName = req.body.lname;
    fees.grade = req.body.grade;

    fees.save((err) => {
        if(err) return next(err);

        return res.json({msg: true})
    })

})

router.post('/api/signup', (req, res, next) => {
    let user = new User();
    // console.log(req.body);
    user.email = req.body.email;
    user.password = req.body.password;

    if (user.email !== '' && user.password !== '') {
        user.save((err) => {
            if (err) return next(err);

            console.log("User saved");
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;