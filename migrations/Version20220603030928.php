<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220603030928 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vaccin DROP CONSTRAINT fk_b5dca0a74ddccfa3');
        $this->addSql('DROP INDEX idx_b5dca0a74ddccfa3');
        $this->addSql('ALTER TABLE vaccin DROP vaccination_id');
        $this->addSql('ALTER TABLE vaccination ADD vaccin_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999999B14AC76 FOREIGN KEY (vaccin_id) REFERENCES vaccin (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_1B0999999B14AC76 ON vaccination (vaccin_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE vaccin ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vaccin ADD CONSTRAINT fk_b5dca0a74ddccfa3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_b5dca0a74ddccfa3 ON vaccin (vaccination_id)');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B0999999B14AC76');
        $this->addSql('DROP INDEX IDX_1B0999999B14AC76');
        $this->addSql('ALTER TABLE vaccination DROP vaccin_id');
    }
}
