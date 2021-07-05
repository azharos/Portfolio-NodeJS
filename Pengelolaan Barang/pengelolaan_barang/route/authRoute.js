const express = require('express');
const router = express.Router();
const User_m = require('../model/user_m');
const passwordHash = require('password-hash');
const mid = require('../middleware/mid');

router.get('/', mid.ceklogin ,(req,res) => {
    res.render('index',{layout: 'layout/main'})
})

router.get('/login', mid.cekUser ,(req,res) => {
    res.render('auth/login', {layout: 'layout/auth'});
})

router.post('/login', async (req,res) => {
    const user = await User_m.findOne({username : req.body.username});

    // Cek Username
    if (user) {
        
        // Cek Password
        if (passwordHash.verify(req.body.password, user.password)) {
            
            req.session.idUser = user.id;
            res.redirect('/');
        } else {
            res.redirect('/login');
        }

    } else{
        res.redirect('/login');
    }
})

router.get('/logout', (req,res) => {
    req.session.destroy(function(err) {
        if (err) throw err;
    })

    return res.redirect('/login');
})

module.exports = router;