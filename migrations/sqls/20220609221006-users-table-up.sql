CREATE TABLE users(id SERIAL PRIMARY KEY,firstname VARCHAR(30),lastname VARCHAR(30),password VARCHAR(100));
INSERT INTO users(firstname,lastname,password) VALUES ('bassel','salah','password123');
INSERT INTO users(firstname,lastname,password) VALUES ('john','doe','123456');