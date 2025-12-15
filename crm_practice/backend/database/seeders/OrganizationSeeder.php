<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        $parentId = (string) Str::uuid();

        DB::table('organizations')->insert([
            'id'        => $parentId,
            'parent_id' => null,
            'name'      => 'Acme Corporation',
            'type'      => 'parent',
            'email'     => 'info2@acme.com',
            'phone'     => '123-456-7890',
            'website'   => 'https://acme.com',
            'address'   => '123 Main Street',
            'status'    => 'active',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // 2. Create child organizations
        $children = [
            [
                'name' => 'Acme Subsidiary A',
                'email' => 'subA@acme.com'
            ],
            [
                'name' => 'Acme Subsidiary B',
                'email' => 'subB@acme.com'
            ]
        ];

        foreach ($children as $child) {
            $childId = (string) Str::uuid();
            DB::table('organizations')->insert([
                'id'        => $childId,
                'parent_id' => $parentId,
                'name'      => $child['name'],
                'type'      => 'subsidiary',
                'email'     => $child['email'],
                'phone'     => null,
                'website'   => null,
                'address'   => null,
                'status'    => 'active',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}