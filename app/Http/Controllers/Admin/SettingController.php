<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SettingRequest;
use App\Repositories\SettingRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    protected SettingRepository $settingRepository;

    public function __construct(SettingRepository $settingRepository)
    {
        $this->settingRepository = $settingRepository;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('Setting/Index', [
            'settings' => $this->settingRepository->all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SettingRequest $request)
    {
        $data = $request->validated();

        try {
            $this->settingRepository->create($data);
    
            return redirect()->route('settings.index')
                ->with('success', __('dashboard.create_success', ['field' => __('dashboard.setting')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SettingRequest $request, string $id)
    {
        $data = $request->validated();

        try {
            $this->settingRepository->updateById($id, $data);
    
            return redirect()->route('settings.index')
                ->with('success', __('dashboard.update_success', ['field' => __('dashboard.setting')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->settingRepository->deleteById($id);
    
            return redirect()->route('settings.index')
                ->with('success', __('dashboard.delete_success', ['field' => __('dashboard.setting')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }
}
