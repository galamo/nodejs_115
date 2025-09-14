SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `lecturer_management` ;
CREATE SCHEMA IF NOT EXISTS `lecturer_management` DEFAULT CHARACTER SET latin1 ;
USE `lecturer_management` ;


CREATE TABLE IF NOT EXISTS `lecturer_management`.`lecturer` (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  age INT,
  course_count INT,
  email VARCHAR(100) NOT NULL,
  created_at DATETIME NOT NULL,
  subject_nn VARCHAR(100), 
  subject_fullstack VARCHAR(100), 
  subject_nodejs VARCHAR(100), 
  subject_typescript VARCHAR(100), 
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC)
);
