<?php
namespace App\Services;
use App\Models\Contact;
use App\Repositories\ContactRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
class ContactService
{
    public function __construct(private ContactRepository $repository) {}

    public function list(array $filters = []): LengthAwarePaginator
    {
        return $this->repository->paginate($filters);
    }

    public function get(string $id): ?Contact
    {
        return $this->repository->find($id);
    }

    public function create(array $data): Contact
    {
        // Generar path LTree
        $data['path'] = $this->generatePath($data);
        return $this->repository->create($data);
    }

    public function update(string $id, array $data): Contact
    {
        $contact = $this->repository->find($id);
        if (!$contact) {
            throw new \Exception('contact not found');
        }
        return $this->repository->update($contact, $data);
    }

    public function delete(string $id): bool
    {
        $contact = $this->repository->find($id);
        if (!$contact) {
            throw new \Exception('contact not found');
        }
        return $this->repository->delete($contact);
    }

    private function generatePath(array $data): string
    {
        // Crear slug para el path
        $slug = Str::slug($data['name'], '_');
        if (!empty($data['parent_id'])) {
            $parent = $this->repository->find($data['parent_id']);
            if ($parent && $parent->path) {
                return $parent->path . '.' . $slug;
            }
        }
        return $slug;
    }
}