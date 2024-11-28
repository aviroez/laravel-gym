<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends AdminRequest
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
                'invoice_id' => ['nullable','exists:invoices,id'],
                'user_id' => ['nullable','exists:users,id'],
                'date' => ['nullable', 'date'],
                'amount' => ['nullable', 'numeric'],
                'paid' => ['nullable', 'numeric'],
                'method' => ['nullable', 'in:cash,cashless'],
                'note' => ['nullable', 'string'],
            ];
        }

        // Default rules for storing a new resource
        return [
            'invoice_id' => ['required', 'integer','exists:invoices,id'],
            'date' => ['nullable', 'date'],
            'amount' => ['required', 'numeric'],
            'paid' => ['required', 'numeric'],
            'method' => ['required', 'in:cash,cashless'],
            'note' => ['nullable', 'string'],
        ];
    }
}
