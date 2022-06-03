<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220603031554 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE patient ALTER date_arrivee DROP NOT NULL');
        $this->addSql('ALTER TABLE patient ALTER date_depart DROP NOT NULL');
        $this->addSql('DROP INDEX uniq_1b0999999b14ac76');
        $this->addSql('DROP INDEX uniq_1b0999994f31a84');
        $this->addSql('ALTER TABLE vaccination ALTER date_debut TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE vaccination ALTER date_debut DROP DEFAULT');
        $this->addSql('ALTER TABLE vaccination ALTER date_fin TYPE TIMESTAMP(0) WITHOUT TIME ZONE');
        $this->addSql('ALTER TABLE vaccination ALTER date_fin DROP DEFAULT');
        $this->addSql('CREATE INDEX IDX_1B0999999B14AC76 ON vaccination (vaccin_id)');
        $this->addSql('CREATE INDEX IDX_1B0999994F31A84 ON vaccination (medecin_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE patient ALTER date_arrivee SET NOT NULL');
        $this->addSql('ALTER TABLE patient ALTER date_depart SET NOT NULL');
        $this->addSql('DROP INDEX IDX_1B0999999B14AC76');
        $this->addSql('DROP INDEX IDX_1B0999994F31A84');
        $this->addSql('ALTER TABLE vaccination ALTER date_debut TYPE DATE');
        $this->addSql('ALTER TABLE vaccination ALTER date_debut DROP DEFAULT');
        $this->addSql('ALTER TABLE vaccination ALTER date_fin TYPE DATE');
        $this->addSql('ALTER TABLE vaccination ALTER date_fin DROP DEFAULT');
        $this->addSql('CREATE UNIQUE INDEX uniq_1b0999999b14ac76 ON vaccination (vaccin_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_1b0999994f31a84 ON vaccination (medecin_id)');
    }
}
