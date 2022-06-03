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
     * @Groups({"vaccin_read","vaccination_read"})
     */
    private $TypeVaccin;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"vaccin_read"})
     */
    private $Reserve;

    /**
     * @ORM\OneToMany(targetEntity=Vaccination::class, mappedBy="Vaccin")
     */
    private $Vaccinations;

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

    public function getReserve(): ?int
    {
        return $this->Reserve;
    }

    public function setReserve(int $Reserve): self
    {
        $this->Reserve = $Reserve;

        return $this;
    }

    public function getVaccination(): ?Collection
    {
        return $this->Vaccinations;
    }

    public function addVaccin(Vaccination $Vaccination): self
    {
        if (!$this->Vaccinations->contains($Vaccination)) {
            $this->Vaccinations[] = $Vaccination;
            $Vaccination->setVaccin($this);
        }

        return $this;
    }

    public function removeVaccin(Vaccination $Vaccination): self
    {
        if ($this->Vaccinations->removeElement($Vaccination)){
            if ($Vaccination->getVaccin() === $this) {
                $Vaccination->setVaccin(null);
            }
        }
        
        return $this;
    }
}
