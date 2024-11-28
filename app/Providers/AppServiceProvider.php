<?php

namespace App\Providers;

use App\Repositories\SettingRepository;
use App\Repositories\SettingRepositoryInterface;
use App\Repositories\UserRepository;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{

    // private SettingRepository $settingRepository;

    // public function __construct(Application $app, SettingRepository $settingRepository)
    // {
    //     $this->settingRepository = $settingRepository;
    //     parent::__construct($app);
    // }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);

        $locale = App::getLocale();
        Inertia::share([
            'storage_url' => url('storage'),
            'locale' => $locale,
            'translations' => function () {
                return Lang::get('dashboard');
            },
            'settings' => fn() => app(SettingRepository::class)->all(),
        ]);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
