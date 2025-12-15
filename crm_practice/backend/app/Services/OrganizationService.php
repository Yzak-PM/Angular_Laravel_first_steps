<?php
namespace App\Services;
use App\Models\Organization;
use App\Repositories\OrganizationRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
class OrganizationService
{
    public function __construct(private OrganizationRepository $repository) {}

    public function list(array $filters = []): LengthAwarePaginator
    {
        return $this->repository->paginate($filters);
    }

    public function get(string $id): ?Organization
    {
        return $this->repository->find($id);
    }

    public function create(array $data): Organization
    {
        // Generar path LTree
        $data['path'] = $this->generatePath($data);
        return $this->repository->create($data);
    }

    public function update(string $id, array $data): Organization
    {
        $organization = $this->repository->find($id);
        if (!$organization) {
            throw new \Exception('Organization not found');
        }
        return $this->repository->update($organization, $data);
    }

    public function delete(string $id): bool
    {
        $organization = $this->repository->find($id);
        if (!$organization) {
            throw new \Exception('Organization not found');
        }
        return $this->repository->delete($organization);
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