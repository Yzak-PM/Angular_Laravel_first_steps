<?php
namespace App\Repositories;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ContactRepository{
    public function __construct(private Contact $model){}

    public function paginate(array $filters = []): LengthAwarePaginator{
        $query = $this->model->query();

        //& Filtro por busqueda
        if(!empty($filters['search'])){
            $query->where('name', 'like', '%'.$filters['search'].'%');
        }

        $sortBy = $filters['sort_by'] ?? 'name';
        $sortDir = $filters['sort_dir'] ?? 'asc';
        $query->orderBy($sortBy, $sortDir);
        //& Paginacion
        $perPage = $filters['per_page'] ?? 10;
        return $query->paginate($perPage);
    }

    public function find(string $id): ?Contact{
        return $this->model->find($id);
    }

    public function create(array $data): Contact{
        return $this->model->create($data);
    }

    public function update(Contact $contact, array $data): Contact{
        $contact->update($data);
        return $contact->fresh();
    }

    public function delete(Contact $contact): bool{
        return $contact->delete();
    }

    public function getRoots(): Collection{
        return $this->model->roots()->active()->orderBy('name')->get();
    }
}