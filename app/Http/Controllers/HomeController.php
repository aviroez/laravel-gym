<?php

namespace App\Http\Controllers;

use App\Repositories\PlanRepository;
use App\Repositories\SettingRepository;
use App\Services\GooglePlaceApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    protected PlanRepository $planRepository;
    protected SettingRepository $settingRepository;
    public function __construct(
        PlanRepository $planRepository,
        SettingRepository $settingRepository
    ) {
        $this->planRepository = $planRepository;
        $this->settingRepository = $settingRepository;
    }

    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        $setting = $this->settingRepository->findById('google_place_id');
        $placeId = $setting->value ? $setting->value : '';

        $service = new GooglePlaceApiService($placeId, null);
        $reviews = $service->getReviews();
        $addressComponents = $service->getAddressComponents();

        $latestPlans = $this->planRepository->getlatestPlans();

        return Inertia::render('Home/Index', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'reviews' => $reviews,
            'addressComponents' => $addressComponents,
            'latestPlans' => $latestPlans,
        ]);
    }
}
