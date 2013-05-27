SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `gitification_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `gitification_db` ;

-- -----------------------------------------------------
-- Table `gitification_db`.`application`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`application` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`application` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `site` VARCHAR(80) NULL ,
  `callback` VARCHAR(80) NULL ,
  `admin` VARCHAR(80) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`user` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `application_id` INT NOT NULL ,
  `firstname` VARCHAR(80) NULL ,
  `lastname` VARCHAR(80) NULL ,
  `email` VARCHAR(80) NULL ,
  `login` VARCHAR(80) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_user_application_idx` (`application_id` ASC) ,
  CONSTRAINT `fk_user_application`
    FOREIGN KEY (`application_id` )
    REFERENCES `gitification_db`.`application` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`badge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`badge` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`badge` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `application_id` INT NOT NULL ,
  `name` VARCHAR(80) NULL ,
  `icon` VARCHAR(80) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_badge_application1_idx` (`application_id` ASC) ,
  CONSTRAINT `fk_badge_application1`
    FOREIGN KEY (`application_id` )
    REFERENCES `gitification_db`.`application` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`rule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`rule` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`rule` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `application_id` INT NOT NULL ,
  `badge_id` INT NOT NULL ,
  `name` VARCHAR(80) NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_rule_application1_idx` (`application_id` ASC) ,
  INDEX `fk_rule_badge1_idx` (`badge_id` ASC) ,
  CONSTRAINT `fk_rule_application1`
    FOREIGN KEY (`application_id` )
    REFERENCES `gitification_db`.`application` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rule_badge1`
    FOREIGN KEY (`badge_id` )
    REFERENCES `gitification_db`.`badge` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`type` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`type` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `name` VARCHAR(80) NULL ,
  `application_id` INT NOT NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_type_application1_idx` (`application_id` ASC) ,
  CONSTRAINT `fk_type_application1`
    FOREIGN KEY (`application_id` )
    REFERENCES `gitification_db`.`application` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`rule_has_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`rule_has_type` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`rule_has_type` (
  `rule_id` INT NOT NULL ,
  `type_id` INT NOT NULL ,
  `threshold` INT NULL ,
  PRIMARY KEY (`rule_id`, `type_id`) ,
  INDEX `fk_rule_has_type_type1_idx` (`type_id` ASC) ,
  INDEX `fk_rule_has_type_rule1_idx` (`rule_id` ASC) ,
  CONSTRAINT `fk_rule_has_type_rule1`
    FOREIGN KEY (`rule_id` )
    REFERENCES `gitification_db`.`rule` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rule_has_type_type1`
    FOREIGN KEY (`type_id` )
    REFERENCES `gitification_db`.`type` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`event` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`event` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `type_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `application_id` INT NOT NULL ,
  `issued` TIMESTAMP NULL ,
  PRIMARY KEY (`id`) ,
  INDEX `fk_event_type1_idx` (`type_id` ASC) ,
  INDEX `fk_event_user1_idx` (`user_id` ASC) ,
  INDEX `fk_event_application1_idx` (`application_id` ASC) ,
  CONSTRAINT `fk_event_type1`
    FOREIGN KEY (`type_id` )
    REFERENCES `gitification_db`.`type` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `gitification_db`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_application1`
    FOREIGN KEY (`application_id` )
    REFERENCES `gitification_db`.`application` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gitification_db`.`user_has_badge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gitification_db`.`user_has_badge` ;

CREATE  TABLE IF NOT EXISTS `gitification_db`.`user_has_badge` (
  `user_id` INT NOT NULL ,
  `badge_id` INT NOT NULL ,
  PRIMARY KEY (`user_id`, `badge_id`) ,
  INDEX `fk_user_has_badge_badge1_idx` (`badge_id` ASC) ,
  INDEX `fk_user_has_badge_user1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_has_badge_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `gitification_db`.`user` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_badge_badge1`
    FOREIGN KEY (`badge_id` )
    REFERENCES `gitification_db`.`badge` (`id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `gitification_db` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
