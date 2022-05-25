<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220525211136 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE chambre_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE compte_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE infirmier_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE lit_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE medecin_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE patient_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE secretaire_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE vaccin_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE vaccination_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE chambre (id INT NOT NULL, service_id INT DEFAULT NULL, lit_id INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C509E4FFED5CA9E6 ON chambre (service_id)');
        $this->addSql('CREATE INDEX IDX_C509E4FF278B5057 ON chambre (lit_id)');
        $this->addSql('CREATE TABLE compte (id INT NOT NULL, infirmier_id INT DEFAULT NULL, secretaire_id INT DEFAULT NULL, username VARCHAR(200) NOT NULL, password VARCHAR(200) NOT NULL, roles JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CFF65260F85E0677 ON compte (username)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CFF65260C2BE0752 ON compte (infirmier_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_CFF65260A90F02B2 ON compte (secretaire_id)');
        $this->addSql('CREATE TABLE infirmier (id INT NOT NULL, compte_id INT DEFAULT NULL, nom_infirmier VARCHAR(200) NOT NULL, prenom_infirmier VARCHAR(200) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BFEC55B9F2C56620 ON infirmier (compte_id)');
        $this->addSql('CREATE TABLE lit (id INT NOT NULL, chambre_id INT DEFAULT NULL, patient_id INT DEFAULT NULL, disponibilite BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5DDB8E9D9B177F54 ON lit (chambre_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5DDB8E9D6B899279 ON lit (patient_id)');
        $this->addSql('CREATE TABLE medecin (id INT NOT NULL, vaccination_id INT DEFAULT NULL, compte_id INT DEFAULT NULL, nom_medecin VARCHAR(200) NOT NULL, prenom_medecin VARCHAR(200) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1BDA53C64DDCCFA3 ON medecin (vaccination_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1BDA53C6F2C56620 ON medecin (compte_id)');
        $this->addSql('CREATE TABLE patient (id INT NOT NULL, lit_id INT DEFAULT NULL, vaccination_id INT DEFAULT NULL, num_securite_sociale INT NOT NULL, nom_patient VARCHAR(200) NOT NULL, prenom_patient VARCHAR(200) NOT NULL, date_arrivee DATE NOT NULL, date_depart DATE NOT NULL, age_patient INT NOT NULL, adresse_patient VARCHAR(200) NOT NULL, type_patient BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1ADAD7EB278B5057 ON patient (lit_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1ADAD7EB4DDCCFA3 ON patient (vaccination_id)');
        $this->addSql('CREATE TABLE secretaire (id INT NOT NULL, vaccination_id INT DEFAULT NULL, compte_id INT DEFAULT NULL, nom_secretaire VARCHAR(200) NOT NULL, prenom_secretaire VARCHAR(200) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7DB5C2D04DDCCFA3 ON secretaire (vaccination_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7DB5C2D0F2C56620 ON secretaire (compte_id)');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, infirmier_id INT DEFAULT NULL, nom_service VARCHAR(255) NOT NULL, nombre_lit_dispo VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_E19D9AD2C2BE0752 ON service (infirmier_id)');
        $this->addSql('CREATE TABLE vaccin (id INT NOT NULL, vaccination_id INT DEFAULT NULL, type_vaccin VARCHAR(255) NOT NULL, reserve BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B5DCA0A74DDCCFA3 ON vaccin (vaccination_id)');
        $this->addSql('CREATE TABLE vaccination (id INT NOT NULL, vaccin_id INT DEFAULT NULL, secretaire_id INT DEFAULT NULL, medecin_id INT DEFAULT NULL, patients_id INT DEFAULT NULL, date_debut DATE NOT NULL, date_fin DATE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1B0999999B14AC76 ON vaccination (vaccin_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1B099999A90F02B2 ON vaccination (secretaire_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1B0999994F31A84 ON vaccination (medecin_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1B099999CEC3FD2F ON vaccination (patients_id)');
        $this->addSql('ALTER TABLE chambre ADD CONSTRAINT FK_C509E4FFED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE chambre ADD CONSTRAINT FK_C509E4FF278B5057 FOREIGN KEY (lit_id) REFERENCES lit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE compte ADD CONSTRAINT FK_CFF65260C2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE compte ADD CONSTRAINT FK_CFF65260A90F02B2 FOREIGN KEY (secretaire_id) REFERENCES secretaire (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B9F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lit ADD CONSTRAINT FK_5DDB8E9D9B177F54 FOREIGN KEY (chambre_id) REFERENCES chambre (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE lit ADD CONSTRAINT FK_5DDB8E9D6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE medecin ADD CONSTRAINT FK_1BDA53C64DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE medecin ADD CONSTRAINT FK_1BDA53C6F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EB278B5057 FOREIGN KEY (lit_id) REFERENCES lit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT FK_1ADAD7EB4DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE secretaire ADD CONSTRAINT FK_7DB5C2D04DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE secretaire ADD CONSTRAINT FK_7DB5C2D0F2C56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD2C2BE0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE vaccin ADD CONSTRAINT FK_B5DCA0A74DDCCFA3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999999B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B099999A90F02B2 FOREIGN KEY (secretaire_id) REFERENCES secretaire (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999994F31A84 FOREIGN KEY (medecin_id) REFERENCES medecin (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B099999CEC3FD2F FOREIGN KEY (patients_id) REFERENCES patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE lit DROP CONSTRAINT FK_5DDB8E9D9B177F54');
        $this->addSql('ALTER TABLE infirmier DROP CONSTRAINT FK_BFEC55B9F2C56620');
        $this->addSql('ALTER TABLE medecin DROP CONSTRAINT FK_1BDA53C6F2C56620');
        $this->addSql('ALTER TABLE secretaire DROP CONSTRAINT FK_7DB5C2D0F2C56620');
        $this->addSql('ALTER TABLE compte DROP CONSTRAINT FK_CFF65260C2BE0752');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD2C2BE0752');
        $this->addSql('ALTER TABLE chambre DROP CONSTRAINT FK_C509E4FF278B5057');
        $this->addSql('ALTER TABLE patient DROP CONSTRAINT FK_1ADAD7EB278B5057');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B0999994F31A84');
        $this->addSql('ALTER TABLE lit DROP CONSTRAINT FK_5DDB8E9D6B899279');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B099999CEC3FD2F');
        $this->addSql('ALTER TABLE compte DROP CONSTRAINT FK_CFF65260A90F02B2');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B099999A90F02B2');
        $this->addSql('ALTER TABLE chambre DROP CONSTRAINT FK_C509E4FFED5CA9E6');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B0999999B14AC76');
        $this->addSql('ALTER TABLE medecin DROP CONSTRAINT FK_1BDA53C64DDCCFA3');
        $this->addSql('ALTER TABLE patient DROP CONSTRAINT FK_1ADAD7EB4DDCCFA3');
        $this->addSql('ALTER TABLE secretaire DROP CONSTRAINT FK_7DB5C2D04DDCCFA3');
        $this->addSql('ALTER TABLE vaccin DROP CONSTRAINT FK_B5DCA0A74DDCCFA3');
        $this->addSql('DROP SEQUENCE chambre_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE compte_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE infirmier_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE lit_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE medecin_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE patient_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE secretaire_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE service_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE vaccin_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE vaccination_id_seq CASCADE');
        $this->addSql('DROP TABLE chambre');
        $this->addSql('DROP TABLE compte');
        $this->addSql('DROP TABLE infirmier');
        $this->addSql('DROP TABLE lit');
        $this->addSql('DROP TABLE medecin');
        $this->addSql('DROP TABLE patient');
        $this->addSql('DROP TABLE secretaire');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE vaccin');
        $this->addSql('DROP TABLE vaccination');
    }
}
