<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChambreRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=ChambreRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"chambre_read"}
 * })
 */
#[ApiFilter(SearchFilter::class, properties: ['Service.id' => 'exact'])]
class Chambre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"chambre_read", "lit_read"})
     */
    private $id;
    
    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="Chambres")
     * @Groups({"chambre_read"})
     */
    private $Service;

    /**
     * @ORM\OneToMany(targetEntity=Lit::class, mappedBy="Chambre")
     * @Groups({"chambre_read"})
     */
    private $Lits;

    public function __construct()
    {
        $this->Lits = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getService(): ?Service
    {
        return $this->Service;
    }

    public function setService(?Service $Service): self
    {
        $this->Service = $Service;

        return $this;
    }

    /**
     * @return Collection|Lit[]
     */
    public function getLits(): ?Collection
    {
        return $this->Lits;
    }

    public function addLit(Lit $Lit): self
    {
        if (!$this->Lits->contains($Lit)) {
            $this->Lits[] = $Lit;
            $Lit->setChambre($this);
        }

        return $this;
    }

    public function removeLit(Lit $Lit): self
    {
        if ($this->Lits->removeElement($Lit)){
            if ($Lit->getChambre() === $this) {
                $Lit->setChambre(null);
            }
        }
        

        return $this;
    }
}
