<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VaccinationRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

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
     * @ORM\Column(type="date")
     * @Groups({"vaccination_read"})
     */
    private $DateDebut;

    /**
     * @ORM\Column(type="date")
     * @Groups({"vaccination_read"})
     */
    private $DateFin;

    /**
     * @ORM\OneToOne(targetEntity=Vaccin::class, inversedBy="vaccinations")
     */
    private $Vaccin;

    /**
     * @ORM\OneToOne(targetEntity=Secretaire::class, inversedBy="vaccinations")
     */
    private $Secretaire;

    /**
     * @ORM\OneToOne(targetEntity=Medecin::class, inversedBy="vaccinations")
     */
    private $Medecin;

    /**
     * @ORM\OneToOne(targetEntity=Patient::class, inversedBy="vaccinations")
     */
    private $Patients;

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

    public function setVaccin(Vaccin $Vaccin): self
    {
        $this->Vaccin = $Vaccin;

        return $this;
    }

    public function getSecretaire(): ?Secretaire
    {
        return $this->Secretaire;
    }

    public function setSecretaire(Secretaire $Secretaire): self
    {
        $this->Secretaire = $Secretaire;

        return $this;
    }

    public function getMedecin(): ?Medecin
    {
        return $this->Medecin;
    }

    public function setMedecin(Medecin $Medecin): self
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
