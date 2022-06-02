<?php

namespace App\DataFixtures;

use App\Entity\Infirmier;
use App\Entity\Service;
use App\Entity\Chambre;
use App\Entity\Lit;
use App\Entity\Compte;
use App\Entity\Patient;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use phpDocumentor\Reflection\Types\True_;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $serviceNoms = ['Chirurgie', 'Radiologie', 'Neurologie', 'Pneumologie', 'Cardiologie', 'Pédiatrie', 'Urologie', 'Maternité', 'Grands brûlés', 'Hématologie'];

        for ($i = 0; $i < 10; $i++) {

            //Creation des services

            $service = new Service();

            $service->setNomService($serviceNoms[$i]);
            $manager->persist($service);

            //Creation des infirmiers

            $infirmier = new Infirmier();

            $infirmier->setNomInfirmier($faker->lastName)
                ->setPrenomInfirmier($faker->firstName)
                ->setService($service);
            $manager->persist($infirmier);

            // Creation des comptes
    
            $compte = new Compte();

            $compte->setUsername($faker->userName)
                ->setPassword($faker->password)
                ->setInfirmier($infirmier)
                ->setRoles($faker->randomElement([['ROLE_USER'],['ROLE_ADMIN']]));

            $manager->persist($compte);
            

            // Creations des chambres
            for ($j = 0; $j < mt_rand(5, 10); $j++) {
    
                $chambre = new Chambre();

                $chambre->setService($service);
                $manager->persist($chambre);

                $nombreDeLitsEtPatients = mt_rand(1,2);

                // Creation des patients
                for ($k = 0; $k < $nombreDeLitsEtPatients; $k++) {

                    $dateDebut = $faker->dateTime($max = 'now', $timezone = null);
                    $dateFin = $faker->dateTimeBetween($dateDebut, $interval = '+ 7 days', $timezone = null);
        
                    $patient = new Patient();

                    $patient->setNumSecuriteSociale("0123456")
                        ->setNomPatient($faker->lastName)
                        ->setPrenomPatient($faker->firstName)
                        ->setDateArrivee($dateDebut)
                        ->setDateDepart($dateFin)
                        ->setAgePatient($faker->numberBetween($min = 2, $max = 100))
                        ->setAdressePatient($faker->address)
                        ->setTypePatient('Hospitalisation');

                    $manager->persist($patient);

                    // Creation des lits
                    $lit = new Lit();

                    $lit->setChambre($chambre)
                        ->setPatient($patient)
                        ->setDisponibilite(false);

                    $manager->persist($lit);
                    
                }
            }

            // Creations des chambres avec les lits sans patients
            for ($m = 0; $m < 1; $m++) {
                $chambre = new Chambre();

                $chambre->setService($service);
                $manager->persist($chambre);

                $nombreDeLitsEtPatients = mt_rand(1,2);

                // Creation des lits sans patients
                for ($l = 0; $l < $nombreDeLitsEtPatients; $l++) {
            
                    $lit = new Lit();

                    $lit->setChambre($chambre)
                        ->setDisponibilite(true);

                    $manager->persist($lit);
                }
            }
        }
        $manager->flush();
    }
}
