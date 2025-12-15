<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contact extends Model
{
    use HasUuids;

    //& Muy importante que esten todos los campos necesarios
    protected $fillable = [
        'organization_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'title',
        'department',
        'is_primary',
        'status',
        'notes',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relación: Organización padre
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Contact::class, 'organization_id');
    }

    // Scope: Solo organizaciones activas
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}
