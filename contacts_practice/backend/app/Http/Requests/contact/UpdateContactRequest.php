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
            'name' => 'required|string|max:100',
            'mobile' => 'nullable',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('contacts', 'email')->ignore($contactId, 'id'),
            ],
            'company' => 'required|string|max:100'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre debe ser una cadena de texto.',
            'name.max' => 'El nombre no debe exceder los 100 caracteres.',
            'mobile.required' => 'El número de móvil es obligatorio.',
            'mobile.string' => 'El número de móvil debe ser una cadena de texto.',
            'mobile.max' => 'El número de móvil no debe exceder los 100 caracteres.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser una dirección válida.',
            'email.string' => 'El correo electrónico debe ser una cadena de texto.',
            'email.max' => 'El correo electrónico no debe exceder los 255 caracteres.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'company.required' => 'La empresa es obligatoria.',
            'company.string' => 'La empresa debe ser una cadena de texto.',
            'company.max' => 'La empresa no debe exceder los 100 caracteres.'
        ];
    }
}