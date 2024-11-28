<?php

namespace App\Repositories;

use App\Models\Setting;

class SettingRepository implements BaseRepositoryInterface
{

    public function all()
    {
        return Setting::all();
    }

    public function findById($id)
    {
        $setting = Setting::find($id);
        if ($setting) return $setting;
        return $this->getDefaultValue($id);
    }

    public function create($data = [])
    {
        return Setting::create($data);
    }

    public function updateById($id, $data = [])
    {
        return Setting::find($id)->update($data);
    }

    public function deleteById($id)
    {
        return Setting::find($id)->delete();
    }

    public function getDefaultValues()
    {
        return Setting::defaultValues();
    }

    public function getDefaultValue($key)
    {
        return Setting::defaultValue($key);
    }
}
