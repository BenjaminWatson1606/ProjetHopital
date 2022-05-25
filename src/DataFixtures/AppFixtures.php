<?php

namespace App\DataFixtures;

use App\Entity\Experience;
use App\Entity\Formation;
use App\Entity\Interview;
use App\Entity\Profil;
use App\Entity\Recruitment;
use App\Entity\SkillAssignation;
use App\Entity\Skills;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use phpDocumentor\Reflection\Types\True_;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $listSkills = [
            ['Langue', 'Anglais'],
            ['Langue', 'Italien'],
            ['Langue', 'Français'],
            ['Langue', 'Allemand'],
            ['Langue', 'Mandarin'],
            ['Langue', 'Arabe'],
            ['Langue', 'Russe'],
            ['Langue', 'Hindi'],
            ['Langue', 'Portugais'],
            ['Langue', 'Japonais'],
            ['Langue', 'Indonésien'],
            ['Langue', 'Bengali'],
            ['Langue', 'Espagnol'],


            ['Informatique', 'Php'],
            ['Informatique', 'Symfony'],
            ['Informatique', 'Java'],
            ['Informatique', 'Python'],
            ['Informatique', 'Wordpress'],
            ['Informatique', 'Base de données'],
            ['Informatique', 'Api'],
            ['Informatique', 'Cybersécurité'],
            ['Informatique', 'Algorithme'],
            ['Informatique', 'Intelligence artificielle'],
            ['Informatique', 'Big Data'],
            ['Informatique', 'Swift'],
            ['Informatique', 'Javascript'],
            ['Informatique', 'Laravel'],
            ['Informatique', 'Angular'],
            ['Informatique', 'Bootstrap'],
            ['Informatique', 'Html'],
            ['Informatique', 'Css'],
            ['Informatique', 'DevOps'],
            ['Informatique', 'Cryptomonnaies'],
            ['Informatique', 'Robotique'],
            ['Informatique', 'Machine Learning'],
            ['Informatique', 'Cloud'],
            ['Informatique', 'Linux'],
            ['Informatique', 'Ux'],

            ['Autre', 'Immobilier'],

            ['Communication', 'Marketing'],
            ['Communication', 'SEO'],

            ['Management', 'Gestion de projet'],
            ['Management', 'Gestion d\'équipe'],
            ['Management', 'Communication'],

            ['Bureautique', 'Microsoft Office'],

            ['Digital', 'E-commerce'],
            ['Digital', 'Réseaux sociaux'],
            ['Digital', 'Stratégie numerique'],
        ];

        $listSkillsId = [];

        foreach ($listSkills as $listSkill) {
            $skills = new Skills();
            $skills->setField($listSkill[0])
                ->setCaption($listSkill[1]);
            $manager->persist($skills);

            array_push($listSkillsId, $skills);
        }

        //Creation des profils
        for ($i = 0; $i < 10; $i++) {

            $profil = new Profil();

            $profil->setFirstname($faker->firstName)
                ->setLastname($faker->lastName)
                ->setDatebirth($faker->dateTime)
                ->setPhone($faker->phoneNumber)
                ->setEmail($faker->email)
                ->setStatus($faker->randomElement(['Etudiant', 'Employé']))
                ->setAddress($faker->address)
                ->setLinkedin("https://www.linkedin.com/in/" . $profil->getFirstname() . "-" . $profil->getLastname())
                ->setViadeo('https://viadeo.journaldunet.com/p/' . $profil->getFirstname() . "-" . $profil->getLastname())
                ->setBiography($faker->realText())
                ->setIsSearching($faker->boolean())
                ->setIsExecutive($faker->boolean())
                ->setIsHandicap($faker->boolean())
                ->setIsWorkingVisa($faker->boolean())
                ->setIsWorkingVisaOK($faker->boolean())
                ->setTJM($faker->numberBetween($min = 8, $max = 12))
                ->setActualRemuneration($faker->numberBetween($min = 1200, $max = 1600))
                ->setRemunerationWanted($faker->numberBetween($min = 1700, $max = 2000));
            $manager->persist($profil);

            // Creation des formations
            for ($u = 0; $u < mt_rand(1, 3); $u++) {
                $formation = new Formation();

                $formation->setSchool($faker->randomElement(['EPSI', 'Gustave Eiffel', 'EPITECH', 'Lille 1', 'EPITA', 'WIS']))
                    ->setDiploma($faker->randomElement(['BAC', 'BTS', 'Licence', 'Master']))
                    ->setFieldStudy($faker->randomElement(['Programmation', 'Reseau', 'digital']))
                    ->setDateStart($faker->dateTimeBetween('-3 years'))
                    ->setDateEnd($faker->dateTimeBetween('-6 months'))
                    ->setDescription($faker->realText())
                    ->setIdProfil($profil);

                $manager->persist($formation);
            }

            // Creations des skills
            for ($j = 0; $j < mt_rand(1, 2); $j++) {

                $skillAssignation = new SkillAssignation();

                $skillAssignation->setIdProfil($profil)
                    ->setIdSkillAssignation($listSkillsId[rand(0, 47)])
                    ->setLevel($faker->numberBetween($min = 0, $max = 5))
                    ->setNbRecommendation($faker->numberBetween($min = 0, $max = 10));

                $manager->persist($skillAssignation);
            }

            // Creation des etats de recrutement
            $recruitment = new Recruitment();
            $processus = mt_rand(1, 3);
            $type = ['motivation', 'technique', 'rh'];
            $contactMethod = ['mail', 'phonecall', 'Linkedin'];


            $recruitment->setIdProfil($profil)
                ->setContact(true)
                ->setContactDate($faker->dateTimeBetween('-6 months'))
                ->setContactMethod($faker->randomElement(['Mail', 'Phone call', 'Linkedin']))
                ->setContactDescription($faker->realText());

            if ($processus == 2) {

                for ($p = 0; $p <= mt_rand(0, 2); $p++) {
                    $interview = new Interview();
                    $interview->setIdRecruitment($recruitment)
                        ->setInterviewType($type[$p])
                        ->setDateMeeting($faker->dateTimeBetween('-6 months'))
                        ->setReview($faker->randomElement(['Tres Négatif', 'Négatif', 'Mitigé', 'Positif', 'Tres Positif']))
                        ->setDescription($faker->realText());
                    if ($p < 2) {
                        $interview->setDateNextInterview($faker->dateTimeBetween('-2 months'));
                    }

                    $manager->persist($interview);
                }


            } elseif ($processus == 3) {
                $recruitment
                    ->setBlockedState(false)
                    ->setContract(true)
                    ->setContractDate($faker->dateTimeBetween('-2 months'))
                    ->setContractDescription($faker->realText());

                for ($p = 0; $p <= 2; $p++) {
                    $interview = new Interview();
                    $interview->setIdRecruitment($recruitment)
                        ->setInterviewType($type[$p])
                        ->setDateMeeting($faker->dateTimeBetween('-6 months'))
                        ->setReview($faker->randomElement(['Tres Négatif', 'Négatif', 'Mitigé', 'Positif', 'Tres Positif']))
                        ->setDescription($faker->realText());
                    if ($p < 2) {
                        $interview->setDateNextInterview($faker->dateTimeBetween('-2 months'));
                    }
                    $manager->persist($interview);
                }
            }

            $manager->persist($recruitment);

            $expericence = new Experience();
            $expericence
                ->setProfilID($profil)
                ->setTitle($faker->word)
                ->setCompany($faker->company)
                ->setDateStart($faker->dateTime)
                ->setPlace($faker->city)
                ->setStrongpoint($faker->word)
                ->setWeakpoint($faker->word)
                ->setDescription($faker->realText());
            $manager->persist($expericence);


        }

        $manager->flush();
    }
}
