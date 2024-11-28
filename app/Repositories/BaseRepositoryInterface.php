<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function all();

    public function findById($id);

    public function create($data);

    public function updateById($id, $data);

    public function deleteById($id);

}
