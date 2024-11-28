<?php

namespace App\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface
{

    public function findByEmail($email);

    public function getPaginatedData($perPage, $filters);

    public function search($query, $limit);

    public function updateByEmail($email, $data);

    public function createIfNotExist($data);

    public function createManyFromFactory(int $count);

}
