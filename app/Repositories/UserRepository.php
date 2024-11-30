<?php

namespace App\Repositories;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

class UserRepository implements UserRepositoryInterface
{
    public function all()
    {
        return User::all();
    }

    public function findById($id)
    {
        return User::findOrFail($id);
    }

    public function findByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function getPaginatedData($perPage = 10, $filters = [])
    {
        $model = User::query();

        if ($filters && is_array($filters)) {
            foreach ($filters as $key => $value) {
                if ($value) {
                    if ($key == 'search') {
                        $model->whereAny(['name', 'email', 'phone'], 'LIKE', "%$value%");
                    } else {
                        $model->where($key, $value);
                    }
                }
            }
        }
        return $model->paginate($perPage);
    }

    public function search($query = '', $limit = '10')
    {
        $users = User::query();
        if ($query) {
            $users->whereAny(['name', 'email', 'phone'], 'LIKE', "%$query%");
        }
        return $users->orderBy('name')->limit($limit)->get();
    }

    public function create($data = [])
    {
        return User::create($data);
    }

    public function createIfNotExist($data = [])
    {
        if (!isset($data['email']) || !$data['email']) {
            return null;
        }
        $user = $this->findByEmail($data['email']);
        if (!$user) {
            return $this->create($data);
        }
        return $user;
    }

    public function updateById($id, $data = [])
    {
        return User::find($id)->update($data);
    }

    public function updateByEmail($email, $data = [])
    {
        return User::where('email', $email)->update($data);
    }

    public function deleteById($id)
    {
        return User::find($id)->delete();
    }

    public function options()
    {
        return User::pluck('name', 'id');
    }

    public function getRoles() {
        return [
            User::ADMIN => __('dashboard.'.User::ADMIN),
            User::OPERATOR => __('dashboard.'.User::OPERATOR),
            User::MEMBER => __('dashboard.'.User::MEMBER),
            User::GUEST => __('dashboard.'.User::GUEST),
        ];
    }

    public function getAdmin() {
        return User::ADMIN;
    }

    public function getOperator() {
        return User::OPERATOR;
    }

    public function getMember() {
        return User::MEMBER;
    }

    public function getGuest() {
        return User::GUEST;
    }

    public function getGenders() {
        return [
            User::MALE => __('dashboard.'.User::MALE),
            User::FEMALE => __('dashboard.'.User::FEMALE),
        ];
    }

    public function getMale() {
        return User::MALE;
    }

    public function getFemale() {
        return User::FEMALE;
    }

    public function getAllMembers($type = 'month')
    {
        return User::whereIn('role', [User::MEMBER])
            ->where('created_at', '<=', ($type == 'year') ? now()->subYear() : now()->subMonth())
            ->count();
    }

    public function getActiveMembers($type = 'month')
    {
        return User::whereIn('role', [User::MEMBER])
            ->where('created_at', '<=', ($type == 'year') ? now()->subYear() : now()->subMonth())
            ->whereHas('subscriptions', function (Builder $query) {
                $query->where('status', Subscription::ACTIVE);
            })
            ->count();
    }
}
