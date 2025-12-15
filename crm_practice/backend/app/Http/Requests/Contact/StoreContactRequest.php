<?php

namespace App\Http\Requests\Contact;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }
    public function rules(): array
    {
        return [
            'organization_id' => 'required|uuid|exists:organizations,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => 'required|email|max:255|unique:contacts,email,',
            'phone' => 'nullable',
            'title' => 'nullable|string|max:100',
            'is_primary' => 'boolean',
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la organización es requerido',
            'type.in' => 'El tipo debe ser: parent, subsidiary o branch',
        ];
    }
}