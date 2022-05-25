<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProfilRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\ORM\Mapping\InheritanceType;
use Doctrine\ORM\Mapping\DiscriminatorMap;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping\DiscriminatorColumn;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


/**
 * @ORM\Entity(repositoryClass=ProfilRepository::class)
 * @ApiResource(
 * normalizationContext={
 * "skip_null_values" = false,
 *  "groups"={"profils_read"}
 * })
 */
#[ApiFilter(SearchFilter::class, properties: ['crew' => 'exact'])]
#[ApiFilter(SearchFilter::class, properties: ['utilisateur.id'])]

class Profil
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"profils_read", "crews_read", "absences_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"profils_read", "crews_read", "absences_read"})
     */
    private $Lastname;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"profils_read", "crews_read", "absences_read"})
     */
    private $Firstname;

    /**
     * @ORM\Column(type="date")
     * @Groups({"profils_read", "crews_read"})
     */
    private $Datebirth;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"profils_read"})
     */
    private $Phone;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"profils_read"})
     */
    private $Email;


    /**
     * @ORM\Column(type="string", length=1000, nullable=true)
     * @Groups({"profils_read", "crews_read"})
     */
    private $Biography;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="profils")
     * @Groups({"profils_read", "crews_read"})
     */
    private $utilisateur;

    public function __construct()
    {
        $this->projectAssignations = new ArrayCollection();
        $this->disponibilities = new ArrayCollection();
        $this->languageAssignations = new ArrayCollection();
        $this->experiences = new ArrayCollection();
        $this->projections = new ArrayCollection();
        $this->skillAssignations = new ArrayCollection();
        $this->crews = new ArrayCollection();
        $this->crew2s = new ArrayCollection();
        $this->crew2sCollaborators = new ArrayCollection();
        $this->collaborators = new ArrayCollection();
        $this->formations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastname(): ?string
    {
        return $this->Lastname;
    }

    public function setLastname(string $Lastname): self
    {
        $this->Lastname = $Lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->Firstname;
    }

    public function setFirstname(string $Firstname): self
    {
        $this->Firstname = $Firstname;

        return $this;
    }

    public function getDatebirth(): ?\DateTimeInterface
    {
        return $this->Datebirth;
    }

    public function setDatebirth(\DateTimeInterface $Datebirth): self
    {
        $this->Datebirth = $Datebirth;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->Phone;
    }

    public function setPhone(?string $Phone): self
    {
        $this->Phone = $Phone;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->Email;
    }

    public function setEmail(?string $Email): self
    {
        $this->Email = $Email;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->Address;
    }

    public function setAddress(string $Address): self
    {
        $this->Address = $Address;

        return $this;
    }

    public function getUtilisateur(): ?User
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?User $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
