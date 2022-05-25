<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AbsenceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=AbsenceRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"absences_read"}
 * })
 */
#[ApiFilter(SearchFilter::class, properties: ['profil.id'])]

class Absence
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"absences_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="date")
     * @Groups({"absences_read"})
     */
    private $StartAbsenceDate;

    /**
     * @ORM\Column(type="date")
     * @Groups({"absences_read"})
     */
    private $EndAbsenceDate;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"absences_read"})
     */
    private $AbsenceReason;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"absences_read"})
     */
    private $AbsenceType;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"absences_read"})
     */
    private $AbsenceStatus;

    // /**
    //  * @ORM\ManyToOne(targetEntity=Profil::class, inversedBy="absences")
    //  * @Groups({"absences_read"})
    //  */
    // private $profil;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartAbsenceDate(): ?\DateTimeInterface
    {
        return $this->StartAbsenceDate;
    }

    public function setStartAbsenceDate(\DateTimeInterface $StartAbsenceDate): self
    {
        $this->StartAbsenceDate = $StartAbsenceDate;

        return $this;
    }

    public function getEndAbsenceDate(): ?\DateTimeInterface
    {
        return $this->EndAbsenceDate;
    }

    public function setEndAbsenceDate(\DateTimeInterface $EndAbsenceDate): self
    {
        $this->EndAbsenceDate = $EndAbsenceDate;

        return $this;
    }

    public function getAbsenceReason(): ?string
    {
        return $this->AbsenceReason;
    }

    public function setAbsenceReason(string $AbsenceReason): self
    {
        $this->AbsenceReason = $AbsenceReason;

        return $this;
    }

    public function getAbsenceType(): ?string
    {
        return $this->AbsenceType;
    }

    public function setAbsenceType(string $AbsenceType): self
    {
        $this->AbsenceType = $AbsenceType;

        return $this;
    }

    public function getAbsenceStatus(): ?string
    {
        return $this->AbsenceStatus;
    }

    public function setAbsenceStatus(string $AbsenceStatus): self
    {
        $this->AbsenceStatus = $AbsenceStatus;

        return $this;
    }

    public function getProfil(): ?Profil
    {
        return $this->profil;
    }

    public function setProfil(?Profil $profil): self
    {
        $this->profil = $profil;

        return $this;
    }
}
