<?php
namespace App\Repositories;
use App\Models\Organization;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
class OrganizationRepository
{
    public function __construct(private Organization $model){}

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query();
        // Filtro por búsqueda
        if (!empty($filters['search'])) {
            $query->where('name', 'ilike', '%' . $filters['search'] . '%');
        }
        // Filtro por tipo
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        // Filtro por estado
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        // Ordenamiento
        $sortBy = $filters['sort_by'] ?? 'created_at';
        $sortDir = $filters['sort_dir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);
        // Paginación
        $perPage = $filters['per_page'] ?? 15;
        return $query->paginate($perPage);
    }

    public function find(string $id): ?Organization
    {
        return $this->model->with(['parent', 'children'])->find($id);
    }

    public function create(array $data): Organization
    {
        return $this->model->create($data);
    }

    public function update(Organization $organization, array $data): Organization
    {
        $organization->update($data);
        return $organization->fresh();
    }

    public function delete(Organization $organization): bool
    {
        return $organization->delete();
    }

    public function getRoots(): Collection
    {
        return $this->model->roots()->active()->orderBy('name')->get();
    }
}