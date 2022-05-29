<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CompteRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * @ORM\Entity(repositoryClass=CompteRepository::class)
 * @ApiResource(
 * normalizationContext={
 *  "skip_null_values" = false,
 *  "groups"={"compte_read"}
 * })
 */
class Compte implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"compte_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200, unique=true)
     * @Groups({"compte_read"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"compte_read"})
     */
    private $password;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\OneToOne(targetEntity=Infirmier::class, inversedBy="Compte")
     */
    private $Infirmier;

    /**
     * @ORM\OneToOne(targetEntity=Secretaire::class, inversedBy="Compte")
     */
    private $Secretaire;

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getSecretaire(): ?Secretaire
    {
        return $this->Secretaire;
    }

    public function setSecretaire(Secretaire $Secretaire): self
    {
        $this->Secretaire = $Secretaire;

        return $this;
    }
}
