<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VaccinationRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

/**
 * @ORM\Entity(repositoryClass=VaccinationRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"vaccination_read"}
 * })
 */
class Vaccination
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vaccination_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"vaccination_read"})
     */
    private $DateDebut;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"vaccination_read"})
     */
    private $DateFin;

    /**
     * @ORM\ManyToOne(targetEntity=Vaccin::class, inversedBy="Vaccinations")
     * @Groups({"vaccination_read"})
     */
    private $Vaccin;

    /**
     * @ORM\OneToOne(targetEntity=Secretaire::class, inversedBy="Vaccination")
     * @Groups({"vaccination_read"})
     */
    private $Secretaire;

    /**
     * @ORM\ManyToOne(targetEntity=Medecin::class, inversedBy="Vaccinations")
     * @Groups({"vaccination_read"})
     */
    private $Medecin;

    /**
     * @ORM\OneToOne(targetEntity=Patient::class, inversedBy="Vaccination")
     * @Groups({"vaccination_read"})
     */
    private $Patient;

    public function __construct()
    {
        $this->Vaccins = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->DateDebut;
    }

    public function setDateDebut(\DateTimeInterface $DateDebut): self
    {
        $this->DateDebut = $DateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->DateFin;
    }

    public function setDateFin(\DateTimeInterface $DateFin): self
    {
        $this->DateFin = $DateFin;

        return $this;
    }

    public function getVaccin(): ?Vaccin
    {
        return $this->Vaccin;
    }

    public function setVaccin(?Vaccin $Vaccin): self
    {
        $this->Vaccin = $Vaccin;

        return $this;
    }

    public function getSecretaire(): ?Secretaire
    {
        return $this->Secretaire;
    }

    public function setSecretaire(?Secretaire $Secretaire): self
    {
        $this->Secretaire = $Secretaire;

        return $this;
    }

    public function getMedecin(): ?Medecin
    {
        return $this->Medecin;
    }

    public function setMedecin(?Medecin $Medecin): self
    {
        $this->Medecin = $Medecin;

        return $this;
    }

    public function getPatient(): ?Patient
    {
        return $this->Patient;
    }

    public function setPatient(Patient $Patient): self
    {
        $this->Patient = $Patient;

        return $this;
    }
}
