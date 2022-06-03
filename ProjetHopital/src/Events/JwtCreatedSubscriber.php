<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JwtCreatedSubscriber
{
    public function updateJwtData(JWTCreatedEvent $event)
    {
        //recupere l utilisateur
        $user = $event->getUser();

        $data = $event->getData();
        $data['Id'] = $user->getId();

        $event->setData($data);
    }
}
