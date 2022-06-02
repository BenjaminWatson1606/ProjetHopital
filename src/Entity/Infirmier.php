<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\InfirmierRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\ExistsFilter;


/**
 * @ORM\Entity(repositoryClass=InfirmierRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"infirmier_read"}
 * })
 */
#[ApiFilter(ExistsFilter::class, properties: ['Compte'])]
class Infirmier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"infirmier_read", "compte_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"infirmier_read", "compte_read"})
     */
    private $NomInfirmier;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"infirmier_read", "compte_read"})
     */
    private $PrenomInfirmier;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, mappedBy="Infirmier")
     */
    private $Compte;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="Infirmiers")
     * @Groups({"infirmier_read"})
     */
    private $Service;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomInfirmier(): ?string
    {
        return $this->NomInfirmier;
    }

    public function setNomInfirmier(string $NomInfirmier): self
    {
        $this->NomInfirmier = $NomInfirmier;

        return $this;
    }

    public function getPrenomInfirmier(): ?string
    {
        return $this->PrenomInfirmier;
    }

    public function setPrenomInfirmier(string $PrenomInfirmier): self
    {
        $this->PrenomInfirmier = $PrenomInfirmier;

        return $this;
    }

    public function getCompte(): ?Compte
    {
        return $this->Compte;
    }

    public function setCompte(Compte $Compte): self
    {
        $this->Compte = $Compte;

        return $this;
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
}
