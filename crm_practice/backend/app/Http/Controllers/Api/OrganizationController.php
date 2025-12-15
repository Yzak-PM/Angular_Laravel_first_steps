<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\Organization\StoreOrganizationRequest;
use App\Http\Requests\Organization\UpdateOrganizationRequest;
use App\Services\OrganizationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
class OrganizationController extends Controller
{
    public function __construct(
        private OrganizationService $service
    ) {}
    /**
     * GET /api/organizations
     * Lista paginada de organizaciones
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only([
            'search', 'type', 'status', 
            'sort_by', 'sort_dir', 'per_page', 'page'
        ]);
        $organizations = $this->service->list($filters);
        return response()->json([
            'data' => $organizations->items(),
            'meta' => [
                'current_page' => $organizations->currentPage(),
                'last_page' => $organizations->lastPage(),
                'per_page' => $organizations->perPage(),
                'total' => $organizations->total(),
            ]
        ]);
    }
    /**
     * POST /api/organizations
     * Crear nueva organización
     */
    public function store(StoreOrganizationRequest $request): JsonResponse
    {
        $organization = $this->service->create($request->validated());
        return response()->json([
            'data' => $organization,
            'message' => 'Organization created successfully'
        ], 201);
    }
    /**
     * GET /api/organizations/{id}
     * Obtener una organización
     */
    public function show(string $id): JsonResponse
    {
        $organization = $this->service->get($id);
        if (!$organization) {
            return response()->json([
                'message' => 'Organization not found'
            ], 404);
        }
        return response()->json([
            'data' => $organization
        ]);
    }
    /**
     * PUT /api/organizations/{id}
     * Actualizar organización
     */
    public function update(UpdateOrganizationRequest $request, string $id): JsonResponse
    {
        try {
            $organization = $this->service->update($id, $request->validated());
            return response()->json([
                'data' => $organization,
                'message' => 'Organization updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }
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
                'message' => 'Organization deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 404);
        }
    }
}