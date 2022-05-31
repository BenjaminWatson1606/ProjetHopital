<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220531174657 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE lit DROP CONSTRAINT FK_5DDB8E9D6B899279');
        $this->addSql('ALTER TABLE lit ADD CONSTRAINT FK_5DDB8E9D6B899279 FOREIGN KEY (patient_id) REFERENCES patient (id) ON DELETE SET NULL NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE lit DROP CONSTRAINT fk_5ddb8e9d6b899279');
        $this->addSql('ALTER TABLE lit ADD CONSTRAINT fk_5ddb8e9d6b899279 FOREIGN KEY (patient_id) REFERENCES patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
