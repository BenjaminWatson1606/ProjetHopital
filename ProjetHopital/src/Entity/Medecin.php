<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\MedecinRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

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
     * @Groups({"medecin_read", "vaccination_read"})
     */
    private $NomMedecin;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"medecin_read","vaccination_read"})
     */
    private $PrenomMedecin;

    /**
     * @ORM\OneToMany(targetEntity=Vaccination::class, mappedBy="Medecin")
     * @Groups({"medecin_read"})
     */
    private $Vaccinations;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, mappedBy="Medecin")
     */
    private $Compte;

    public function __construct()
    {
        $this->Vaccinations = new ArrayCollection();
    }

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

    public function getVaccinations(): ?Collection
    {
        return $this->Vaccinations;
    }

    public function addVaccination(Vaccination $Vaccination): self
    {
        if (!$this->Vaccinations->contains($Vaccination)) {
            $this->Vaccinations[] = $Vaccination;
            $Vaccination->setMedecin($this);
        }

        return $this;
    }

    public function removeVaccination(Vaccination $Vaccination): self
    {
        if ($this->Vaccinations->removeElement($Vaccination)){
            if ($Vaccination->getMedecin() === $this) {
                $Vaccination->setMedecin(null);
            }
        }
        return $this;
    }
   
}
