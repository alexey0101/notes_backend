const validateUser = async (req, res, next) => {
    const user = req.body;
    if (user.username && user.password) {
        req.user = user;
        next();
    } else {
        res.status(400).send({ error: "Invalid user structure" });
    }
};

module.exports = validateUser;