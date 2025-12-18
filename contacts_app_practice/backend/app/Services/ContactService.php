<?php
namespace App\Services;
use App\Models\Contact;
use App\Repositories\ContactRepository;
use Illuminate\Support\Str;
use Illuminate\Pagination\LengthAwarePaginator;

class ContactService{
    public function __construct(private ContactRepository $repository){}

    public function list(array $filters = []): LengthAwarePaginator{
        return $this->repository->paginate($filters);
    }

    public function get(string $id): ?Contact{
        return $this->repository->find($id);
    }

    private function generatePath(array $data): string{
        $slug = Str::slug($data['name'], '_');

        return $slug;
    }

    public function create(array $data): Contact{
        $data['path'] = $this->generatePath($data);
        return $this->repository->create($data);
    }

    public function update(string $id, array $data): Contact{
        $contact = $this->repository->find($id);
        if(!$contact){
            throw new \Exception('Contact not found');
        }

        return $this->repository->update($contact, $data);
    }

    public function delete(string $id): bool{
        $contact = $this->repository->find($id);
        if(!$contact){
            throw new \Exception('Contact not found');
        }
        return $this->repository->delete($contact);
    }

}