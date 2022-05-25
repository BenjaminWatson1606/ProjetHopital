<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VaccinRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=VaccinRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"vaccin_read"}
 * })
 */
class Vaccin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"vaccin_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"vaccin_read"})
     */
    private $TypeVaccin;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"vaccin_read"})
     */
    private $Reserve;

    /**
     * @ORM\OneToOne(targetEntity=Vaccination::class, inversedBy="vaccins")
     */
    private $Vaccination;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTypeVaccin(): ?string
    {
        return $this->TypeVaccin;
    }

    public function setTypeVaccin(string $TypeVaccin): self
    {
        $this->TypeVaccin = $TypeVaccin;

        return $this;
    }

    public function getReserve(): ?bool
    {
        return $this->Reserve;
    }

    public function setReserve(bool $Reserve): self
    {
        $this->Reserve = $Reserve;

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
