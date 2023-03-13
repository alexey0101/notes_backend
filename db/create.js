var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL DB! [Main]");
    con.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, function (err, result) {
      if (err) throw err;
      console.log("Database created/selected");
  
      con.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.user (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL UNIQUE, hashedPassword VARCHAR(255) NOT NULL)`, function (err, result) {
        if (err) throw err;
        console.log("User table created/ignored");
  
        con.query(`CREATE TABLE IF NOT EXISTS ${process.env.DB_NAME}.note (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES user(id))`, function (err, result) {
          if (err) throw err;
          console.log("Note table created/ignored");
        });
      });
    });
  });