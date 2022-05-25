<?php

namespace App\Repository;

use App\Entity\LanguageAssignation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method LanguageAssignation|null find($id, $lockMode = null, $lockVersion = null)
 * @method LanguageAssignation|null findOneBy(array $criteria, array $orderBy = null)
 * @method LanguageAssignation[]    findAll()
 * @method LanguageAssignation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LanguageAssignationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LanguageAssignation::class);
    }

    // /**
    //  * @return LanguageAssignation[] Returns an array of LanguageAssignation objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LanguageAssignation
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
