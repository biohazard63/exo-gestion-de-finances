<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *   schema="Transaction",
 *   type="object",
 *   required={"user_id", "amount", "type"},
 *   @OA\Property(property="id", type="integer", example=1),
 *   @OA\Property(property="user_id", type="integer", example=1),
 *   @OA\Property(property="amount", type="number", format="float", example=100.50),
 *   @OA\Property(property="type", type="string", enum={"credit", "debit"}, example="credit"),
 *   @OA\Property(property="description", type="string", example="Payment for services"),
 *   @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T00:00:00Z"),
 *   @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-01T00:00:00Z")
 * )
 */
class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'amount',
        'type',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'type' => 'string', // Cast du champ type en string
    ];

    /**
     * Relation avec le modèle User.
     * Une transaction appartient à un utilisateur.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
