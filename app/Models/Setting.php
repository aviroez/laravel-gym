<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    public const TEXT = 'text';
    public const NUMBER = 'number';
    public const JSON = 'json';
    public const FILE = 'file';
    public const TEXTAREA = 'textarea';
    public const OPTION = 'option';

    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'key',
        'value',
        'type',
    ];

    public static function defaultValues()
    {
        return [
            'app_name' => ['key' => 'app_name', 'value' => config('app.name'), 'type' => self::TEXT],
            'logo' => ['key' => 'logo', 'value' => '', 'type' => self::FILE],
            'front_image' => ['key' => 'front_image', 'value' => '', 'type' => self::FILE],
            'pagination_limit' => ['key' => 'pagination_limit', 'value' => 10, 'type' => self::NUMBER],
            'address' => ['key' => 'address', 'value' => '', 'type' => self::TEXTAREA],
            'phone' => ['key' => 'phone', 'value' => '', 'type' => self::TEXT],
            'google_place_id' => ['key' => 'google_place_id', 'value' => '', 'type' => self::TEXT],
        ];
    }

    public static function defaultValue($key)
    {
        $defaultValues = self::defaultValues();
        if (isset($defaultValues[$key])) return $defaultValues[$key];
        return null;
    }
}
