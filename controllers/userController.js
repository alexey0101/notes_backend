const User = require('../models/user');
const Note = require('../models/note');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        await Note.create({ title: "Добро пожаловать!", content: "В этом поле вы можете набирать текст заметки." }, user.insertId);
        res.status(201).send({});
    } catch (e) {
        res.status(400).send({ error: "User with the given username already exist!" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const token = await User.login(req.user);

        if (!token) {
            return res.status(401).send({ error: "Invalid credentials" });
        }

        //res.cookie('Authorization', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) });
        res.setHeader('Authorization', `Bearer ${token}`);
        res.setHeader("Access-Control-Expose-Headers","Authorization");
        res.status(200).send({});

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

/*exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie('Authorization');
        res.status(200).send({});
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};*/