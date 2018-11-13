const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Fees = require('../models/Fees');

router.get('/test/login',(req,res,next) => {
    res.sendFile(__dirname.split('/Routes')[0] + '/test/pages/login.html');
})

router.post('/api/login',(req,res,next) => {
    
});

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