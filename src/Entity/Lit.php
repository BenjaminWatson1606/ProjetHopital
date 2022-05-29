<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\LitRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=LitRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"lit_read"}
 * })
 */
class Lit
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"lit_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="boolean")
     * @Groups({"lit_read"})
     */
    private $Disponibilite;

    /**
     * @ORM\ManyToOne(targetEntity=Chambre::class, inversedBy="Lits")
     */
    private $Chambre;

    /**
     * @ORM\OneToOne(targetEntity=Patient::class, inversedBy="Lit")
     */
    private $Patient;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDisponibilite(): ?bool
    {
        return $this->Disponibilite;
    }

    public function setDisponibilite(bool $Disponibilite): self
    {
        $this->Disponibilite = $Disponibilite;

        return $this;
    }

    public function getChambre(): ?Chambre
    {
        return $this->Chambre;
    }

    public function setChambre(Chambre $Chambre): self
    {
        $this->Chambre = $Chambre;

        return $this;
    }

    public function getPatient(): ?Patient
    {
        return $this->Patient;
    }

    public function setPatient(Patient $Patient): self
    {
        $this->Patient = $Patient;

        return $this;
    }
}
