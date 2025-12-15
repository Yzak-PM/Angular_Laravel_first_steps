<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasUuids, SoftDeletes;

    //& Muy importante que esten todos los campos necesarios
    protected $fillable = [
        'parent_id',
        'name',
        'type',
        'email',
        'phone',
        'website',
        'address',
        'status',
        'path',
    ];
    
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Relación: Organización padre
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Organization::class, 'parent_id');
    }

    // Relación: Organizaciones hijas
    public function children(): HasMany
    {
        return $this->hasMany(Organization::class, 'parent_id');
    }

    // Scope: Solo organizaciones activas
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // Scope: Solo organizaciones padre (raíz)
    public function scopeRoots($query)
    {
        return $query->whereNull('parent_id');
    }
}