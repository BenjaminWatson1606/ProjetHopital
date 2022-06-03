<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ServiceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
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
     * @Groups({"service_read", "chambre_read", "infirmier_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     * @Groups({"service_read", "chambre_read", "infirmier_read"})
     */
    private $NomService;

    /**
     * @ORM\OneToMany(targetEntity=Chambre::class, mappedBy="Service")
     */
    private $Chambres;

    /**
     * @ORM\OneToMany(targetEntity=Infirmier::class, mappedBy="Service")
     * @Groups({"service_read"})
     */
    private $Infirmiers;

    public function __construct()
    {
        $this->Chambres = new ArrayCollection();
        $this->Infirmiers = new ArrayCollection();
    }

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

    /**
     * @return Collection|Chambre[]
     */
    public function getChambres(): ?Collection
    {
        return $this->Chambres;
    }

    public function addChambre(Chambre $Chambre): self
    {
        if (!$this->Chambres->contains($Chambre)) {
            $this->Chambres[] = $Chambre;
            $Chambre->setService($this);
        }

        return $this;
    }

    public function removeChambre(Chambre $Chambre): self
    {
        if ($this->Chambres->removeElement($Chambre)){
            if ($Chambre->getChambre() === $this) {
                $Chambre->setService(null);
            }
        }
        

        return $this;
    }

    /**
     * @return Collection|Infirmier[]
     */
    public function getInfirmiers(): ?Collection
    {
        return $this->Infirmiers;
    }

    public function addInfirmier(Infirmier $Infirmier): self
    {
        if (!$this->Infirmiers->contains($Infirmier)) {
            $this->Infirmiers[] = $Infirmier;
            $Infirmier->setService($this);
        }

        return $this;
    }

    public function removeInfirmier(Infirmier $Infirmier): self
    {
        if ($this->Infirmiers->removeElement($Infirmier)){
            if ($Infirmier->getInfirmier() === $this) {
                $Infirmier->setService(null);
            }
        }
        

        return $this;
    }
}
