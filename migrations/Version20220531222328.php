<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220531222328 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX uniq_bfec55b9ed5ca9e6');
        $this->addSql('CREATE INDEX IDX_BFEC55B9ED5CA9E6 ON infirmier (service_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP INDEX IDX_BFEC55B9ED5CA9E6');
        $this->addSql('CREATE UNIQUE INDEX uniq_bfec55b9ed5ca9e6 ON infirmier (service_id)');
    }
}
