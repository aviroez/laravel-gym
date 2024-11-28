<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    protected UserRepository $userRepository;

    public function __construct(
        UserRepository $userRepository
    ) {
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $filters = $request->input('filters');

        $roles = $this->userRepository->getRoles();
        $genders = $this->userRepository->getGenders();
        return Inertia::render('User/Index', [
            'users' => $this->userRepository->getPaginatedData($perPage, $filters),
            'roles' => $roles,
            'genders' => $genders,
            'filters' => [
                'role' => $roles,
                'gender' => $genders,
                'search' => isset($filters['search']) ? $filters['search'] : '',
            ],
            'filtersValue' => $filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $data = $request->validated();

        if ($data['password']) {
            $data['password'] = Hash::make($data['password']);
        }

        try {
            $this->userRepository->create($data);
    
            return redirect()->route('users.index')
                ->with('success', __('dashboard.create_success', ['field' => __('dashboard.user')]));
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
    public function update(UserRequest $request, string $id)
    {
        $data = $request->validated();

        if (!$data['password']) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        try {
            $this->userRepository->updateById($id, $data);
    
            return redirect()->route('users.index')
                ->with('success', __('dashboard.update_success', ['field' => __('dashboard.user')]));
        } catch (\Exception $e) {
            return redirect()->back()->with('failed', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
