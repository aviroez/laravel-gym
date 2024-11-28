<?php

namespace Database\Seeders;

use App\Repositories\SettingRepository;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    private SettingRepository $settingRepository;

    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;        
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settingList = $this->settingRepository->getDefaultValues();

        foreach ($settingList as $setting) {
            try {
                $this->settingRepository->create($setting);
            } catch (\Exception $th) {
                
            }
        }
    }
}
