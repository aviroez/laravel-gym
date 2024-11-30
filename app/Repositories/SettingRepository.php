<?php

namespace App\Repositories;

use App\Models\Setting;

class SettingRepository implements BaseRepositoryInterface
{
    public const TEXT = Setting::TEXT;
    public const NUMBER = Setting::NUMBER;
    public const JSON = Setting::JSON;
    public const FILE = Setting::FILE;
    public const TEXTAREA = Setting::TEXTAREA;

    public function all()
    {
        $defaultValues = $this->getDefaultValues();
        $settings = Setting::all();
        foreach ($defaultValues as $key => $value) {
            $setting = $this->getSettingByKey($settings, $key);
            if ($setting) {
                $newValue = $value;
                $defaultValues[$key] = [...$newValue, 'value'=>$setting->value, 'type'=>$setting->type];
            }
        }
        return $defaultValues;
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

    public function upsert($key, $value, $type = null)
    {
        if ($type == null) {
            $defaultValue = $this->getDefaultValue($key);
            if ($defaultValue && isset($defaultValue['type'])) {
                $type = $defaultValue['type'];
            }
        }
        $setting = Setting::where('key', $key)->first();
        if ($setting) {
            $setting->value = $value;
            if ($type) {
                $setting->type = $type;
            }
            echo json_encode($setting);
            return $setting->save();
        }
        return $this->create(['key'=>$key, 'value'=>$value, 'type'=>$type]);
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

    public function getSettingByKey($setting = [], $key) {
        foreach ($setting as $value) {
            if ($key == $value->key) return $value;
        }
        return null;
    }
}
