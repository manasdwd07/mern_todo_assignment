const jwt = require('jsonwebtoken');

// Middlewares which checks for user token in request header


// @middleware 
// @desc Authenticating user with JWT
// access Public
function auth(req, res, next) {
    const header = req.headers['authorization'];
    const token = header.split(' ')[1];

    // Check for token
    if (!token) {
        res.status(401).json({ msg: 'No token!!! Authorization denied' })
    }
 
    jwt.verify(token, 'secretkey', (err, data) => {
        if (err) {
            res.status(403);
        }
        else {
            next();
        }
    });
}

module.exports = auth;