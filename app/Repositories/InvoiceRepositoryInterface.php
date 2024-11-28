<?php

namespace App\Repositories;

interface InvoiceRepositoryInterface extends BaseRepositoryInterface
{
    public function getNewNumber($number);

    public function getPaginatedData($perPage, $filters);

    public function createUnpaid($id, $status);

    public function getBySubscriptionId($id);

}
