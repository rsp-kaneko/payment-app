<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'user_id' => 1,
            'title' => fake()->text(30),
            'price' => fake()->numberBetween(100, 100000),
            'payment_date' => "2026-05-05",
            'delete_flg' => 0
        ];
    }
}
