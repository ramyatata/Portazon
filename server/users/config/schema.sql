DROP DATABASE IF EXISTS portazon;

CREATE DATABASE portazon;

USE portazon;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  pw VARCHAR (300),
  salt VARCHAR (300),
  email VARCHAR (250),
  street VARCHAR (300),
  num VARCHAR (10),
  city VARCHAR (30),
  state VARCHAR (50),
  zip VARCHAR (10),
  country VARCHAR (30)
);

CREATE TABLE shopping_cart (
  userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart VARCHAR (10000)
);

CREATE TABLE user_invoices (
  userID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  invoices TEXT
);

INSERT INTO users (
  firstname,
  lastname,
  pw,
  salt,
  email,
  street,
  num,
  city,
  state,
  zip,
  country
  ) VALUES (
  'John',
  'Doe',
  'abcd1234',
  'salty',
  'johndoe@gmail.com',
  'wicked rd',
  '734',
  'San Francisco',
  'CA',
  '94063',
  'USA'
);

ALTER TABLE shopping_cart ADD FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE user_invoices ADD FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE;

INSERT INTO shopping_cart (cart, userID) VALUES ('{"666ABCD": 4}', 1);

INSERT INTO user_invoices (invoices, userID) VALUES ('{"XX666ABCDXX": 4}', 1);

