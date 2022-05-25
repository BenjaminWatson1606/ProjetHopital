<?php

namespace App\Entity;

use App\Repository\LanguageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LanguageRepository::class)
 */
class Language
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=LanguageAssignation::class, mappedBy="language")
     */
    private $idLanguage;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Caption;

    public function __construct()
    {
        $this->idLanguage = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|LanguageAssignation[]
     */
    public function getIdLanguage(): Collection
    {
        return $this->idLanguage;
    }

    public function addIdLanguage(LanguageAssignation $idLanguage): self
    {
        if (!$this->idLanguage->contains($idLanguage)) {
            $this->idLanguage[] = $idLanguage;
            $idLanguage->setLanguage($this);
        }

        return $this;
    }

    public function removeIdLanguage(LanguageAssignation $idLanguage): self
    {
        if ($this->idLanguage->removeElement($idLanguage)) {
            // set the owning side to null (unless already changed)
            if ($idLanguage->getLanguage() === $this) {
                $idLanguage->setLanguage(null);
            }
        }

        return $this;
    }

    public function getCaption(): ?string
    {
        return $this->Caption;
    }

    public function setCaption(string $Caption): self
    {
        $this->Caption = $Caption;

        return $this;
    }
}
