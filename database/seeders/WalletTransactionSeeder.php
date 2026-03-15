<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\WalletTransaction;
use App\Models\User;

class WalletTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            // Initial credit
            WalletTransaction::create([
                'user_id' => $user->id,
                'amount' => 100.00,
                'type' => 'credit',
                'description' => 'Initial balance',
                'status' => 'completed',
            ]);

            // Some random debits
            for ($i = 0; $i < 2; $i++) {
                WalletTransaction::create([
                    'user_id' => $user->id,
                    'amount' => rand(10, 30),
                    'type' => 'debit',
                    'description' => 'Consultation fee',
                    'status' => 'completed',
                ]);
            }
        }
    }
}
