-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema skydive
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema skydive
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `skydive` DEFAULT CHARACTER SET utf8 ;
USE `skydive` ;

-- -----------------------------------------------------
-- Table `skydive`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `imie` VARCHAR(45) NOT NULL,
  `nazwisko` VARCHAR(45) NOT NULL,
  `mail` VARCHAR(55) NOT NULL,
  `haslo` VARCHAR(100) NOT NULL,
  `telefon` VARCHAR(15) NOT NULL,
  `masa` INT NOT NULL DEFAULT 0,
  `usuniete_konto` TINYINT NULL DEFAULT 0,
  `zablokowane_do` DATETIME NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `username_UNIQUE` (`user_id`)
);

-- -----------------------------------------------------
-- Table `skydive`.`wiadomosci`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`wiadomosci` (
  `wiadomosci_id` INT NOT NULL AUTO_INCREMENT,
  `tytul` VARCHAR(100) NOT NULL,
  `tresc` VARCHAR(255) NOT NULL,
  `data_czas` DATETIME NOT NULL,
  `odczytane` TINYINT NULL,
  `nadawca_id` INT NOT NULL,
  `odbiorca_id` INT NOT NULL,
  PRIMARY KEY (`wiadomosci_id`),
  INDEX `fk_wiadomosci_user1_idx` (`odbiorca_id`),
  INDEX `fk_wiadomosci_user2_idx` (`nadawca_id`),
  CONSTRAINT `fk_wiadomosci_user1`
    FOREIGN KEY (`odbiorca_id`)
    REFERENCES `skydive`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wiadomosci_user2`
    FOREIGN KEY (`nadawca_id`)
    REFERENCES `skydive`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);



-- -----------------------------------------------------
-- Table `skydive`.`rola`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`rola` (
  `rola_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rola_id`));


-- -----------------------------------------------------
-- Table `skydive`.`rola_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`rola_user` (
  `rola_od` DATETIME NOT NULL,
  `rola_do` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  `rola_rola_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `rola_rola_id`),
  INDEX `fk_rola_user_user1_idx` (`user_id`),
  INDEX `fk_rola_user_rola1_idx` (`rola_rola_id`),
  CONSTRAINT `fk_rola_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skydive`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rola_user_rola1`
    FOREIGN KEY (`rola_rola_id`)
    REFERENCES `skydive`.`rola` (`rola_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `skydive`.`status_terminu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`status_terminu` (
  `status_terminu_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_terminu_id`));


-- -----------------------------------------------------
-- Table `skydive`.`planowane_terminy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`planowane_terminy` (
  `terminy_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  `data_czas` DATETIME NOT NULL,
  `liczba_miejsc_w_samolocie` INT NOT NULL,
  `miejsce_startu` VARCHAR(45) NOT NULL,
  `status_terminu_id` INT NOT NULL,
  PRIMARY KEY (`terminy_id`),
  INDEX `fk_planowane_terminy_status_terminu1_idx` (`status_terminu_id`),
  CONSTRAINT `fk_planowane_terminy_status_terminu1`
    FOREIGN KEY (`status_terminu_id`)
    REFERENCES `skydive`.`status_terminu` (`status_terminu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `skydive`.`sposob_platnosci`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`sposob_platnosci` (
  `sposob_platnosci_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`sposob_platnosci_id`),
  UNIQUE INDEX `platnosc_id_UNIQUE` (`sposob_platnosci_id`));


-- -----------------------------------------------------
-- Table `skydive`.`rodzaj_skoku`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`rodzaj_skoku` (
  `skok_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  `cena` DOUBLE NOT NULL,
  `liczba_miejsc_w_samolocie` INT NOT NULL,
  `wymagana_licencja` TINYINT NULL,
  `max_masa` INT NOT NULL,
  PRIMARY KEY (`skok_id`));


-- -----------------------------------------------------
-- Table `skydive`.`status_skoku`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`status_skoku` (
  `status_skoku_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_skoku_id`));


-- -----------------------------------------------------
-- Table `skydive`.`licencje`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`licencje` (
  `licencja_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  `do_kiedy_licencja` DATETIME NULL,
  `sciezka_do_skanu_licencji` VARCHAR(255) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`licencja_id`),
  INDEX `fk_licencje_user1_idx` (`user_id`),
  CONSTRAINT `fk_licencje_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skydive`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `skydive`.`status_platnosci`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`status_platnosci` (
  `status_platnosci_id` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_platnosci_id`));


-- -----------------------------------------------------
-- Table `skydive`.`platnosc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`platnosc` (
  `platnosc_id` INT NOT NULL AUTO_INCREMENT,
  `data_platnosci` DATETIME NULL,
  `wplacona_kwota` DOUBLE NULL,
  `status_platnosci_id` INT NOT NULL,
  `sposob_platnosci_id` INT NOT NULL,
  PRIMARY KEY (`platnosc_id`),
  INDEX `fk_platnosc_status_platnosci1_idx` (`status_platnosci_id`),
  INDEX `fk_platnosc_sposob_platnosci1_idx` (`sposob_platnosci_id`),
  CONSTRAINT `fk_platnosc_status_platnosci1`
    FOREIGN KEY (`status_platnosci_id`)
    REFERENCES `skydive`.`status_platnosci` (`status_platnosci_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_platnosc_sposob_platnosci1`
    FOREIGN KEY (`sposob_platnosci_id`)
    REFERENCES `skydive`.`sposob_platnosci` (`sposob_platnosci_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `skydive`.`rezerwacje_terminow`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `skydive`.`rezerwacje_terminow` (
  `rezerwacje_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `planowane_terminy_id` INT NOT NULL,
  `status_skoku_id` INT NOT NULL,
  `rodzaj_skoku_id` INT NOT NULL,
  `platnosc_id` INT NOT NULL,
  `cena` DOUBLE NOT NULL,
  PRIMARY KEY (`rezerwacje_id`),
  INDEX `fk_rezerwacje_terminow_user1_idx` (`user_id`),
  INDEX `fk_rezerwacje_terminow_planowane_terminy1_idx` (`planowane_terminy_id`),
  INDEX `fk_rezerwacje_terminow_status_skoku1_idx` (`status_skoku_id`),
  INDEX `fk_rezerwacje_terminow_rodzaj_skoku1_idx` (`rodzaj_skoku_id`),
  INDEX `fk_rezerwacje_terminow_platnosc1_idx` (`platnosc_id`),
  CONSTRAINT `fk_rezerwacje_terminow_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `skydive`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rezerwacje_terminow_planowane_terminy1`
    FOREIGN KEY (`planowane_terminy_id`)
    REFERENCES `skydive`.`planowane_terminy` (`terminy_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rezerwacje_terminow_status_skoku1`
    FOREIGN KEY (`status_skoku_id`)
    REFERENCES `skydive`.`status_skoku` (`status_skoku_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rezerwacje_terminow_rodzaj_skoku1`
    FOREIGN KEY (`rodzaj_skoku_id`)
    REFERENCES `skydive`.`rodzaj_skoku` (`skok_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rezerwacje_terminow_platnosc1`
    FOREIGN KEY (`platnosc_id`)
    REFERENCES `skydive`.`platnosc` (`platnosc_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- INSERT INTO dla Tabel
-- -----------------------------------------------------
INSERT INTO `skydive`.`sposob_platnosci` (`nazwa`) VALUES ('BLIK'), ('PayU'), ('Przelew bankowy'), ('Karta debetowa');
INSERT INTO `skydive`.`status_platnosci` (`nazwa`) VALUES ('Niezapłacone'), ('W trakcie'), ('Zapłacone');
INSERT INTO `skydive`.`rola` (`nazwa`) VALUES ('user'), ('employee'), ('owner');
INSERT INTO `skydive`.`status_skoku` (`nazwa`) VALUES ('Niezrealizowany'), ('Zrealizowany');
INSERT INTO `skydive`.`status_terminu` (`nazwa`) VALUES ('Wolne'), ('Zajęte');

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
