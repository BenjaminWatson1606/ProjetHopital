<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SecretaireRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=SecretaireRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"secretaire_read"}
 * })
 */
class Secretaire
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"secretaire_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"secretaire_read"})
     */
    private $NomSecretaire;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"secretaire_read"})
     */
    private $PrenomSecretaire;

    /**
     * @ORM\OneToOne(targetEntity=Vaccination::class, mappedBy="Secretaire")
     * @Groups({"secretaire_read"})
     */
    private $Vaccination;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, mappedBy="Secretaire")
     */
    private $Compte;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomSecretaire(): ?string
    {
        return $this->NomSecretaire;
    }

    public function setNomSecretaire(string $NomSecretaire): self
    {
        $this->NomSecretaire = $NomSecretaire;

        return $this;
    }

    public function getPrenomSecretaire(): ?string
    {
        return $this->PrenomSecretaire;
    }

    public function setPrenomSecretaire(string $PrenomSecretaire): self
    {
        $this->PrenomSecretaire = $PrenomSecretaire;

        return $this;
    }

    public function getCompte(): ?Compte
    {
        return $this->Compte;
    }

    public function setCompte(Compte $Compte): self
    {
        $this->Compte = $Compte;

        return $this;
    }

    public function getVaccination(): ?Vaccination
    {
        return $this->Vaccination;
    }

    public function setVaccination(Vaccination $Vaccination): self
    {
        $this->Vaccination = $Vaccination;

        return $this;
    }
}
