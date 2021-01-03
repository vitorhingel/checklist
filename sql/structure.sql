-- MySQL Script generated by MySQL Workbench
-- Fri Jan  1 18:39:19 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema checklist
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `checklist` ;

-- -----------------------------------------------------
-- Schema checklist
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `checklist` DEFAULT CHARACTER SET utf8 ;
USE `checklist` ;

-- -----------------------------------------------------
-- Table `checklist`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checklist`.`users` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `checklist`.`checklists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checklist`.`checklists` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(500) NOT NULL,
  `public` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`));


-- -----------------------------------------------------
-- Table `checklist`.`users_own_checklists`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checklist`.`users_own_checklists` (
  `user` INT UNIQUE NOT NULL,
  `checklist` INT UNIQUE NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role` ENUM('view', 'edit', 'owner') NOT NULL DEFAULT 'view',
  PRIMARY KEY (`user`, `checklist`),
  INDEX `fk_dating_users_idx` (`user` ASC) VISIBLE,
  INDEX `fk_dating_checklists1_idx` (`checklist` ASC) VISIBLE,
  CONSTRAINT `fk_dating_users`
    FOREIGN KEY (`user`)
    REFERENCES `checklist`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dating_checklists1`
    FOREIGN KEY (`checklist`)
    REFERENCES `checklist`.`checklists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `checklist`.`options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `checklist`.`options` (
  `id` INT UNIQUE NOT NULL AUTO_INCREMENT,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` INT UNIQUE NOT NULL,
  `checklist` INT UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_options_users1_idx` (`author` ASC) VISIBLE,
  INDEX `fk_options_checklists1_idx` (`checklist` ASC) VISIBLE,
  CONSTRAINT `fk_options_users1`
    FOREIGN KEY (`author`)
    REFERENCES `checklist`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_options_checklists1`
    FOREIGN KEY (`checklist`)
    REFERENCES `checklist`.`checklists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
