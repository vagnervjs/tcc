SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

ALTER TABLE `tcc`.`aluno` DROP FOREIGN KEY `fk_aluno_turma1` ;

ALTER TABLE `tcc`.`aluno` DROP COLUMN `turma_idturma` , CHANGE COLUMN `idaluno` `idaluno` INT(11) NOT NULL AUTO_INCREMENT  
, DROP PRIMARY KEY 
, ADD PRIMARY KEY (`idaluno`) 
, DROP INDEX `fk_aluno_turma1_idx` ;

ALTER TABLE `tcc`.`curso` CHANGE COLUMN `idcurso` `idcurso` INT(11) NOT NULL AUTO_INCREMENT  ;

ALTER TABLE `tcc`.`disciplina` CHANGE COLUMN `iddisciplina` `iddisciplina` INT(11) NOT NULL AUTO_INCREMENT  ;

ALTER TABLE `tcc`.`turma` CHANGE COLUMN `idturma` `idturma` INT(11) NOT NULL AUTO_INCREMENT  , ADD COLUMN `turmaNome` VARCHAR(45) NULL DEFAULT NULL  AFTER `idturma` ;

ALTER TABLE `tcc`.`professor` CHANGE COLUMN `idprofessor` `idprofessor` INT(11) NOT NULL AUTO_INCREMENT  , CHANGE COLUMN `nomeProf` `nomeProfessor` VARCHAR(45) NULL DEFAULT NULL  ;

ALTER TABLE `tcc`.`material` CHANGE COLUMN `idmaterial` `idmaterial` INT(11) NOT NULL AUTO_INCREMENT  ;

CREATE  TABLE IF NOT EXISTS `tcc`.`aluno_has_turma` (
  `aluno_idaluno` INT(11) NOT NULL ,
  `turma_idturma` INT(11) NOT NULL ,
  PRIMARY KEY (`aluno_idaluno`, `turma_idturma`) ,
  INDEX `fk_aluno_has_turma_turma1_idx` (`turma_idturma` ASC) ,
  INDEX `fk_aluno_has_turma_aluno1_idx` (`aluno_idaluno` ASC) ,
  CONSTRAINT `fk_aluno_has_turma_aluno1`
    FOREIGN KEY (`aluno_idaluno` )
    REFERENCES `tcc`.`aluno` (`idaluno` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluno_has_turma_turma1`
    FOREIGN KEY (`turma_idturma` )
    REFERENCES `tcc`.`turma` (`idturma` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

CREATE  TABLE IF NOT EXISTS `tcc`.`comentario` (
  `idcomentario` INT(11) NOT NULL ,
  `idAluno` INT(11) NOT NULL ,
  `idMaterial` INT(11) NOT NULL ,
  `comentario` VARCHAR(100) NULL DEFAULT NULL ,
  `data` DATETIME NULL DEFAULT NULL ,
  PRIMARY KEY (`idcomentario`, `idAluno`, `idMaterial`) ,
  INDEX `aluno_idx` (`idAluno` ASC) ,
  INDEX `material_idx` (`idMaterial` ASC) ,
  CONSTRAINT `aluno`
    FOREIGN KEY (`idAluno` )
    REFERENCES `tcc`.`aluno` (`idaluno` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `material`
    FOREIGN KEY (`idMaterial` )
    REFERENCES `tcc`.`material` (`idmaterial` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
