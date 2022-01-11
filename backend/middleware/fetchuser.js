const jwt = require('jsonwebtoken');
const JWT_SECRET = "paawanisagoodb$oy";

const fetchuser = (req, res, next) => {
    // get the user from jwt token and add id to the req object
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send({ error: 'please authenticate using a valid token' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        // next() function is baically that (req, res) thing means after varification that callback function is executed 
        next();

    } catch (error) {
        res.status(401).send({ error: 'please authenticate using a valid token' });
    }

}

module.exports = fetchuser;