<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class RolePermission extends Model
{
    protected $fillable = [
        'role',
        'module',
        'action',
        'allowed',
    ];

    protected $casts = [
        'allowed' => 'boolean',
    ];

    /**
     * Available modules in the system.
     */
    public const MODULES = [
        'contacts' => 'Contacts',
        'users' => 'User Management',
        'config' => 'Configuration'
    ];

    /**
     * Available actions per module.
     */
    public const ACTIONS = [
        'view' => 'View / Access',
        'create' => 'Create',
        'update' => 'Update / Edit',
        'delete' => 'Delete',
    ];

    /**
     * Module-specific actions (in addition to standard CRUD).
     */
    public const MODULE_ACTIONS = [
        'projects' => [
            'update_stage' => 'Update Stage',
            'update_interest' => 'Update Interest Level',
        ],
        'meetings' => [
            'complete' => 'Mark Complete',
            'reschedule' => 'Reschedule',
        ],
        'proposals' => [
            'send' => 'Send to Client',
            'duplicate' => 'Duplicate',
        ],
        'dashboard' => [
            'view_all_stats' => 'View All Statistics',
        ],
        'reports' => [
            'export' => 'Export Reports',
        ],
    ];

    /**
     * Available roles.
     */
    public const ROLES = [
        'admin' => 'Administrator',
        'manager' => 'Manager',
        'sales_rep' => 'Sales Representative',
    ];

    /**
     * Default permissions matrix (used for seeding).
     */
    public const DEFAULT_PERMISSIONS = [
        'contacts' => [
            'view' => ['admin', 'manager', 'sales_rep'],
            'create' => ['admin', 'manager', 'sales_rep'],
            'update' => ['admin', 'manager', 'sales_rep'],
            'delete' => ['admin', 'manager']
        ],
        'users' => [
            'view' => ['admin'],
            'create' => ['admin'],
            'update' => ['admin'],
            'delete' => ['admin']
        ],
        'config' => [
            'view' => ['admin'],
            'create' => ['admin'],
            'update' => ['admin'],
            'delete' => ['admin']
        ]
    ];

    /**
     * Clear the permissions cache.
     */
    public static function clearCache(): void
    {
        Cache::forget('role_permissions');
    }

    /**
     * Get all permissions grouped by role.
     */
    public static function getAllGroupedByRole(): array
    {
        return Cache::remember('role_permissions', 3600, function () {
            $permissions = self::all();
            $grouped = [];

            foreach (self::ROLES as $role => $label) {
                $grouped[$role] = [];
                foreach (self::MODULES as $module => $moduleLabel) {
                    $grouped[$role][$module] = [];
                }
            }

            foreach ($permissions as $permission) {
                if (isset($grouped[$permission->role][$permission->module])) {
                    $grouped[$permission->role][$permission->module][$permission->action] = $permission->allowed;
                }
            }

            return $grouped;
        });
    }

    /**
     * Check if a role has permission for a module action.
     */
    public static function hasPermission(string $role, string $module, string $action): bool
    {
        $permissions = self::getAllGroupedByRole();
        return $permissions[$role][$module][$action] ?? false;
    }

    /**
     * Get all actions for a module (standard + module-specific).
     */
    public static function getActionsForModule(string $module): array
    {
        $actions = self::ACTIONS;
        
        if (isset(self::MODULE_ACTIONS[$module])) {
            $actions = array_merge($actions, self::MODULE_ACTIONS[$module]);
        }
        
        return $actions;
    }
}

