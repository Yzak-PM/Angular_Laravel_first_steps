<?php
namespace App\Http\Requests\Contact;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest{
    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return[
            'name' => 'required|string|max:100',
            'mobile' => 'required|string|max:100',
            'email' => 'required|email|string|max:100|unique:contacts,email',
            'company' => 'required|string|max:100'
        ];
    }

    public function messages(): array{
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
            'email.max' => 'El correo electrónico no debe exceder los 100 caracteres.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'company.required' => 'La empresa es obligatoria.',
            'company.string' => 'La empresa debe ser una cadena de texto.',
            'company.max' => 'La empresa no debe exceder los 100 caracteres.'
        ];
    }
}