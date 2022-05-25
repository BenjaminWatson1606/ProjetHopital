<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220507145655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE absence_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE language_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE language_assignation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE profil_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE absence (id INT NOT NULL, start_absence_date DATE NOT NULL, end_absence_date DATE NOT NULL, absence_reason VARCHAR(200) NOT NULL, absence_type VARCHAR(200) NOT NULL, absence_status VARCHAR(200) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE language (id INT NOT NULL, caption VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE language_assignation (id INT NOT NULL, id_profil_id INT DEFAULT NULL, language_id INT NOT NULL, id_language_assignation INT NOT NULL, level INT NOT NULL, certification BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B1E64952A76B6C5F ON language_assignation (id_profil_id)');
        $this->addSql('CREATE INDEX IDX_B1E6495282F1BAF4 ON language_assignation (language_id)');
        $this->addSql('CREATE TABLE profil (id INT NOT NULL, utilisateur_id INT DEFAULT NULL, lastname VARCHAR(200) NOT NULL, firstname VARCHAR(200) NOT NULL, datebirth DATE NOT NULL, phone VARCHAR(255) DEFAULT NULL, email VARCHAR(255) DEFAULT NULL, biography VARCHAR(1000) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E6D6B297FB88E14F ON profil (utilisateur_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(200) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F85E0677 ON "user" (username)');
        $this->addSql('ALTER TABLE language_assignation ADD CONSTRAINT FK_B1E64952A76B6C5F FOREIGN KEY (id_profil_id) REFERENCES profil (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE language_assignation ADD CONSTRAINT FK_B1E6495282F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE profil ADD CONSTRAINT FK_E6D6B297FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE language_assignation DROP CONSTRAINT FK_B1E6495282F1BAF4');
        $this->addSql('ALTER TABLE language_assignation DROP CONSTRAINT FK_B1E64952A76B6C5F');
        $this->addSql('ALTER TABLE profil DROP CONSTRAINT FK_E6D6B297FB88E14F');
        $this->addSql('DROP SEQUENCE absence_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE language_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE language_assignation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE profil_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE absence');
        $this->addSql('DROP TABLE language');
        $this->addSql('DROP TABLE language_assignation');
        $this->addSql('DROP TABLE profil');
        $this->addSql('DROP TABLE "user"');
    }
}
