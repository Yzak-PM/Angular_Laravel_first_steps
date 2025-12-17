<?php
namespace App\Http\Requests\Contact;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; //& En producción: verificar permisos
    }

    public function rules(): array
    {
        $contactId = $this->route('id') ?? $this->route('contact');
        return [
            'organization_id' => 'required|uuid|exists:organizations,id',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'department' => 'nullable|string|max:100',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('contacts', 'email')->ignore($contactId, 'id'),
            ],
            'phone' => 'nullable',
            'title' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:250',
            'status' => 'string|max:50'
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'El primer nombre es requerido',
            'last_name.required' => 'El apellido es requerido',
            'email.required' => 'El email es requerido',
        ];
    }
}