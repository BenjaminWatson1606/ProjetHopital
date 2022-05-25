<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\AbsenceRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=InfirmierRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"infirmier_read"}
 * })
 */
class Infirmier
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"infirmier_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"infirmier_read"})
     */
    private $NomInfirmier;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"infirmier_read"})
     */
    private $PrenomInfirmier;

    /**
     * @ORM\OneToOne(targetEntity=Compte::class, inversedBy="infirmiers")
     */
    private $Compte;

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
}
