<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
 
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@test.com',
                'password' => Hash::make('Password123'),
                'role' => 'admin',
            ],
            [
                'name' => 'Manager User',
                'email' => 'manager@test.com',
                'password' => Hash::make('Password123'),
                'role' => 'manager',
            ],
            [
                'name' => 'Sales User',
                'email' => 'sales@test.com',
                'password' => Hash::make('Password123'),
                'role' => 'sales_rep',
            ],
        ];
 
        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']], // prevents duplicates
                $user
            );
        }
    }
}