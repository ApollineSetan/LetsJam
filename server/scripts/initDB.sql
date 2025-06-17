# This script initializes the database for the LetsJam application.

DROP DATABASE IF EXISTS letsjam;
CREATE DATABASE letsjam;
USE letsjam;

CREATE TABLE section (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(50) NOT NULL
);

CREATE TABLE demo (
 id INT AUTO_INCREMENT PRIMARY KEY,
 title VARCHAR(50) NOT NULL,
 description TEXT NULL,
 image_url VARCHAR(255) NULL,
 audio_url VARCHAR(255),
 duration INT NOT NULL,
 createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
 section_id INT NULL,
 FOREIGN KEY (section_id) REFERENCES section(id) ON DELETE SET NULL
);
