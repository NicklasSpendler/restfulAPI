const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cache = require('memory-cache');
const uuid = require('uuid/v1');

async function getToken(req, res, next) {
    console.log('test')
    try {
        let token = await authenticateUser(req.fields.email, req.fields.password);
        let refreshToken = uuid();
        cache.put(refreshToken, req.fields.email);
        res.json({ token, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error
        })
    }
};

async function authenticateUser(email, password) {
    try {
        let user = await User.findOne(
            {
                where: {
                    email: email
                }
            }
        )
        if (!user) {
            return Promise.reject("User not found");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return Promise.reject("Email or password incorrect");
        }
        let userObject = { user: user.email };
        let token = generateToken(userObject, '300s')
        return token;
    } catch (error) {
        console.error(error);
        return Promise.reject("Shit happened")
    }
}

async function checkToken(req, res, next) {
    if (!cache.get(req.fields.refreshToken)) {
        res.status(404).end();
        return false
    }

    let email = cache.get(req.fields.refreshToken)

    cache.del(req.fields.refreshToken);

    let user = await User.findOne(
        {
            where: {
                email
            }
        }
    )

    if (!user) {
        res.status(404).end();
        return;
    }
    let newRefreshToken = uuid();
    let userObject = { user: user.email };
    let token = generateToken(userObject, '300s')
    cache.put(newRefreshToken, user.email);
    res.json({
        newRefreshToken, token
    })
}

function generateToken(userObject, exp = "300"){
    return jwt.sign({data: userObject}, 
    process.env.JWT_SECRET, {expiresIn: exp});

    
}

module.exports = {
    getToken,
    checkToken
};