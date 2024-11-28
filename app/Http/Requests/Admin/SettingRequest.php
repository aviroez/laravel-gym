<?php

namespace App\Http\Requests\Admin;

class SettingRequest extends AdminRequest
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
                'key' => ['required','string','max:255'],
                'value' => ['nullable', 'string'],
                'type' => ['nullable', 'in:text,number,json'],
            ];
        }

        return [
            'key' => ['required','string','max:255'],
            'value' => ['nullable', 'string'],
            'type' => ['required', 'in:text,number,json'],
        ];
    }
}
