const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
      //  let token = req.cookies.Authorization;
        let token = req.header('Authorization');
        if (!token || token.length == 0) {
            throw new Error();
        }
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByUsername(decoded.username);

        if (!user) {
            throw new Error();
        }
        req.user = user[0];

        next();
    } catch (e) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = auth;