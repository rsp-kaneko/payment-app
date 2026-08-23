<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Role::create(['role_name' => 'ROLE_ADMIN']);
        Role::create(['role_name' => 'ROLE_GUEST']);

        User::factory()->create([
            'role_id' => 1,
            'name' => 'admin',
            'email' => 'test-n18@hotmail.co.jp',
            'password' => '$12$Y7yCs2mCM8QCTreBRERTFe5laftHBxtL7TCQGwa8liYYni75d96Sq',
            'remember_token' => 'Db4qCnjZG5jYK3FUJaAG1nbRzvtMRRLCLD1FU08reDGlyMD8oLVsorIWBbLg',
            'max_total_price' => 100000,
            'max_page_count' => 10,
            'delete_flg' => 0
        ]);
    }
}
