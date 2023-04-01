CREATE TABLE users
(
    id SERIAL,
    name text,
    password text,
    username text
);

INSERT INTO users(name, password, username) VALUES
 ('João Silva', '1234', 'joao.silva')