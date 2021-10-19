const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        return res.status(500).json({
            message: false
        })
    }
    res.send(userList);
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({
            message: 'User with Id not found'
        })
    }
    res.status(200).send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save();

    if (!user)
    return res.status(400).send('user cannot be created')

    res.send(user);
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    const secret = process.env.secret;

    if (!user) {
        return res.status(400).send('User not found!');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            }, 
            secret,
            {
                expiresIn: '1d'
            }
        )
        return res.status(200).send({user: user.email, token: token});
    } else {
        return res.status(400).send('Password is incorrect');
    }
    // return res.status(200).send(user);
})

module.exports = router;