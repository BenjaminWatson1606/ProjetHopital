<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MedecinRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=MedecinRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"medecin_read"}
 * })
 */
class Medecin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"medecin_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"medecin_read"})
     */
    private $NomMedecin;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"medecin_read"})
     */
    private $PrenomMedecin;

    /**
     * @ORM\OneToOne(targetEntity=Vaccination::class, mappedBy="Medecin")
     * @Groups({"medecin_read"})
     */
    private $Vaccination;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, mappedBy="Medecin")
     */
    private $Compte;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomMedecin(): ?string
    {
        return $this->NomMedecin;
    }

    public function setNomMedecin(string $NomMedecin): self
    {
        $this->NomMedecin = $NomMedecin;

        return $this;
    }

    public function getPrenomMedecin(): ?string
    {
        return $this->PrenomMedecin;
    }

    public function setPrenomMedecin(string $PrenomMedecin): self
    {
        $this->PrenomMedecin = $PrenomMedecin;

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
