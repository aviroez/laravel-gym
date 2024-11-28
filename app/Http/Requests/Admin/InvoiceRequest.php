<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceRequest extends AdminRequest
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
                'user_id' => ['nullable','exists:users,id'],
                'date' => ['nullable', 'date'],
                'total' => ['nullable', 'numeric'],
                'status' => ['nullable', 'in:unpaid,week,partially_paid,paid'],
                'due_date' => ['nullable', 'date'],
            ];
        }

        // Default rules for storing a new resource
        return [
            'user_id' => ['required', 'integer','exists:users,id'],
            'date' => ['nullable', 'date'],
            'total' => ['nullable', 'numeric'],
            'status' => ['nullable', 'in:unpaid,week,partially_paid,paid'],
            'due_date' => ['nullable', 'date'],
            'subscriptions' => ['required', 'array'],
            'subscriptions.*.id' => ['required', 'exists:subscriptions,id'],
            'subscriptions.*.quantity' => ['required', 'integer', 'min:1'],
            'subscriptions.*.price' => ['required', 'numeric', 'min:0'],
        ];
    }
}
