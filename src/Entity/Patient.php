<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\PatientRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=PatientRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"patient_read"}
 * })
 */

class Patient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"patient_read", "lit_read"})
     */
    private $id;

     /**
     * @ORM\Column(type="integer")
     * @Groups({"patient_read"})
     */
    private $NumSecuriteSociale;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"patient_read"})
     */
    private $NomPatient;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"patient_read"})
     */
    private $PrenomPatient;

    /**
     * @ORM\Column(type="date")
     * @Groups({"patient_read"})
     */
    private $DateArrivee;

    /**
     * @ORM\Column(type="date")
     * @Groups({"patient_read"})
     */
    private $DateDepart;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"patient_read"})
     */
    private $AgePatient;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"patient_read"})
     */
    private $AdressePatient;

    /**
     * @ORM\Column(type="string")
     * @Groups({"patient_read"})
     */
    private $TypePatient;

    /**
     * @ORM\OneToOne(targetEntity=Lit::class, mappedBy="Patient")
     */
    private $Lit;

    /**
     * @ORM\OneToOne(targetEntity=Vaccination::class, mappedBy="Patient")
     */
    private $Vaccination;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumSecuriteSociales(): ?int
    {
        return $this->NumSecuriteSociale;
    }

    public function setNumSecuriteSociale(int $NumSecuriteSociale): self
    {
        $this->NumSecuriteSociale = $NumSecuriteSociale;

        return $this;
    }

    public function getNomPatient(): ?string
    {
        return $this->NomPatient;
    }

    public function setNomPatient(string $NomPatient): self
    {
        $this->NomPatient = $NomPatient;

        return $this;
    }

    public function getPrenomPatient(): ?string
    {
        return $this->PrenomPatient;
    }

    public function setPrenomPatient(string $PrenomPatient): self
    {
        $this->PrenomPatient = $PrenomPatient;

        return $this;
    }

    public function getDateArrivee(): ?\DateTimeInterface
    {
        return $this->DateArrivee;
    }

    public function setDateArrivee(\DateTimeInterface $DateArrivee): self
    {
        $this->DateArrivee = $DateArrivee;

        return $this;
    }

    public function getDateDepart(): ?\DateTimeInterface
    {
        return $this->DateDepart;
    }

    public function setDateDepart(\DateTimeInterface $DateDepart): self
    {
        $this->DateDepart = $DateDepart;

        return $this;
    }

    public function getAgePatient(): ?int
    {
        return $this->AgePatient;
    }

    public function setAgePatient(int $AgePatient): self
    {
        $this->AgePatient = $AgePatient;

        return $this;
    }

    public function getAdressePatient(): ?string
    {
        return $this->AdressePatient;
    }

    public function setAdressePatient(string $AdressePatient): self
    {
        $this->AdressePatient = $AdressePatient;

        return $this;
    }

    public function getTypePatient(): ?string
    {
        return $this->TypePatient;
    }

    public function setTypePatient(string $TypePatient): self
    {
        $this->TypePatient = $TypePatient;

        return $this;
    }

    public function getLit(): ?Lit
    {
        return $this->Lit;
    }

    public function setLit(Lit $Lit): self
    {
        $this->Lit = $Lit;

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
