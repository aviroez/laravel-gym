<?php

namespace App\Repositories;

interface PaymentRepositoryInterface extends BaseRepositoryInterface
{
    public function getNewNumber($date);

}
