<?php

namespace App\Entity;

use App\Repository\LanguageAssignationRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LanguageAssignationRepository::class)
 */
class LanguageAssignation
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $IdLanguageAssignation;

    /**
     * @ORM\ManyToOne(targetEntity=Profil::class, inversedBy="languageAssignations")
     */
    private $IdProfil;

    /**
     * @ORM\Column(type="integer")
     */
    private $Level;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Certification;

    /**
     * @ORM\ManyToOne(targetEntity=Language::class, inversedBy="idLanguage")
     * @ORM\JoinColumn(nullable=false)
     */
    private $language;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdLanguageAssignation(): ?int
    {
        return $this->IdLanguageAssignation;
    }

    public function setIdLanguageAssignation(int $IdLanguageAssignation): self
    {
        $this->IdLanguageAssignation = $IdLanguageAssignation;

        return $this;
    }

    public function getIdProfil(): ?Profil
    {
        return $this->IdProfil;
    }

    public function setIdProfil(?Profil $IdProfil): self
    {
        $this->IdProfil = $IdProfil;

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->Level;
    }

    public function setLevel(int $Level): self
    {
        $this->Level = $Level;

        return $this;
    }

    public function getCertification(): ?bool
    {
        return $this->Certification;
    }

    public function setCertification(bool $Certification): self
    {
        $this->Certification = $Certification;

        return $this;
    }

    public function getLanguage(): ?Language
    {
        return $this->language;
    }

    public function setLanguage(?Language $language): self
    {
        $this->language = $language;

        return $this;
    }
}
