<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220530193826 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE chambre DROP CONSTRAINT fk_c509e4ff278b5057');
        $this->addSql('DROP INDEX idx_c509e4ff278b5057');
        $this->addSql('ALTER TABLE chambre DROP lit_id');
        $this->addSql('ALTER TABLE infirmier DROP CONSTRAINT fk_bfec55b9f2c56620');
        $this->addSql('DROP INDEX uniq_bfec55b9f2c56620');
        $this->addSql('ALTER TABLE infirmier RENAME COLUMN compte_id TO service_id');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT FK_BFEC55B9ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_BFEC55B9ED5CA9E6 ON infirmier (service_id)');
        $this->addSql('DROP INDEX uniq_5ddb8e9d9b177f54');
        $this->addSql('CREATE INDEX IDX_5DDB8E9D9B177F54 ON lit (chambre_id)');
        $this->addSql('ALTER TABLE medecin DROP CONSTRAINT fk_1bda53c64ddccfa3');
        $this->addSql('ALTER TABLE medecin DROP CONSTRAINT fk_1bda53c6f2c56620');
        $this->addSql('DROP INDEX uniq_1bda53c6f2c56620');
        $this->addSql('DROP INDEX uniq_1bda53c64ddccfa3');
        $this->addSql('ALTER TABLE medecin DROP vaccination_id');
        $this->addSql('ALTER TABLE medecin DROP compte_id');
        $this->addSql('ALTER TABLE patient DROP CONSTRAINT fk_1adad7eb278b5057');
        $this->addSql('ALTER TABLE patient DROP CONSTRAINT fk_1adad7eb4ddccfa3');
        $this->addSql('DROP INDEX uniq_1adad7eb4ddccfa3');
        $this->addSql('DROP INDEX uniq_1adad7eb278b5057');
        $this->addSql('ALTER TABLE patient DROP lit_id');
        $this->addSql('ALTER TABLE patient DROP vaccination_id');
        $this->addSql('ALTER TABLE patient ALTER type_patient TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE patient ALTER type_patient DROP DEFAULT');
        $this->addSql('ALTER TABLE secretaire DROP CONSTRAINT fk_7db5c2d04ddccfa3');
        $this->addSql('ALTER TABLE secretaire DROP CONSTRAINT fk_7db5c2d0f2c56620');
        $this->addSql('DROP INDEX uniq_7db5c2d0f2c56620');
        $this->addSql('DROP INDEX uniq_7db5c2d04ddccfa3');
        $this->addSql('ALTER TABLE secretaire DROP vaccination_id');
        $this->addSql('ALTER TABLE secretaire DROP compte_id');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT fk_e19d9ad2c2be0752');
        $this->addSql('DROP INDEX uniq_e19d9ad2c2be0752');
        $this->addSql('ALTER TABLE service DROP infirmier_id');
        $this->addSql('ALTER TABLE vaccin DROP CONSTRAINT fk_b5dca0a74ddccfa3');
        $this->addSql('DROP INDEX uniq_b5dca0a74ddccfa3');
        $this->addSql('ALTER TABLE vaccin DROP vaccination_id');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT fk_1b099999cec3fd2f');
        $this->addSql('DROP INDEX uniq_1b099999cec3fd2f');
        $this->addSql('ALTER TABLE vaccination RENAME COLUMN patients_id TO patient_id');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT FK_1B0999996B899279 FOREIGN KEY (patient_id) REFERENCES patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1B0999996B899279 ON vaccination (patient_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE service ADD infirmier_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT fk_e19d9ad2c2be0752 FOREIGN KEY (infirmier_id) REFERENCES infirmier (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_e19d9ad2c2be0752 ON service (infirmier_id)');
        $this->addSql('ALTER TABLE chambre ADD lit_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE chambre ADD CONSTRAINT fk_c509e4ff278b5057 FOREIGN KEY (lit_id) REFERENCES lit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_c509e4ff278b5057 ON chambre (lit_id)');
        $this->addSql('DROP INDEX IDX_5DDB8E9D9B177F54');
        $this->addSql('CREATE UNIQUE INDEX uniq_5ddb8e9d9b177f54 ON lit (chambre_id)');
        $this->addSql('ALTER TABLE infirmier DROP CONSTRAINT FK_BFEC55B9ED5CA9E6');
        $this->addSql('DROP INDEX UNIQ_BFEC55B9ED5CA9E6');
        $this->addSql('ALTER TABLE infirmier RENAME COLUMN service_id TO compte_id');
        $this->addSql('ALTER TABLE infirmier ADD CONSTRAINT fk_bfec55b9f2c56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_bfec55b9f2c56620 ON infirmier (compte_id)');
        $this->addSql('ALTER TABLE secretaire ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE secretaire ADD compte_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE secretaire ADD CONSTRAINT fk_7db5c2d04ddccfa3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE secretaire ADD CONSTRAINT fk_7db5c2d0f2c56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_7db5c2d0f2c56620 ON secretaire (compte_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_7db5c2d04ddccfa3 ON secretaire (vaccination_id)');
        $this->addSql('ALTER TABLE patient ADD lit_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE patient ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE patient ALTER type_patient TYPE BOOLEAN');
        $this->addSql('ALTER TABLE patient ALTER type_patient DROP DEFAULT');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT fk_1adad7eb278b5057 FOREIGN KEY (lit_id) REFERENCES lit (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE patient ADD CONSTRAINT fk_1adad7eb4ddccfa3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_1adad7eb4ddccfa3 ON patient (vaccination_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_1adad7eb278b5057 ON patient (lit_id)');
        $this->addSql('ALTER TABLE vaccination DROP CONSTRAINT FK_1B0999996B899279');
        $this->addSql('DROP INDEX UNIQ_1B0999996B899279');
        $this->addSql('ALTER TABLE vaccination RENAME COLUMN patient_id TO patients_id');
        $this->addSql('ALTER TABLE vaccination ADD CONSTRAINT fk_1b099999cec3fd2f FOREIGN KEY (patients_id) REFERENCES patient (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_1b099999cec3fd2f ON vaccination (patients_id)');
        $this->addSql('ALTER TABLE medecin ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE medecin ADD compte_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE medecin ADD CONSTRAINT fk_1bda53c64ddccfa3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE medecin ADD CONSTRAINT fk_1bda53c6f2c56620 FOREIGN KEY (compte_id) REFERENCES compte (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_1bda53c6f2c56620 ON medecin (compte_id)');
        $this->addSql('CREATE UNIQUE INDEX uniq_1bda53c64ddccfa3 ON medecin (vaccination_id)');
        $this->addSql('ALTER TABLE vaccin ADD vaccination_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE vaccin ADD CONSTRAINT fk_b5dca0a74ddccfa3 FOREIGN KEY (vaccination_id) REFERENCES vaccination (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE UNIQUE INDEX uniq_b5dca0a74ddccfa3 ON vaccin (vaccination_id)');
    }
}
