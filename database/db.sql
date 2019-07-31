-- Creando base de datos --
CREATE DATABASE clientesdb;

-- Utilizando la base de datos --
use clientesdb;

CREATE TABLE cliente (

id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50) NOT NULL,
direccion VARCHAR(100) NOT NULL,
telefono VARCHAR(15)
);

-- Para mostrar todas las tablas --
SHOW TABLES;

-- Describir Tabla --
describe cliente;
