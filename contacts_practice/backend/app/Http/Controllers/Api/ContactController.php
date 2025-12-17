<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\UpdateContactRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use StoreContactRequest;

class ContactController extends Controller{
    public function __construct(private ContactService $service){}

    //& Obtener todos los contactos por filtros y paginacion
    public function index(Request $request): JsonResponse{
        $filters = $request->only(['search', 'sort_by', 'sort_dir', 'per_page', 'page']);  
        
        $contacts = $this->service->list($filters);
        return response()->json([
            'data' => $contacts->items(),
            'meta' => [
                'current_page' => $contacts->currentPage(),
                'last_page' => $contacts->lastPage(),
                'per_page' => $contacts->perPage(),
                'total' => $contacts->total()
            ]
        ]);
    }

    //& crear nuevo contacto
    public function store(StoreContactRequest $request): JsonResponse{
        $contact = $this->service->create($request->validated());
        return response()->json([
            'data' => $contact,
            'message' => 'Contact created successfully'
        ], 201);
    }

    //& Obtener un contacto por ID
    public function show(string $id): JsonResponse{
        $contact = $this->service->get($id);
        if(!$contact){
            return response()->json([
                'message' => 'Contact not found'
            ], 404);
        }

        return response()->json([
            'data' => $contact
        ]);
    }

    //& Actualizar contacto
    public function update(UpdateContactRequest $request, string $id): JsonResponse{
        try{
            $contact = $this->service->update($id, $request->validated());
            return response()->json([
                'data' => $contact,
                'message' => 'Contact updated successfully'
            ]);
        }catch(\Exception  $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }

    //& Delete contact
    public function destroy(string $id): JsonResponse{
        try{
            $this->service->delete($id);
            return response()->json([
                'message' => 'Contact deleted successfully'
            ]);
        }catch (\Exception $e){
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }
}