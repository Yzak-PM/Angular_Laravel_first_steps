<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('contacts')->insert([
            [
                'id' => (string) Str::uuid(),
                'name' => 'Luis Mendoza',
                'mobile' => '656-301-1122',
                'email' => 'luis.mendoza@gmail.com',
                'company' => 'Google',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Fernanda Ruiz',
                'mobile' => '656-302-2233',
                'email' => 'fernanda.ruiz@gmail.com',
                'company' => 'Google',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Miguel Ángel Soto',
                'mobile' => '656-303-3344',
                'email' => 'miguel.soto@gmail.com',
                'company' => 'Amazon',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Daniela Pérez',
                'mobile' => '656-304-4455',
                'email' => 'daniela.perez@gmail.com',
                'company' => 'Amazon',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Alejandro Flores',
                'mobile' => '656-305-5566',
                'email' => 'alejandro.flores@gmail.com',
                'company' => 'Microsoft',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Valeria Campos',
                'mobile' => '656-306-6677',
                'email' => 'valeria.campos@gmail.com',
                'company' => 'Microsoft',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Ricardo León',
                'mobile' => '656-307-7788',
                'email' => 'ricardo.leon@gmail.com',
                'company' => 'Entheospace',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Natalia Ríos',
                'mobile' => '656-308-8899',
                'email' => 'natalia.rios@gmail.com',
                'company' => 'Entheospace',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Héctor Salinas',
                'mobile' => '656-309-9900',
                'email' => 'hector.salinas@gmail.com',
                'company' => 'Netflix',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Claudia Vega',
                'mobile' => '656-310-1010',
                'email' => 'claudia.vega@gmail.com',
                'company' => 'Netflix',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}