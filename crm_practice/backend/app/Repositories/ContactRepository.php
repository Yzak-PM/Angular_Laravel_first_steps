<?php
namespace App\Repositories;
use App\Models\Contact;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ContactRepository
{
    public function __construct(private Contact $model){}

    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = $this->model->query();
        // Filtro por búsqueda
        if (!empty($filters['search'])) {
            $query->whereRaw("CONCAT(first_name, ' ', last_name) ILIKE ? ", '%' . $filters['search'] . '%');
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

    public function find(string $id): ?Contact
    {
        return $this->model->with(['parent', 'children'])->find($id);
    }

    public function create(array $data): Contact
    {
        return $this->model->create($data);
    }

    public function update(Contact $contact, array $data): Contact
    {
        $contact->update($data);
        return $contact->fresh();
    }

    public function delete(Contact $contact): bool
    {
        return $contact->delete();
    }

    public function getRoots(): Collection
    {
        return $this->model->roots()->active()->orderBy('name')->get();
    }
}