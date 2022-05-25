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
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="chambres")
     * @Groups({"chambre_read"})
     */
    private $Service;

    /**
     * @ORM\ManyToOne(targetEntity=Lit::class, inversedBy="chambres")
     * @Groups({"chambre_read"})
     */
    private $Lit;

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

    public function getLit(): ?Lit
    {
        return $this->Lit;
    }

    public function setLit(Lit $Lit): self
    {
        $this->Lit = $Lit;

        return $this;
    }
}
