const jwt = require('jsonwebtoken');

function isAuthorized(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).end();
        return;
    }
    if (req.headers.authorization.indexOf('Bearer') == -1) {
        res.status(401).end();
        return;
    }

    console.log('Dette er en test', req.headers.authorization);
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (err, token) {
        if (err) {
            console.log(err);
            res.status(400).end();
            return;
        };
        
        next();
    });
}

function isolateToken(authorization) {
    return authorization.split(" ")[1];
}

module.exports = {
    isAuthorized
};