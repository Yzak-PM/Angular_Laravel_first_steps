<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
 
class ContactSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Intenta conseguir un organization_id válido (uuid)
        $orgId = DB::table('organizations')
            ->where('name', 'Acme Corporation')
            ->value('id');
 
        // Si no está Acme, toma la primera org disponible
        if (!$orgId) {
            $orgId = DB::table('organizations')->value('id');
        }
 
        // Si no hay organizaciones, crea (o llama a tu seeder de orgs)
        if (!$orgId) {
            $this->call(OrganizationSeeder::class);
 
            $orgId = DB::table('organizations')
                ->where('name', 'Acme Corporation')
                ->value('id')
                ?? DB::table('organizations')->value('id');
        }
 
        // 2) Inserta contactos
        DB::table('contacts')->insert([
            [
                'id'              => (string) Str::uuid(),
                'organization_id' => (string) $orgId,
                'first_name'      => 'John',
                'last_name'       => 'Doe',
                'email'           => 'john.doe@acme.com',
                'phone'           => '555-1234',
                'title'           => 'Manager',
                'department'      => 'Operations',
                'is_primary'      => true,
                'status'          => 'active',
                'notes'           => 'Seed contact',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'organization_id' => (string) $orgId,
                'first_name'      => 'Jane',
                'last_name'       => 'Smith',
                'email'           => 'jane.smith@acme.com',
                'phone'           => '555-5678',
                'title'           => 'HR Specialist',
                'department'      => 'Human Resources',
                'is_primary'      => false,
                'status'          => 'active',
                'notes'           => 'Handles HR communications',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'organization_id' => (string) $orgId,
                'first_name'      => 'Carlos',
                'last_name'       => 'Méndez',
                'email'           => 'carlos.mendez@acme.com',
                'phone'           => '555-9988',
                'title'           => 'IT Support',
                'department'      => 'IT',
                'is_primary'      => false,
                'status'          => 'inactive',
                'notes'           => 'Part-time contractor',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'organization_id' => (string) $orgId,
                'first_name'      => 'Ana',
                'last_name'       => 'Rojas',
                'email'           => 'ana.rojas@acme.com',
                'phone'           => '555-4422',
                'title'           => 'Sales Lead',
                'department'      => 'Sales',
                'is_primary'      => false,
                'status'          => 'active',
                'notes'           => 'Top performer in Q3',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
            [
                'id'              => (string) Str::uuid(),
                'organization_id' => (string) $orgId,
                'first_name'      => 'Luis',
                'last_name'       => 'García',
                'email'           => 'luis.garcia@acme.com',
                'phone'           => '555-1133',
                'title'           => 'Finance Analyst',
                'department'      => 'Finance',
                'is_primary'      => false,
                'status'          => 'active',
                'notes'           => 'Responsible for monthly reporting',
                'created_at'      => now(),
                'updated_at'      => now(),
            ],
        ]);

    }
}