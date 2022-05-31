<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"service_read"}
 * })
 */
class Service
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"service_read", "chambre_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"service_read", "chambre_read"})
     */
    private $NomService;

    /**
     * @ORM\OneToMany(targetEntity=Chambre::class, mappedBy="Service")
     */
    private $Chambres;

    /**
     * @ORM\OneToOne(targetEntity=Infirmier::class, mappedBy="Service")
     */
    private $Infirmier;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomService(): ?string
    {
        return $this->NomService;
    }

    public function setNomService(string $NomService): self
    {
        $this->NomService = $NomService;

        return $this;
    }

    public function getChambres(): ?Collection
    {
        return $this->Chambres;
    }

    public function setChambres(Chambre $Chambres): self
    {
        $this->Chambres = $Chambres;

        return $this;
    }

    public function getInfirmier(): ?Infirmier
    {
        return $this->Infirmier;
    }

    public function setInfirmier(Infirmier $Infirmier): self
    {
        $this->Infirmier = $Infirmier;

        return $this;
    }
}
