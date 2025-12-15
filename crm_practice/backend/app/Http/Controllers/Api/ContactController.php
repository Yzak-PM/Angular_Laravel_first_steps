<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Contact\StoreContactRequest;
// use App\Http\Requests\Contact\UpdateContactRequest;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class ContactController extends Controller
{
    public function __construct(
        private ContactService $service
    ) {}
    /**
     * GET /api/Contacts
     * Lista paginada de organizaciones
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'search', 'status', 
            'sort_by', 'sort_dir', 'per_page', 'page'
        ]);
        $contacts = $this->service->list($filters);
        return response()->json([
            'data' => $contacts->items(),
            'meta' => [
                'current_page' => $contacts->currentPage(),
                'last_page' => $contacts->lastPage(),
                'per_page' => $contacts->perPage(),
                'total' => $contacts->total(),
            ]
        ]);
    }
    /**
     * POST /api/contact
     * Crear nueva organización
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = $this->service->create($request->validated());
        return response()->json([
            'data' => $contact,
            'message' => 'contact created successfully'
        ], 201);
    }
    /**
     * GET /api/contact/{id}
     * Obtener una organización
     */
    public function show(string $id): JsonResponse
    {
        $contact = $this->service->get($id);
        if (!$contact) {
            return response()->json([
                'message' => 'contact not found'
            ], 404);
        }
        return response()->json([
            'data' => $contact
        ]);
    }
    /**
     * PUT /api/contact/{id}
     * Actualizar organización
     */
    // public function update(UpdateContactRequest $request, string $id): JsonResponse
    // {
    //     try {
    //         $contact = $this->service->update($id, $request->validated());
    //         return response()->json([
    //             'data' => $contact,
    //             'message' => 'contact updated successfully'
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => $e->getMessage()
    //         ], 404);
    //     }
    // }
    /**
     * DELETE /api/organizations/{id}
     * Eliminar organización (soft delete)
     */

    //& Borrado fisico = borrar por completo
    //& Borrado logico = desactivar
    public function destroy(string $id): JsonResponse{
        try {
            $this->service->delete($id);
            return response()->json([
                'message' => 'Contact deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }
}