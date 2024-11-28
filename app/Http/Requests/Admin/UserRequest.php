<?php

namespace App\Http\Requests\Admin;

class UserRequest extends AdminRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule', 'array<mixed>', 'string>
     */
    public function rules(): array
    {
        // Check if the request is for updating
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            return [
                'name' => ['required','string','max:255'],
                'email' => ['nullable', 'string'],
                'password' => ['nullable', 'string'],
                'phone' => ['nullable', 'integer'],
                'birth_date' => ['nullable', 'date'],
                'role' => ['nullable', 'in:admin,operator,member'],
                'gender' => ['nullable', 'in:male,female'],
            ];
        }

        // Default rules for storing a new resource
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string'],
            'password' => ['required', 'string'],
            'phone' => ['nullable', 'string'],
            'birth_date' => ['nullable', 'date'],
            'role' => ['required', 'in:admin,operator,member'],
            'gender' => ['nullable', 'in:male,female'],
        ];
    }
}
