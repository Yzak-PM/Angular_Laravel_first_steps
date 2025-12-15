<?php
namespace App\Http\Requests\Organization;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrganizationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; //& En producción: verificar permisos
    }

    public function rules(): array
    {
        return [
            'parent_id' => 'nullable|uuid|exists:organizations,id',
            'name' => 'required|string|max:255',
            'type' => 'required|in:parent,subsidiary,branch',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|url|max:255',
            'address' => 'nullable|string',
            'status' => 'in:active,inactive',
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