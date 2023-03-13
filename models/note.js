var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL DB! [Note]");
});

exports.create = async (note, userId) => {
    return new Promise((resolve, reject) => {
        con.query('INSERT INTO note (title, content, user_id) VALUES (?, ?, ?)', [note.title, note.content, userId], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.findAll = async (userId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM note WHERE user_id = ?', [userId], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.findById = async (noteId, userId) => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM note WHERE id = ? AND user_id = ?', [noteId, userId], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.update = async (noteId, note, userId) => {
    return new Promise((resolve, reject) => {
        con.query('UPDATE note SET title = ?, content = ? WHERE id = ? AND user_id = ?', [note.title, note.content, noteId, userId], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

exports.delete = async (noteId, userId) => {
    return new Promise((resolve, reject) => {
        con.query('DELETE FROM note WHERE id = ? AND user_id = ?', [noteId, userId], function (err, result) {
        if (err) reject(err);
        resolve(result);
        });
    });
};

process.on('exit', () => {
    con.end((err) => {
      if (err) throw err;
      console.log('Connection closed!');
    });
});