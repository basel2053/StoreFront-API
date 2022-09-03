CREATE TABLE orders(id SERIAL PRIMARY KEY,status VARCHAR(50),user_id INTEGER REFERENCES users(id));
INSERT INTO orders(status,user_id) VALUES ('active',1);
-- cant repeat the user_id property
INSERT INTO orders(status,user_id) VALUES ('complete',1); 
INSERT INTO orders(status,user_id) VALUES ('complete',1); 
INSERT INTO orders(status,user_id) VALUES ('complete',2); 
INSERT INTO orders(status,user_id) VALUES ('complete',2); 