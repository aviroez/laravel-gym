<?php

namespace App\Http\Requests\Admin;

class PlanRequest extends AdminRequest
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
                'description' => ['nullable', 'string'],
                'duration' => ['nullable', 'integer'],
                'unit' => ['nullable', 'in:day,week,month,year'],
                'price' => ['nullable', 'numeric'],
                'status' => ['nullable', 'in:active,inactive'],
                'type' => ['nullable', 'in:register,subscription'],
            ];
        }

        // Default rules for storing a new resource
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'duration' => ['required', 'integer'],
            'unit' => ['required', 'in:day,week,month,year'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'in:active,inactive'],
            'type' => ['required', 'in:register,subscription'],
        ];
    }
}
