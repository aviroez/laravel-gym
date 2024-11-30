<?php

namespace App\Repositories;

interface PlanRepositoryInterface extends BaseRepositoryInterface
{

    public function getActive();

    public function getPaginatedData($perPage, $filters);

}
