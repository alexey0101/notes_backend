var mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL DB! [User]");
});

const generateJWT = (user) => {
    return jwt.sign({ username: user.username}, process.env.JWT_SECRET, { expiresIn: '30 days' });
};

exports.findByUsername = async (username) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT * FROM user WHERE username = ?", [username], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.create = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO user(username, hashedPassword) VALUES(?, ?)', [user.username, hashedPassword], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.login = async (user) => {
    const dbUser = await this.findByUsername(user.username);
    if (dbUser.length == 0) {
        return null;
    }
    const isMatch = await bcrypt.compare(user.password, dbUser[0].hashedPassword);
    if (!isMatch) {
        return null;
    }
    return generateJWT(user);
};

process.on('exit', () => {
  con.end((err) => {
    if (err) throw err;
    console.log('Connection closed!');
  });
});