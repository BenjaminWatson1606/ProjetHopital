<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ChambreRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
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
class Chambre
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"chambre_read"})
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

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getService(): ?Service
    {
        return $this->Service;
    }

    public function setService(Service $Service): self
    {
        $this->Service = $Service;

        return $this;
    }

    public function getLits(): ?Lit
    {
        return $this->Lits;
    }

    public function setLits(Lit $Lits): self
    {
        $this->Lits = $Lits;

        return $this;
    }
}
