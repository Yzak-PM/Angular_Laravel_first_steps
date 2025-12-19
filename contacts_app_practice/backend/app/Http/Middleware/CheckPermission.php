<?php
 
namespace App\Http\Middleware;
 
use App\Services\PermissionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
 
class CheckPermission
{
    public function __construct(
        private PermissionService $permissionService
    ) {}
 
    /**
     * Usage: ->middleware('permission:contacts,delete')
     */
    public function handle(Request $request, Closure $next, string $module, string $action): Response
    {
        $user = $request->user();
 
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
 
        if ($this->permissionService->cannot($user, $module, $action)) {
            return response()->json([
                'message' => 'Forbidden. Insufficient permissions.',
                'required_permission' => "{$module}.{$action}",
            ], 403);
        }
 
        return $next($request);
    }
}
