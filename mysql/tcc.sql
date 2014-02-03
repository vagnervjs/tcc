SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `tcc` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `tcc` ;

-- -----------------------------------------------------
-- Table `tcc`.`turma`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`turma` (
  `idturma` INT NOT NULL ,
  PRIMARY KEY (`idturma`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`aluno`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`aluno` (
  `idaluno` INT NOT NULL ,
  `turma_idturma` INT NOT NULL ,
  `nomeAluno` VARCHAR(45) NULL ,
  PRIMARY KEY (`idaluno`, `turma_idturma`) ,
  INDEX `fk_aluno_turma1_idx` (`turma_idturma` ASC) ,
  CONSTRAINT `fk_aluno_turma1`
    FOREIGN KEY (`turma_idturma` )
    REFERENCES `tcc`.`turma` (`idturma` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`curso`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`curso` (
  `idcurso` INT NOT NULL ,
  `nomeCurso` VARCHAR(45) NULL ,
  PRIMARY KEY (`idcurso`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`disciplina`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`disciplina` (
  `iddisciplina` INT NOT NULL ,
  `nomeDisciplina` VARCHAR(45) NULL ,
  PRIMARY KEY (`iddisciplina`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`professor`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`professor` (
  `idprofessor` INT NOT NULL ,
  `nomeProf` VARCHAR(45) NULL ,
  PRIMARY KEY (`idprofessor`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`material`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`material` (
  `idmaterial` INT NOT NULL ,
  `titulo` VARCHAR(45) NULL ,
  `desc` VARCHAR(100) NULL ,
  `data` DATETIME NULL ,
  `tipo` VARCHAR(45) NULL ,
  PRIMARY KEY (`idmaterial`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`aluno_has_curso`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`aluno_has_curso` (
  `aluno_idaluno` INT NOT NULL ,
  `curso_idcurso` INT NOT NULL ,
  PRIMARY KEY (`aluno_idaluno`, `curso_idcurso`) ,
  INDEX `fk_aluno_has_curso_curso1_idx` (`curso_idcurso` ASC) ,
  INDEX `fk_aluno_has_curso_aluno_idx` (`aluno_idaluno` ASC) ,
  CONSTRAINT `fk_aluno_has_curso_aluno`
    FOREIGN KEY (`aluno_idaluno` )
    REFERENCES `tcc`.`aluno` (`idaluno` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_aluno_has_curso_curso1`
    FOREIGN KEY (`curso_idcurso` )
    REFERENCES `tcc`.`curso` (`idcurso` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`turma_has_disciplina`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`turma_has_disciplina` (
  `turma_idturma` INT NOT NULL ,
  `disciplina_iddisciplina` INT NOT NULL ,
  PRIMARY KEY (`turma_idturma`, `disciplina_iddisciplina`) ,
  INDEX `fk_turma_has_disciplina_disciplina1_idx` (`disciplina_iddisciplina` ASC) ,
  INDEX `fk_turma_has_disciplina_turma1_idx` (`turma_idturma` ASC) ,
  CONSTRAINT `fk_turma_has_disciplina_turma1`
    FOREIGN KEY (`turma_idturma` )
    REFERENCES `tcc`.`turma` (`idturma` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_turma_has_disciplina_disciplina1`
    FOREIGN KEY (`disciplina_iddisciplina` )
    REFERENCES `tcc`.`disciplina` (`iddisciplina` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`curso_has_disciplina`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`curso_has_disciplina` (
  `curso_idcurso` INT NOT NULL ,
  `disciplina_iddisciplina` INT NOT NULL ,
  PRIMARY KEY (`curso_idcurso`, `disciplina_iddisciplina`) ,
  INDEX `fk_curso_has_disciplina_disciplina1_idx` (`disciplina_iddisciplina` ASC) ,
  INDEX `fk_curso_has_disciplina_curso1_idx` (`curso_idcurso` ASC) ,
  CONSTRAINT `fk_curso_has_disciplina_curso1`
    FOREIGN KEY (`curso_idcurso` )
    REFERENCES `tcc`.`curso` (`idcurso` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_curso_has_disciplina_disciplina1`
    FOREIGN KEY (`disciplina_iddisciplina` )
    REFERENCES `tcc`.`disciplina` (`iddisciplina` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`turma_has_material`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`turma_has_material` (
  `turma_idturma` INT NOT NULL ,
  `material_idmaterial` INT NOT NULL ,
  PRIMARY KEY (`turma_idturma`, `material_idmaterial`) ,
  INDEX `fk_turma_has_material_material1_idx` (`material_idmaterial` ASC) ,
  INDEX `fk_turma_has_material_turma1_idx` (`turma_idturma` ASC) ,
  CONSTRAINT `fk_turma_has_material_turma1`
    FOREIGN KEY (`turma_idturma` )
    REFERENCES `tcc`.`turma` (`idturma` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_turma_has_material_material1`
    FOREIGN KEY (`material_idmaterial` )
    REFERENCES `tcc`.`material` (`idmaterial` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tcc`.`disciplina_has_professor`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `tcc`.`disciplina_has_professor` (
  `disciplina_iddisciplina` INT NOT NULL ,
  `professor_idprofessor` INT NOT NULL ,
  PRIMARY KEY (`disciplina_iddisciplina`, `professor_idprofessor`) ,
  INDEX `fk_disciplina_has_professor_professor1_idx` (`professor_idprofessor` ASC) ,
  INDEX `fk_disciplina_has_professor_disciplina1_idx` (`disciplina_iddisciplina` ASC) ,
  CONSTRAINT `fk_disciplina_has_professor_disciplina1`
    FOREIGN KEY (`disciplina_iddisciplina` )
    REFERENCES `tcc`.`disciplina` (`iddisciplina` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_disciplina_has_professor_professor1`
    FOREIGN KEY (`professor_idprofessor` )
    REFERENCES `tcc`.`professor` (`idprofessor` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `tcc` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
