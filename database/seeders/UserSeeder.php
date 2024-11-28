<?php

namespace Database\Seeders;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $this->userRepository->createIfNotExist([
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'role' => User::ADMIN
            ]);


        // Generate fake users
        $roleList = [User::ADMIN, User::OPERATOR, User::MEMBER];
        User::factory(100)->create()->each(function ($user) use ($roleList) {
            $user->role = $roleList[array_rand($roleList)];
            $user->save();
        });
        } catch (\Exception $e) {
            
        }
    }
}
