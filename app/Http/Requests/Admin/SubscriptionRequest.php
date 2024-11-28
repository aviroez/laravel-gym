<?php

namespace App\Http\Requests\Admin;

class SubscriptionRequest extends AdminRequest
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
                'title' => ['required', 'string', 'max:255'],
                'user_id' => ['nullable', 'exists:users'],
                'plan_id' => ['nullable', 'exists:plans'],
                'date_from' => ['nullable', 'date'],
                'date_to' => ['nullable', 'date'],
                'quantity' => ['nullable', 'numeric'],
                'price' => ['nullable', 'numeric'],
                'status' => ['nullable', 'in:active,inactive,expired'],
                'type' => ['nullable', 'in:register,subscription'],
            ];
        }

        // Default rules for storing a new resource
        return [
            'title' => ['required', 'string', 'max:255'],
            'user_id' => ['nullable', /** 'exists:users' */],
            'plan_id' => ['required', /** 'exists:plans' */],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date'],
            'quantity' => ['required', 'integer'],
            'price' => ['required', 'numeric'],
            'status' => ['nullable', 'in:active,inactive,expired'],
            'type' => ['nullable', 'in:register,subscription'],
            'user_name' => ['nullable', 'string', 'max:255'],
            'user_email' => ['nullable', 'email', 'max:255'],
        ];
    }
}
