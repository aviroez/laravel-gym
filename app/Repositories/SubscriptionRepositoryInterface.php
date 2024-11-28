<?php

namespace App\Repositories;

interface SubscriptionRepositoryInterface extends BaseRepositoryInterface
{

    public function getPaginatedData($perPage, $filters);
    
    public function options();

}
